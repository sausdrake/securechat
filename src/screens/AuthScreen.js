import React, { useState } from 'react';
import { 
    View, 
    Text, 
    TextInput, 
    StyleSheet, 
    TouchableOpacity, 
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Logo from '../../assets/vectors/logo.svg';

// --- Экран регистрации по дизайну из Figma ---
const AuthScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = () => {
        console.log('Регистрация', { name, phone, password, confirmPassword });
        // После регистрации переходим на главный экран с лентой
        navigation.replace('Home');
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <View style={styles.container}>
                    {/* Логотип */}
                    <View style={styles.logoWrapper}>
                        <Logo width={134} height={100} />
                    </View>

                    {/* Карточка формы */}
                    <View style={styles.formCard}>
                        <Text style={styles.label}>Введите имя</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Введите имя"
                            placeholderTextColor="#8A8A8A"
                            value={name}
                            onChangeText={setName}
                        />

                        <Text style={styles.label}>Введите номер телефона</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Введите номер телефона"
                            placeholderTextColor="#8A8A8A"
                            value={phone}
                            onChangeText={setPhone}
                            keyboardType="phone-pad"
                        />

                        <Text style={styles.label}>Введите пароль</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Введите пароль"
                            placeholderTextColor="#8A8A8A"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />

                        <Text style={styles.label}>Подтвердите пароль</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Подтвердите пароль"
                            placeholderTextColor="#8A8A8A"
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry
                        />

                        <TouchableOpacity style={styles.button} onPress={handleRegister}>
                            <Text style={styles.buttonText}>Регистрация</Text>
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
        backgroundColor: '#6EC5CE', // бирюзовый фон
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 24,
    },
    logoWrapper: {
        marginBottom: 32,
    },
    formCard: {
        width: '100%',
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingVertical: 24,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.6)',
    },
    label: {
        fontSize: 16,
        color: '#222',
        marginBottom: 6,
    },
    input: {
        height: 44,
        borderRadius: 8,
        backgroundColor: '#E0F2F2',
        paddingHorizontal: 12,
        fontSize: 16,
        color: '#222',
        marginBottom: 16,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.7)',
    },
    button: {
        marginTop: 4,
        height: 46,
        borderRadius: 8,
        backgroundColor: '#FF8C00',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#000',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default AuthScreen;