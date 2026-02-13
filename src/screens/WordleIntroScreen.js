import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const WordleIntroScreen = ({ navigation }) => {
  const handleBack = () => {
    navigation.goBack();
  };

  const handlePlay = () => {
    // Пока что открываем заглушку игры.
    navigation.navigate('WordleGame');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Кнопка назад */}
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>

        {/* Логотип Wordle (упрощённая сетка) */}
        <View style={styles.logoWrapper}>
          <View style={styles.grid}>
            {Array.from({ length: 9 }).map((_, index) => {
              const isGreen = index === 1 || index === 7;
              const isBlack = index === 4;
              return (
                <View
                  key={index}
                  style={[
                    styles.cell,
                    isGreen && styles.cellGreen,
                    isBlack && styles.cellBlack,
                  ]}
                >
                  {isBlack && <Text style={styles.cellLetter}>W</Text>}
                </View>
              );
            })}
          </View>
          <Text style={styles.logoTitle}>WORDLE</Text>
        </View>

        {/* Большая кнопка Play */}
        <TouchableOpacity style={styles.playButton} onPress={handlePlay}>
          <Text style={styles.playIcon}>▶</Text>
        </TouchableOpacity>
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
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  backButton: {
    width: 52,
    height: 52,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  backArrow: {
    fontSize: 30,
    color: '#000',
  },
  logoWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 40,
  },
  grid: {
    width: 180,
    height: 180,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cell: {
    width: 60,
    height: 60,
    borderWidth: 2,
    borderColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C8D8D8',
  },
  cellGreen: {
    backgroundColor: '#72B77A',
  },
  cellBlack: {
    backgroundColor: '#111',
  },
  cellLetter: {
    fontSize: 28,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  logoTitle: {
    marginTop: 16,
    fontSize: 24,
    letterSpacing: 2,
    color: '#111',
  },
  playButton: {
    alignSelf: 'center',
    marginBottom: 120,
    width: 160,
    height: 80,
    borderRadius: 18,
    backgroundColor: '#FF8C00',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: {
    fontSize: 32,
    color: '#111',
  },
});

export default WordleIntroScreen;

