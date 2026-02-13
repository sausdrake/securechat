import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const CORRECT_WORD = 'WORLD';
const GRID_ROWS = 6;
const GRID_COLS = 5;

const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
];

const WordleGameScreen = ({ navigation }) => {
  const [currentRow, setCurrentRow] = useState(0);
  const [currentCol, setCurrentCol] = useState(0);
  const [guesses, setGuesses] = useState(Array(GRID_ROWS).fill(null).map(() => Array(GRID_COLS).fill('')));
  const [letterStates, setLetterStates] = useState({}); // 'correct', 'present', 'absent', 'unused'

  const resetGame = () => {
    setCurrentRow(0);
    setCurrentCol(0);
    setGuesses(Array(GRID_ROWS).fill(null).map(() => Array(GRID_COLS).fill('')));
    setLetterStates({});
  };

  const getLetterState = (letter, position, rowIndex) => {
    if (rowIndex >= currentRow) return 'unused';
    const correctLetter = CORRECT_WORD[position];
    if (letter === correctLetter) return 'correct';
    if (CORRECT_WORD.includes(letter)) {
      // Проверяем, сколько раз эта буква уже использована правильно в этой строке
      const correctCount = guesses[rowIndex].filter((l, i) => l === letter && CORRECT_WORD[i] === letter).length;
      const totalInWord = CORRECT_WORD.split('').filter(l => l === letter).length;
      const usedBefore = guesses[rowIndex].slice(0, position).filter(l => l === letter).length;
      if (usedBefore < correctCount + (totalInWord - correctCount)) {
        return 'present';
      }
    }
    return 'absent';
  };

  const getKeyState = (key) => {
    return letterStates[key] || 'unused';
  };

  const handleKeyPress = (key) => {
    if (key === 'BACKSPACE') {
      if (currentCol > 0) {
        const newGuesses = [...guesses];
        newGuesses[currentRow][currentCol - 1] = '';
        setGuesses(newGuesses);
        setCurrentCol(currentCol - 1);
      }
      return;
    }

    if (key === 'ENTER') {
      if (currentCol === GRID_COLS) {
        const guess = guesses[currentRow].join('');
        if (guess.length === GRID_COLS) {
          // Обновляем состояния клавиш
          const newLetterStates = { ...letterStates };
          guesses[currentRow].forEach((letter, col) => {
            const state = getLetterState(letter, col, currentRow);
            const existingState = newLetterStates[letter];
            if (!existingState || existingState === 'unused' || 
                (existingState === 'present' && state === 'correct') ||
                (existingState === 'absent' && (state === 'present' || state === 'correct'))) {
              newLetterStates[letter] = state;
            }
          });
          setLetterStates(newLetterStates);

          if (guess === CORRECT_WORD || currentRow === GRID_ROWS - 1) {
            // Игра окончена
            setTimeout(() => {
              resetGame();
            }, 2000);
          } else {
            setCurrentRow(currentRow + 1);
            setCurrentCol(0);
          }
        }
      }
      return;
    }

    if (currentCol < GRID_COLS && /^[A-Z]$/.test(key)) {
      const newGuesses = [...guesses];
      newGuesses[currentRow][currentCol] = key;
      setGuesses(newGuesses);
      setCurrentCol(currentCol + 1);
    }
  };

  const getCellColor = (rowIndex, colIndex) => {
    const letter = guesses[rowIndex][colIndex];
    if (!letter) return '#6EC5CE';
    const state = getLetterState(letter, colIndex, rowIndex);
    if (state === 'correct') return '#72B77A';
    if (state === 'present') return '#FFD700';
    if (state === 'absent') return '#111';
    return '#6EC5CE';
  };

  const getKeyColor = (key) => {
    const state = getKeyState(key);
    if (state === 'correct') return '#72B77A';
    if (state === 'present') return '#FFD700';
    if (state === 'absent') return '#111';
    return '#888';
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Верхняя панель */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <Text style={styles.title}>WORDLE</Text>
          <TouchableOpacity style={styles.refreshButton} onPress={resetGame}>
            <Text style={styles.refreshIcon}>↻</Text>
          </TouchableOpacity>
        </View>

        {/* Игровая сетка */}
        <View style={styles.gridContainer}>
          {Array.from({ length: GRID_ROWS }).map((_, rowIndex) => (
            <View key={rowIndex} style={styles.gridRow}>
              {Array.from({ length: GRID_COLS }).map((_, colIndex) => (
                <View
                  key={colIndex}
                  style={[
                    styles.gridCell,
                    { backgroundColor: getCellColor(rowIndex, colIndex) },
                  ]}
                >
                  <Text style={styles.cellLetter}>
                    {guesses[rowIndex][colIndex]}
                  </Text>
                </View>
              ))}
            </View>
          ))}
        </View>

        {/* Клавиатура */}
        <View style={styles.keyboardContainer}>
          {KEYBOARD_ROWS.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.keyboardRow}>
              {row.map((key) => (
                <TouchableOpacity
                  key={key}
                  style={[styles.key, { backgroundColor: getKeyColor(key) }]}
                  onPress={() => handleKeyPress(key)}
                >
                  <Text style={styles.keyLetter}>{key}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
          {/* Нижняя строка с OK и Backspace */}
          <View style={styles.keyboardRow}>
            <TouchableOpacity
              style={[styles.key, styles.specialKey, { backgroundColor: '#FFF' }]}
              onPress={() => handleKeyPress('ENTER')}
            >
              <Text style={styles.specialKeyText}>OK</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.key, styles.specialKey, { backgroundColor: '#FFF' }]}
              onPress={() => handleKeyPress('BACKSPACE')}
            >
              <Text style={styles.specialKeyText}>⌫</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#6EC5CE',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  backArrow: {
    fontSize: 24,
    color: '#000',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    letterSpacing: 2,
  },
  refreshButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  refreshIcon: {
    fontSize: 24,
    color: '#000',
  },
  gridContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  gridRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  gridCell: {
    width: 63,
    height: 63,
    borderWidth: 2,
    borderColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  cellLetter: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
  },
  keyboardContainer: {
    paddingBottom: 16,
  },
  keyboardRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 8,
  },
  key: {
    minWidth: 32,
    height: 48,
    marginHorizontal: 3,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  keyLetter: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
  specialKey: {
    minWidth: 60,
  },
  specialKeyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
});

export default WordleGameScreen;
