import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomNavBar from '../components/BottomNavBar';

// Заглушка: 2 человека (Темирлан, Мамбет) и 1 группа (Группа 1)
const MOCK_CHATS = [
  {
    id: '1',
    type: 'group',
    name: 'Группа 1',
    lastMessage: 'Всем привет!',
    unread: false,
  },
  {
    id: '2',
    type: 'group',
    name: 'Группа 1',
    lastMessage: 'Привет, привет!',
    unread: true,
  },
  {
    id: '3',
    type: 'personal',
    name: 'Темирлан',
    lastMessage: 'Привет, как дела?',
    unread: false,
  },
  {
    id: '4',
    type: 'group',
    name: 'Группа 1',
    lastMessage: 'Поиграем?',
    unread: false,
  },
  {
    id: '5',
    type: 'personal',
    name: 'Мамбет',
    lastMessage: 'Привет, чем занят?',
    unread: true,
  },
];

const FILTERS = [
  { key: 'all', label: 'Все' },
  { key: 'groups', label: 'Группы' },
  { key: 'personal', label: 'Личные' },
  { key: 'unread', label: 'Непрочитанные' },
];

const ChatScreen = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredChats = useMemo(() => {
    let list = MOCK_CHATS;

    if (activeFilter === 'groups') {
      list = list.filter((c) => c.type === 'group');
    } else if (activeFilter === 'personal') {
      list = list.filter((c) => c.type === 'personal');
    } else if (activeFilter === 'unread') {
      list = list.filter((c) => c.unread);
    }

    const q = searchTerm.trim().toLocaleLowerCase('ru-RU');
    if (q) {
      list = list.filter(
        (c) =>
          c.name.toLocaleLowerCase('ru-RU').includes(q) ||
          c.lastMessage.toLocaleLowerCase('ru-RU').includes(q)
      );
    }
    return list;
  }, [searchTerm, activeFilter]);

  const handleTabChange = (tab) => {
    if (tab === 'home') {
      navigation.navigate('Home');
    } else if (tab === 'add') {
      navigation.navigate('AddArticle');
    } else if (tab === 'wordle') {
      navigation.navigate('WordleIntro');
    } else if (tab === 'profile') {
      navigation.navigate('Profile');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Поиск */}
        <View style={styles.searchBarWrapper}>
          <TextInput
            style={styles.searchInput}
            placeholder="Поиск"
            placeholderTextColor="#777"
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
          <Text style={styles.searchIcon}>🔍</Text>
        </View>

        {/* Кнопки сортировки */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filtersScroll}
          contentContainerStyle={styles.filtersContent}
        >
          {FILTERS.map((f) => (
            <TouchableOpacity
              key={f.key}
              style={[
                styles.filterButton,
                activeFilter === f.key && styles.filterButtonActive,
              ]}
              onPress={() => setActiveFilter(f.key)}
            >
              <Text
                style={[
                  styles.filterButtonText,
                  activeFilter === f.key && styles.filterButtonTextActive,
                ]}
              >
                {f.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Список чатов */}
        <ScrollView style={styles.chatList}>
          {filteredChats.map((chat) => (
            <TouchableOpacity
              key={chat.id}
              style={styles.chatRow}
              activeOpacity={0.7}
              onPress={() => navigation.navigate('ChatConversation', { chatId: chat.id, chatName: chat.name, chatType: chat.type })}
            >
              <View style={styles.avatar}>
                <Text style={styles.avatarIcon}>
                  {chat.type === 'group' ? '👥' : '👤'}
                </Text>
              </View>
              <View style={styles.chatInfo}>
                <Text style={styles.chatName} numberOfLines={1}>
                  {chat.name}
                </Text>
                <View style={styles.lastMessageRow}>
                  <Text style={styles.checkIcon}>✓✓</Text>
                  <Text style={styles.lastMessage} numberOfLines={1}>
                    {chat.lastMessage}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <BottomNavBar activeTab="chat" onTabChange={handleTabChange} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#A0D9D1',
  },
  container: {
    flex: 1,
    paddingTop: 12,
  },
  searchBarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    height: 44,
    paddingHorizontal: 16,
    borderRadius: 22,
    backgroundColor: '#C9B8E8',
    fontSize: 16,
    color: '#0A1917',
  },
  searchIcon: {
    position: 'absolute',
    right: 28,
    fontSize: 18,
  },
  filtersScroll: {
    maxHeight: 44,
    marginBottom: 12,
  },
  filtersContent: {
    paddingHorizontal: 16,
    gap: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#C9B8E8',
  },
  filterButtonActive: {
    backgroundColor: '#8B7AB8',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  filterButtonTextActive: {
    color: '#FFF',
  },
  chatList: {
    flex: 1,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  chatRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ddd',
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#E0EEEA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  avatarIcon: {
    fontSize: 26,
  },
  chatInfo: {
    flex: 1,
    minWidth: 0,
  },
  chatName: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  lastMessageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  checkIcon: {
    fontSize: 14,
    color: '#4A90E2',
    fontWeight: 'bold',
  },
  lastMessage: {
    flex: 1,
    fontSize: 15,
    color: '#444',
  },
});

export default ChatScreen;
