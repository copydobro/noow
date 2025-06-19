import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AuthCard } from '@/components/ui/AuthCard';
import { AuthButton } from '@/components/ui/AuthButton';
import { Colors } from '../../constants/Colors';
import { router } from 'expo-router';

export default function VerifyEmailScreen() {
  const handleVerifyEmail = () => {
    // Здесь должна быть реальная логика подтверждения email
    router.push('/auth/create-profile');
  };

  const handleResendEmail = () => {
    // Здесь должна быть реальная логика повторной отправки email
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
              ПОДТВЕРЖДЕНИЕ
            </Text>
            <Text style={{ color: Colors.text.primary, fontSize: 24, fontFamily: 'Inter', textAlign: 'center', marginBottom: 32, fontWeight: '700', letterSpacing: 2 }}>
              EMAIL
            </Text>
            <Text style={{ color: Colors.text.secondary, fontSize: 14, fontFamily: 'Segoe UI', textAlign: 'center', marginBottom: 24, lineHeight: 20 }}>
              Мы отправили письмо с подтверждением на ваш email. Пожалуйста, проверьте почту и перейдите по ссылке для подтверждения.
            </Text>
            <AuthButton
              title="Проверить"
              onPress={handleVerifyEmail}
              style={{ marginBottom: 16 }}
            />
            <TouchableOpacity onPress={handleResendEmail}>
              <Text style={{ color: Colors.primary[500], fontSize: 16, fontFamily: 'Segoe UI', fontWeight: '600', textAlign: 'center', textDecorationLine: 'underline' }}>
                Отправить повторно
              </Text>
            </TouchableOpacity>
          </View>
        </AuthCard>
      </SafeAreaView>
    </ImageBackground>
  );
} 