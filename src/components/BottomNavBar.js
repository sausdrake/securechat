import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

import HomeIcon from '../../assets/vectors/Home_icon.svg';
import AddCircle from '../../assets/vectors/add_circle.svg';
import WordleButton from '../../assets/vectors/wordle button.svg';
import MessageCircle from '../../assets/vectors/Message circle.svg';
import UserButton from '../../assets/vectors/user button.svg';

const ICON_SIZE = 28;

const BottomNavBar = ({ activeTab, onTabChange }) => {
  const navItems = [
    { key: 'home', Icon: HomeIcon },
    { key: 'add', Icon: AddCircle },
    { key: 'wordle', Icon: WordleButton },
    { key: 'chat', Icon: MessageCircle },
    { key: 'profile', Icon: UserButton },
  ];

  return (
    <View style={styles.navBar}>
      {navItems.map((item) => (
        <TouchableOpacity
          key={item.key}
          style={[styles.navIcon, activeTab === item.key && styles.navIconActive]}
          onPress={() => onTabChange(item.key)}
        >
          <item.Icon
            width={48}
            height={48}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#678D8D',
    borderTopWidth: 1,
    borderRadius:19,
    borderTopColor: '#ccc',
  },
  navIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  navIconActive: {
    opacity: 1,
  },
});

export default BottomNavBar;
