import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Modal, Pressable } from 'react-native';
import { router } from 'expo-router';
import { Brain, ArrowRight, XCircle } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Card } from '../../components';
import { AuthCard } from '@/components/ui/AuthCard';
import { AuthButton } from '@/components/ui/AuthButton';

const { width, height } = Dimensions.get('window');

export default function OnboardingWelcome() {
  const [showSkipModal, setShowSkipModal] = useState(false);

  const handleSkip = () => {
    setShowSkipModal(true);
  };

  const confirmSkip = () => {
    setShowSkipModal(false);
    router.replace('/(tabs)');
  };

  const cancelSkip = () => {
    setShowSkipModal(false);
  };

  return (
    <View className="flex-1 bg-[#0A0A0A]">
      <SafeAreaView className="flex-1 px-8 pt-6">
        <View className="w-full flex-row justify-between items-center mb-5">
          <Text className="text-white/60 text-xs font-medium uppercase tracking-widest">ШАГ 1 ИЗ 6</Text>
          <TouchableOpacity onPress={handleSkip} className="p-2 rounded-full">
            <Text className="text-white/60 text-xs font-semibold uppercase tracking-widest">Пропустить</Text>
          </TouchableOpacity>
        </View>

        <View className="w-full mb-5">
          <View className="h-1 bg-white/10 rounded-sm mb-1.5">
            <View className="h-full bg-primary-500 rounded-sm" style={{ width: '16.67%' }} />
          </View>
        </View>

        <View className="flex-1 items-center">
          <View className="mb-4 p-3 bg-primary-500/10 rounded-2xl border border-primary-500/20">
            <Brain size={32} color="#f97316" strokeWidth={1.5} />
          </View>

          <Text className="text-white text-lg font-bold text-center mb-3 leading-tight tracking-wide">
            ПРИВЕТ! Я ТВОЙ{'\n'}
            КОМПАНЬОН NOOWING.
          </Text>
          
          <Text className="text-white/80 text-sm text-center leading-snug mb-4 tracking-tight">
            ДАВАЙ ВМЕСТЕ ПЕРЕЗАГРУЗИМ{'\n'}
            ТВОЙ БИОЛОГИЧЕСКИЙ РИТМ!{'\n'}
            ПРИСОЕДИНЯЙСЯ К НАШЕМУ{'\n'}
            СООБЩЕСТВУ ЦИФРОВЫХ ВОИНОВ.
          </Text>

          <View className="w-full mb-4">
            <Text className="text-primary-500 text-sm font-semibold text-center mb-2 leading-tight tracking-tight">
              ЧТО ТАКОЕ NOOWING?{'\n'}ЭТО ТВОЙ ЦИКЛ 45-2-5:
            </Text>
            <View className="flex-row items-center mb-1.5 pl-4">
              <View className="w-1 h-1 bg-primary-500 rounded-full mr-2" />
              <Text className="text-white/90 text-xs leading-tight tracking-tight">45 МИНУТ ГЛУБОКОЙ РАБОТЫ</Text>
            </View>
            <View className="flex-row items-center mb-1.5 pl-4">
              <View className="w-1 h-1 bg-primary-500 rounded-full mr-2" />
              <Text className="text-white/90 text-xs leading-tight tracking-tight">2 МИНУТЫ ФИЗИЧЕСКОЙ АКТИВАЦИИ</Text>
            </View>
            <View className="flex-row items-center mb-1.5 pl-4">
              <View className="w-1 h-1 bg-primary-500 rounded-full mr-2" />
              <Text className="text-white/90 text-xs leading-tight tracking-tight">5 МИНУТ МИНИ-ОТДЫХА</Text>
            </View>
          </View>

          <Text className="text-white text-sm font-medium text-center leading-snug mb-2 tracking-tight">
            ЭТО НЕ ПРОСТО ПРОДУКТИВНОСТЬ.{'\n'}
            ЭТО ЕСТЕСТВЕННАЯ ОПЕРАЦИОННАЯ{'\n'}
            СИСТЕМА ТВОЕГО МОЗГА.
          </Text>

          <Text className="text-white/70 text-xs text-center leading-snug tracking-tight">
            ГОТОВ ОБНОВИТЬ СВОЮ HUMANOS?{'\n'}
            НАСТРОЙКА ЗАЙМЕТ МЕНЕЕ 30 СЕКУНД.
          </Text>
        </View>

        <View className="pb-4">
          <Text className="text-white/60 text-xs font-medium text-center mb-4 tracking-wider">100+ ЧЕЛОВЕК УЖЕ NOOWING</Text>
          
          <Button 
            title="ДАВАЙ NOOWING"
            onPress={() => router.push('/onboarding/step-2')}
            fullWidth
            size="lg"
            className="shadow-medium"
          />
        </View>
      </SafeAreaView>

      <Modal
        animationType="fade"
        transparent={true}
        visible={showSkipModal}
        onRequestClose={cancelSkip}
      >
        <Pressable className="flex-1 justify-center items-center bg-black/70 p-6" onPress={cancelSkip}>
          <AuthCard style={{ borderRadius: 12, padding: 20, alignItems: 'center' }}>
            <TouchableOpacity onPress={cancelSkip} style={{ position: 'absolute', top: 12, right: 12, zIndex: 10, padding: 4 }}>
              <XCircle size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={{ color: '#fff', fontSize: 22, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' }}>Пропустить онбординг?</Text>
            <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 15, textAlign: 'center', marginBottom: 24 }}>
              Пропуск онбординга может привести к непониманию основных функций приложения и потере ценных данных для персонализации.
            </Text>
            <AuthButton
              title="Продолжить онбординг"
              onPress={cancelSkip}
              style={{ width: '100%', marginBottom: 12, borderRadius: 12 }}
            />
            <AuthButton
              title="Пропустить все равно"
              onPress={confirmSkip}
              style={{ width: '100%', backgroundColor: 'transparent', borderWidth: 1, borderColor: '#FF6B00', borderRadius: 12 }}
              textStyle={{ color: '#FF6B00' }}
            />
          </AuthCard>
        </Pressable>
      </Modal>
    </View>
  );
}