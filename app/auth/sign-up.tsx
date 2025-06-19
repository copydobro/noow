import React, { useState } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AuthCard } from '@/components/ui/AuthCard';
import { Input } from '../../components/ui/Input';
import { AuthButton } from '@/components/ui/AuthButton';
import { Colors } from '../../constants/Colors';
import { router } from 'expo-router';

export default function SignUpScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = () => {
    // Здесь должна быть реальная логика регистрации
    router.push('/auth/verify-email');
  };

  return (
    <ImageBackground
      style={{ flex: 1, resizeMode: 'cover' }}
    >
      <StatusBar style="light" />
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 16, backgroundColor: 'transparent' }}>
        <AuthCard style={{ width: 326, backgroundColor: 'rgba(10,10,10,0.8)', borderColor: Colors.secondary[700], borderWidth: 1, borderRadius: 24, padding: 0 }}>
          <View style={{ padding: 33 }}>
            <Text style={{ color: Colors.text.primary, fontSize: 20, fontFamily: 'Inter', textAlign: 'center', marginBottom: 24, fontWeight: '400' }}>
              WELCOME TO
            </Text>
            <Text style={{ color: Colors.text.primary, fontSize: 24, fontFamily: 'Inter', textAlign: 'center', marginBottom: 32, fontWeight: '700', letterSpacing: 2 }}>
              NOOW
            </Text>
            <View style={{ marginBottom: 16 }}>
              <Text style={{ color: Colors.text.secondary, fontSize: 16, fontFamily: 'Segoe UI', fontWeight: '600', marginBottom: 8 }}>
                Имя
              </Text>
              <Input
                placeholder="Введите ваше имя"
                value={name}
                onChangeText={setName}
                style={{ marginBottom: 0 }}
              />
            </View>
            <View style={{ marginBottom: 16 }}>
              <Text style={{ color: Colors.text.secondary, fontSize: 16, fontFamily: 'Segoe UI', fontWeight: '600', marginBottom: 8 }}>
                Email
              </Text>
              <Input
                placeholder="Введите ваш email"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                style={{ marginBottom: 0 }}
              />
            </View>
            <View style={{ marginBottom: 16 }}>
              <Text style={{ color: Colors.text.secondary, fontSize: 16, fontFamily: 'Segoe UI', fontWeight: '600', marginBottom: 8 }}>
                Пароль
              </Text>
              <Input
                placeholder="Введите пароль"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                style={{ marginBottom: 0 }}
              />
            </View>
            <View style={{ marginBottom: 24 }}>
              <Text style={{ color: Colors.text.secondary, fontSize: 16, fontFamily: 'Segoe UI', fontWeight: '600', marginBottom: 8 }}>
                Подтвердите пароль
              </Text>
              <Input
                placeholder="Повторите пароль"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                style={{ marginBottom: 0 }}
              />
            </View>
            <AuthButton
              title="Зарегистрироваться"
              onPress={handleSignUp}
              style={{ marginBottom: 16 }}
            />
            <TouchableOpacity onPress={() => router.push('/auth/sign-in')}>
              <Text style={{ color: Colors.primary[500], fontSize: 16, fontFamily: 'Segoe UI', fontWeight: '600', textAlign: 'center', textDecorationLine: 'underline' }}>
                Уже есть аккаунт? Войти
              </Text>
            </TouchableOpacity>
          </View>
        </AuthCard>
      </SafeAreaView>
    </ImageBackground>
  );
} 