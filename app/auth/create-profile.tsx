import React, { useState } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AuthCard } from '@/components/ui/AuthCard';
import { Input } from '../../components/ui/Input';
import { AuthButton } from '@/components/ui/AuthButton';
import { Colors } from '../../constants/Colors';
import { router } from 'expo-router';

export default function CreateProfileScreen() {
  const [username, setUsername] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [interests, setInterests] = useState('');

  const handleCreateProfile = () => {
    // Здесь должна быть реальная логика создания профиля
    router.replace('/');
  };

  const handleSkip = () => {
    // Пропустить создание профиля
    router.replace('/');
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
              СОЗДАНИЕ
            </Text>
            <Text style={{ color: Colors.text.primary, fontSize: 24, fontFamily: 'Inter', textAlign: 'center', marginBottom: 32, fontWeight: '700', letterSpacing: 2 }}>
              ПРОФИЛЯ
            </Text>
            <View style={{ marginBottom: 16 }}>
              <Text style={{ color: Colors.text.secondary, fontSize: 16, fontFamily: 'Segoe UI', fontWeight: '600', marginBottom: 8 }}>
                Имя пользователя
              </Text>
              <Input
                placeholder="Введите имя пользователя"
                value={username}
                onChangeText={setUsername}
                style={{ marginBottom: 0 }}
              />
            </View>
            <View style={{ marginBottom: 16 }}>
              <Text style={{ color: Colors.text.secondary, fontSize: 16, fontFamily: 'Segoe UI', fontWeight: '600', marginBottom: 8 }}>
                Возраст
              </Text>
              <Input
                placeholder="Укажите ваш возраст"
                keyboardType="numeric"
                value={age}
                onChangeText={setAge}
                style={{ marginBottom: 0 }}
              />
            </View>
            <View style={{ marginBottom: 16 }}>
              <Text style={{ color: Colors.text.secondary, fontSize: 16, fontFamily: 'Segoe UI', fontWeight: '600', marginBottom: 8 }}>
                Пол
              </Text>
              <Input
                placeholder="Укажите ваш пол"
                value={gender}
                onChangeText={setGender}
                style={{ marginBottom: 0 }}
              />
            </View>
            <View style={{ marginBottom: 24 }}>
              <Text style={{ color: Colors.text.secondary, fontSize: 16, fontFamily: 'Segoe UI', fontWeight: '600', marginBottom: 8 }}>
                Интересы
              </Text>
              <Input
                placeholder="Расскажите о ваших интересах"
                value={interests}
                onChangeText={setInterests}
                multiline
                numberOfLines={3}
                style={{ marginBottom: 0 }}
              />
            </View>
            <AuthButton
              title="Создать профиль"
              onPress={handleCreateProfile}
              style={{ marginBottom: 16 }}
            />
            <TouchableOpacity onPress={handleSkip}>
              <Text style={{ color: Colors.primary[500], fontSize: 16, fontFamily: 'Segoe UI', fontWeight: '600', textAlign: 'center', textDecorationLine: 'underline' }}>
                Пропустить
              </Text>
            </TouchableOpacity>
          </View>
        </AuthCard>
      </SafeAreaView>
    </ImageBackground>
  );
} 