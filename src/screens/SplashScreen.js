import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Logo from '../../assets/vectors/logo.svg';

const SPLASH_DURATION_MS = 2500;

const SplashScreen = ({ navigation }) => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, [opacity]);

  useEffect(() => {
    const t = setTimeout(() => {
      navigation.replace('Auth');
    }, SPLASH_DURATION_MS);
    return () => clearTimeout(t);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Animated.View style={[styles.logoWrap, { opacity }]}>
          <Logo width={240} height={240} />
          <Text style={styles.title}>SecureChat</Text>
          <Text style={styles.subtitle}>+ Wordle</Text>
        </Animated.View>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginTop: 24,
    fontSize: 32,
    fontWeight: '700',
    color: '#0A1917',
    letterSpacing: 1.2,
  },
  subtitle: {
    marginTop: 4,
    fontSize: 20,
    fontWeight: '600',
    color: '#1B5E51',
    letterSpacing: 2,
  },
});

export default SplashScreen;
