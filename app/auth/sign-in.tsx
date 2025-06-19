import React, { useState } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AuthCard } from '@/components/ui/AuthCard';
import { Input } from '../../components/ui/Input';
import { AuthButton } from '@/components/ui/AuthButton';
import { Colors } from '../../constants/Colors';
import { router } from 'expo-router';
import { NoowLogo } from '@/components/ui/NoowLogo';

export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    // Здесь должна быть реальная логика аутентификации
    if (typeof window !== 'undefined') {
      localStorage.setItem('isAuthenticated', 'true');
    }
    router.replace('/');
  };

  return (
    <ImageBackground
      source={require('../../assets/images/authback.png')}
      resizeMode="cover"
      style={{ flex: 1, width: '100%', height: '100%' }}
    >
      <StatusBar style="light" />
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
        <AuthCard style={{ backgroundColor: 'rgba(10,10,10,0.8)', borderColor: Colors.secondary[700], borderWidth: 1, borderRadius: 12, paddingVertical: 48 }}>
          <View>
            <Text style={{ color: Colors.text.primary, fontSize: 20, fontFamily: 'Inter', textAlign: 'center', marginBottom: 0, fontWeight: '400' }}>
              WELCOME TO
            </Text>
            <View style={{ alignItems: 'center', marginBottom: 30 }}>
              <NoowLogo width={150} height={36} />
            </View>
            <Input
              placeholder="email"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
              style={{ marginBottom: 5 }}
            />
            <Input
              placeholder="password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              style={{ marginBottom: 30 }}
            />
            <AuthButton
              title="Войти"
              onPress={handleSignIn}
              style={{ marginBottom: 16 }}
              textStyle={{ fontSize: 14, letterSpacing: 1 }}
            />
            <View style={{ alignItems: 'center', marginTop: 0 }}>
              <Text style={{ color: Colors.text.secondary, fontSize: 12, textAlign: 'center', marginBottom: 0, textDecorationLine: 'none' }}>
                Нет аккаунта?
              </Text>
              <TouchableOpacity onPress={() => router.push('/auth/sign-up')}>
                <Text style={{ color: Colors.primary[500], fontSize: 12, textAlign: 'center', textDecorationLine: 'underline', fontWeight: '600' }}>
                  Зарегистрироваться
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </AuthCard>
      </SafeAreaView>
    </ImageBackground>
  );
} 