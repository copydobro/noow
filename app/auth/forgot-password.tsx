import React, { useState } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AuthCard } from '@/components/ui/AuthCard';
import { Input } from '../../components/ui/Input';
import { AuthButton } from '@/components/ui/AuthButton';
import { Colors } from '../../constants/Colors';
import { router } from 'expo-router';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');

  const handleResetPassword = () => {
    // Здесь должна быть реальная логика восстановления пароля
    router.push('/auth/verify-email');
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
              ВОССТАНОВЛЕНИЕ
            </Text>
            <Text style={{ color: Colors.text.primary, fontSize: 24, fontFamily: 'Inter', textAlign: 'center', marginBottom: 30, fontWeight: '700', letterSpacing: 2 }}>
              ПАРОЛЯ
            </Text>
            <Text style={{ color: Colors.text.secondary, fontSize: 14, fontFamily: 'Segoe UI', textAlign: 'center', marginBottom: 30, lineHeight: 20 }}>
              Введите email, указанный при регистрации. Мы отправим инструкции по восстановлению пароля.
            </Text>
            <View style={{ marginBottom: 30 }}>
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
            <AuthButton
              title="Отправить"
              onPress={handleResetPassword}
              style={{ marginBottom: 16 }}
              textStyle={{ fontSize: 14 }}
            />
            <View style={{ alignItems: 'center', marginTop: 0 }}>
              <TouchableOpacity onPress={() => router.push('/auth/sign-in')}>
                <Text style={{ color: Colors.primary[500], fontSize: 12, textAlign: 'center', textDecorationLine: 'underline', fontWeight: '600' }}>
                  Вернуться к входу
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </AuthCard>
      </SafeAreaView>
    </ImageBackground>
  );
} 