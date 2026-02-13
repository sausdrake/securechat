import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ArticlesProvider } from './src/context/ArticlesContext';
import SplashScreen from './src/screens/SplashScreen';
import AuthScreen from './src/screens/AuthScreen';
import NewsFeedScreen from './src/screens/NewsFeedScreen';
import WordleIntroScreen from './src/screens/WordleIntroScreen';
import WordleGameScreen from './src/screens/WordleGameScreen';
import AddArticleScreen from './src/screens/AddArticleScreen';
import ChatScreen from './src/screens/ChatScreen';
import ChatConversationScreen from './src/screens/ChatConversationScreen';
import ProfileScreen from './src/screens/ProfileScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ArticlesProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Auth" component={AuthScreen} />
          <Stack.Screen name="Home" component={NewsFeedScreen} />
          <Stack.Screen name="WordleIntro" component={WordleIntroScreen} />
          <Stack.Screen name="WordleGame" component={WordleGameScreen} />
          <Stack.Screen name="AddArticle" component={AddArticleScreen} />
          <Stack.Screen name="Chat" component={ChatScreen} />
          <Stack.Screen name="ChatConversation" component={ChatConversationScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ArticlesProvider>
  );
}