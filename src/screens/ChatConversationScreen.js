import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Начальные сообщения для каждого чата (по chatId)
const getInitialMessages = (chatId, chatName) => {
  const base = [
    { id: '1', text: 'Привет, как дела?', isOutgoing: false, time: '20:03' },
    { id: '2', text: 'Привет)', isOutgoing: true, time: '20:04' },
    { id: '3', text: 'Все хорошо)', isOutgoing: true, time: '20:04' },
    { id: '4', text: 'Поиграем?', isOutgoing: false, time: '20:10' },
    { id: '5', text: 'Давай)', isOutgoing: true, time: '20:12' },
  ];
  if (chatName === 'Мамбет') {
    return [
      { id: '1', text: 'Привет, чем занят?', isOutgoing: false, time: '19:55' },
      { id: '2', text: 'Привет! Работаю.', isOutgoing: true, time: '19:56' },
    ];
  }
  if (chatName === 'Группа 1') {
    return [
      { id: '1', text: 'Всем привет!', isOutgoing: false, time: '20:00' },
      { id: '2', text: 'Привет, привет!', isOutgoing: true, time: '20:01' },
    ];
  }
  return base;
};

const ChatConversationScreen = ({ navigation, route }) => {
  const { chatId, chatName, chatType } = route.params || { chatId: '1', chatName: 'Темирлан', chatType: 'personal' };
  const [messages, setMessages] = useState(() => getInitialMessages(chatId, chatName));
  const [inputText, setInputText] = useState('');
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current && messages.length) {
      setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
    }
  }, [messages.length]);

  const handleSend = () => {
    const text = inputText.trim();
    if (!text) return;
    const now = new Date();
    const timeStr = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), text, isOutgoing: true, time: timeStr },
    ]);
    setInputText('');
  };

  const handleAttach = () => {
    console.log('Прикрепить файл (заглушка)');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        {/* Шапка */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <View style={styles.avatar}>
              <Text style={styles.avatarIcon}>{chatType === 'group' ? '👥' : '👤'}</Text>
            </View>
            <Text style={styles.headerTitle} numberOfLines={1}>{chatName}</Text>
          </View>
          <View style={styles.headerRight} />
        </View>

        {/* Сообщения */}
        <ScrollView
          ref={scrollRef}
          style={styles.messageList}
          contentContainerStyle={styles.messageListContent}
          onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}
        >
          <View style={styles.datePill}>
            <Text style={styles.datePillText}>Сегодня</Text>
          </View>
          {messages.map((msg) => (
            <View
              key={msg.id}
              style={[styles.messageRow, msg.isOutgoing ? styles.messageRowOut : styles.messageRowIn]}
            >
              <View style={[styles.bubble, msg.isOutgoing ? styles.bubbleOut : styles.bubbleIn]}>
                <Text style={styles.bubbleText}>{msg.text}</Text>
                <Text style={styles.bubbleTime}>{msg.time}</Text>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Поле ввода — без ограничения клавиатуры, чтобы работала кириллица */}
        <View style={styles.inputRow}>
          <TouchableOpacity style={styles.attachBtn} onPress={handleAttach}>
            <Text style={styles.attachIcon}>+</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Сообщение"
            placeholderTextColor="#777"
            value={inputText}
            onChangeText={setInputText}
            multiline
            maxLength={2000}
            onSubmitEditing={handleSend}
          />
          <TouchableOpacity
            style={[styles.sendBtn, !inputText.trim() && styles.sendBtnDisabled]}
            onPress={handleSend}
            disabled={!inputText.trim()}
          >
            <Text style={styles.sendIcon}>➤</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#A0D9D1',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#A0D9D1',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  backBtn: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  backArrow: {
    fontSize: 28,
    color: '#000',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E0EEEA',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 2,
  },
  avatarIcon: {
    fontSize: 20,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  headerRight: {
    width: 44,
  },
  messageList: {
    flex: 1,
    backgroundColor: '#A0D9D1',
  },
  messageListContent: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    paddingBottom: 24,
  },
  datePill: {
    alignSelf: 'center',
    backgroundColor: 'rgba(255,255,255,0.6)',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 14,
    marginBottom: 16,
  },
  datePillText: {
    fontSize: 13,
    color: '#444',
  },
  messageRow: {
    marginBottom: 8,
  },
  messageRowIn: {
    alignItems: 'flex-start',
  },
  messageRowOut: {
    alignItems: 'flex-end',
  },
  bubble: {
    maxWidth: '80%',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 18,
  },
  bubbleIn: {
    backgroundColor: '#E8E8E8',
    borderBottomLeftRadius: 4,
  },
  bubbleOut: {
    backgroundColor: '#D0D0D0',
    borderBottomRightRadius: 4,
  },
  bubbleText: {
    fontSize: 16,
    color: '#000',
  },
  bubbleTime: {
    fontSize: 11,
    color: '#666',
    marginTop: 4,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#A0D9D1',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  attachBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E0EEEA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    marginBottom: 4,
  },
  attachIcon: {
    fontSize: 24,
    color: '#333',
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 120,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#FFF',
    fontSize: 16,
    color: '#000',
  },
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1B5E51',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    marginBottom: 4,
  },
  sendBtnDisabled: {
    backgroundColor: '#999',
    opacity: 0.7,
  },
  sendIcon: {
    fontSize: 18,
    color: '#FFF',
  },
});

export default ChatConversationScreen;
