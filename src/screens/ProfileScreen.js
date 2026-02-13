import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomNavBar from '../components/BottomNavBar';

// Начальные статические данные
const INITIAL_PROFILE = {
  login: 'Пользователь',
  phone: '+7 (999) 123-45-67',
  email: 'user@example.com',
};

const ProfileScreen = ({ navigation }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [login, setLogin] = useState(INITIAL_PROFILE.login);
  const [phone, setPhone] = useState(INITIAL_PROFILE.phone);
  const [email, setEmail] = useState(INITIAL_PROFILE.email);

  const handleEditToggle = () => {
    if (isEditing) {
      // Сохраняем и выходим из режима редактирования
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  const handleDeleteProfile = () => {
    Alert.alert(
      'Удалить профиль',
      'Вы уверены? Это действие нельзя отменить.',
      [
        { text: 'Отмена', style: 'cancel' },
        { text: 'Удалить', style: 'destructive', onPress: () => console.log('Профиль удалён (заглушка)') },
      ]
    );
  };

  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Auth' }],
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        {/* Аватар */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarIcon}>👤</Text>
          </View>
          <TouchableOpacity onPress={() => console.log('Изменить изображение (заглушка)')}>
            <Text style={styles.changeImageText}>Изменить изображение</Text>
          </TouchableOpacity>
        </View>

        {/* Поля: статичный вид или ввод */}
        <View style={styles.fieldsSection}>
          <View style={styles.field}>
            <Text style={styles.label}>Логин</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={login}
                onChangeText={setLogin}
                placeholder="Логин"
                placeholderTextColor="#999"
              />
            ) : (
              <Text style={styles.staticValue}>{login}</Text>
            )}
            <View style={styles.underline} />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Телефон</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={phone}
                onChangeText={setPhone}
                placeholder="Телефон"
                placeholderTextColor="#999"
                keyboardType="phone-pad"
              />
            ) : (
              <Text style={styles.staticValue}>{phone}</Text>
            )}
            <View style={styles.underline} />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>e-mail</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="e-mail"
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            ) : (
              <Text style={styles.staticValue}>{email}</Text>
            )}
            <View style={styles.underline} />
          </View>
        </View>

        {/* Кнопка Редактировать / Готово */}
        <TouchableOpacity style={styles.editButton} onPress={handleEditToggle}>
          <Text style={styles.editButtonText}>
            {isEditing ? 'Готово' : 'Редактировать профиль'}
          </Text>
        </TouchableOpacity>

        {/* Удалить профиль */}
        <TouchableOpacity style={styles.deleteLink} onPress={handleDeleteProfile}>
          <Text style={styles.deleteLinkText}>Удалить профиль</Text>
        </TouchableOpacity>

        {/* Выйти */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Выйти из профиля</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Нижнее меню */}
      <BottomNavBar
        activeTab="profile"
        onTabChange={(tab) => {
          if (tab === 'home') navigation.navigate('Home');
          else if (tab === 'add') navigation.navigate('AddArticle');
          else if (tab === 'wordle') navigation.navigate('WordleIntro');
          else if (tab === 'chat') navigation.navigate('Chat');
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#A0D9D1',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 24,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatarCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 200, 200, 0.8)',
    borderWidth: 3,
    borderColor: 'rgba(255, 180, 180, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarIcon: {
    fontSize: 48,
  },
  changeImageText: {
    marginTop: 10,
    fontSize: 14,
    color: '#C88',
  },
  fieldsSection: {
    marginBottom: 28,
  },
  field: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#FFF',
    marginBottom: 6,
  },
  staticValue: {
    fontSize: 16,
    color: '#FFF',
    paddingVertical: 4,
  },
  input: {
    fontSize: 16,
    color: '#000',
    backgroundColor: '#FFF',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  underline: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.5)',
    marginTop: 6,
  },
  editButton: {
    backgroundColor: '#FF8C00',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 16,
  },
  editButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  deleteLink: {
    alignItems: 'center',
    marginBottom: 24,
  },
  deleteLinkText: {
    fontSize: 15,
    color: '#1B5E51',
    textDecorationLine: 'underline',
  },
  logoutButton: {
    backgroundColor: '#FF8C00',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default ProfileScreen;
