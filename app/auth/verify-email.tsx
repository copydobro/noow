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
    // После подтверждения email можно перенаправить на главный экран или экран входа
    router.replace('/auth/sign-in');
  };

  const handleResendEmail = () => {
    // Здесь должна быть реальная логика повторной отправки email
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
              ПОДТВЕРЖДЕНИЕ
            </Text>
            <Text style={{ color: Colors.text.primary, fontSize: 24, fontFamily: 'Inter', textAlign: 'center', marginBottom: 30, fontWeight: '700', letterSpacing: 2 }}>
              EMAIL
            </Text>
            <Text style={{ color: Colors.text.secondary, fontSize: 14, fontFamily: 'Segoe UI', textAlign: 'center', marginBottom: 30, lineHeight: 20 }}>
              Мы отправили письмо с подтверждением на ваш email. Пожалуйста, проверьте почту и перейдите по ссылке для подтверждения.
            </Text>
            <AuthButton
              title="Проверить"
              onPress={handleVerifyEmail}
              style={{ marginBottom: 16 }}
              textStyle={{ fontSize: 14 }}
            />
            <View style={{ alignItems: 'center', marginTop: 0 }}>
              <TouchableOpacity onPress={handleResendEmail}>
                <Text style={{ color: Colors.primary[500], fontSize: 12, textAlign: 'center', textDecorationLine: 'underline', fontWeight: '600' }}>
                  Отправить повторно
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </AuthCard>
      </SafeAreaView>
    </ImageBackground>
  );
} 