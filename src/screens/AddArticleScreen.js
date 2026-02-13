import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useArticles } from '../context/ArticlesContext';

const AddArticleScreen = ({ navigation }) => {
  const [articleText, setArticleText] = useState('');
  const { addArticle } = useArticles();

  const handlePublish = () => {
    if (articleText.trim().length > 0) {
      addArticle(articleText);
      setArticleText('');
      navigation.goBack();
    }
  };

  const handleOpenFile = () => {
    // Заглушка для открытия файла
    console.log('Открыть файл (заглушка)');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.container}>
          {/* Верхняя панель с кнопкой назад */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
              <Text style={styles.backArrow}>←</Text>
            </TouchableOpacity>
          </View>

          {/* Область ввода текста */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Достаточно одного слово, и лист перестанет быть пустым ..."
              placeholderTextColor="#999"
              value={articleText}
              onChangeText={setArticleText}
              multiline
              textAlignVertical="top"
            />
          </View>

          {/* Кнопки действий */}
          <View style={styles.actionsContainer}>
            <TouchableOpacity style={styles.attachButton} onPress={handleOpenFile}>
              <Text style={styles.attachIcon}>📎</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.openFileButton} onPress={handleOpenFile}>
              <Text style={styles.openFileText}>Открыть файл</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.publishButton, !articleText.trim() && styles.publishButtonDisabled]}
              onPress={handlePublish}
              disabled={!articleText.trim()}
            >
              <Text style={styles.publishText}>Опубликовать</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF5E8',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  header: {
    marginBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  backArrow: {
    fontSize: 28,
    color: '#000',
    fontWeight: 'bold',
  },
  inputContainer: {
    flex: 1,
    marginBottom: 20,
  },
  textInput: {
    flex: 1,
    backgroundColor: '#A0D9D1',
    borderRadius: 16,
    padding: 16,
    fontSize: 16,
    color: '#0A1917',
    minHeight: 200,
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 12,
  },
  attachButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  attachIcon: {
    fontSize: 24,
  },
  openFileButton: {
    backgroundColor: '#D4A574',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flex: 1,
  },
  openFileText: {
    color: '#000',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  publishButton: {
    backgroundColor: '#FF8C00',
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 12,
    flex: 1,
  },
  publishButtonDisabled: {
    backgroundColor: '#CCC',
    opacity: 0.6,
  },
  publishText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default AddArticleScreen;
