import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Modal, Pressable } from 'react-native';
import { router } from 'expo-router';
import { ArrowRight, ArrowLeft, XCircle } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Card } from '../../components';

const ageRanges = [
  { id: '18-25', label: '18-25', subtitle: 'ЦИФРОВЫЕ АБОРИГЕНЫ' },
  { id: '26-35', label: '26-35', subtitle: 'ТЕХНОЛОГИЧЕСКИЕ ВОИНЫ' },
  { id: '36-45', label: '36-45', subtitle: 'ЦИФРОВЫЕ ЛИДЕРЫ' },
  { id: '46+', label: '46+', subtitle: 'ТЕХНОЛОГИЧЕСКИЕ ПИОНЕРЫ' },
];

export default function OnboardingStep2() {
  const [selectedAge, setSelectedAge] = useState<string | null>(null);
  const [showSkipModal, setShowSkipModal] = useState(false);

  const handleContinue = () => {
    if (selectedAge) {
      const selectedRange = ageRanges.find(range => range.id === selectedAge);
      if (selectedRange) {
        if (typeof window !== 'undefined') {
          localStorage.setItem('userAgeRange', selectedRange.id);
          localStorage.setItem('userAgeRangeLabel', selectedRange.subtitle);
        }
      }
      router.push('/onboarding/step-3');
    }
  };

  const handleSkip = () => {
    setShowSkipModal(true);
  };

  const confirmSkip = () => {
    setShowSkipModal(false);
    router.replace('/(tabs)'); // Переход на главный экран
  };

  const cancelSkip = () => {
    setShowSkipModal(false);
  };

  return (
    <View className="flex-1 bg-[#0A0A0A]">
      <SafeAreaView className="flex-1 px-8 pt-6">
        {/* Header */}
        <View className="w-full flex-row items-center justify-between mb-5">
          <TouchableOpacity 
            className="p-2 rounded-full"
            onPress={() => router.back()}
          >
            <ArrowLeft size={18} color="#FFFFFF" strokeWidth={1.5} />
          </TouchableOpacity>
          <View className="flex-1 flex-row justify-end items-center ml-4">
            <Text className="text-white/60 text-xs font-medium uppercase tracking-widest">ШАГ 2 ИЗ 6</Text>
            <TouchableOpacity onPress={handleSkip} className="p-2 rounded-full ml-auto">
              <Text className="text-white/60 text-xs font-semibold uppercase tracking-widest">Пропустить</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="w-full mb-5">
          <View className="h-1 bg-white/10 rounded-sm mb-1.5">
            <View className="h-full bg-primary-500 rounded-sm" style={{ width: '33.33%' }} />
          </View>
        </View>

        {/* Main content */}
        <View className="flex-1">
          <Text className="text-white text-lg font-bold text-center mb-3 leading-tight tracking-wide">ДАВАЙ НАСТРОИМ{'\n'}ТВОЙ РИТМ!</Text>
          
          <Text className="text-white/80 text-sm text-center leading-snug mb-6 tracking-tight">
            СНАЧАЛА ВЫБЕРИ СВОЙ{'\n'}
            ВОЗРАСТНОЙ ДИАПАЗОН:{'\n'}
            ЭТО ПОМОЖЕТ НАМ СОЗДАТЬ{'\n'}
            ТВОЙ ИДЕАЛЬНЫЙ БИОЛОГИЧЕСКИЙ ЦИКЛ.
          </Text>

          <View className="gap-2.5 mb-5">
            {ageRanges.map((range) => (
              <TouchableOpacity
                key={range.id}
                className={`
                  bg-white/5 rounded-xl p-4 border border-white/10 relative
                  ${selectedAge === range.id ? 'bg-primary-500/10 border-primary-500' : ''}
                `}
                onPress={() => setSelectedAge(range.id)}
              >
                <View className="items-center">
                  <Text className={`
                    text-base font-semibold text-white mb-0.5 tracking-wider
                    ${selectedAge === range.id ? 'text-primary-500' : ''}
                  `}>
                    {range.label}
                  </Text>
                  <Text className={`
                    text-xs text-white/60 tracking-tight
                    ${selectedAge === range.id ? 'text-primary-500/80' : ''}
                  `}>
                    {range.subtitle}
                  </Text>
                </View>
                {selectedAge === range.id && (
                  <View className="absolute top-3 right-3 w-2 h-2 bg-primary-500 rounded-full" />
                )}
              </TouchableOpacity>
            ))}
          </View>

          {selectedAge && (
            <Text className="text-primary-500 text-sm font-medium text-center tracking-wider">
              ОТЛИЧНО! ДАВАЙ NOOWING!
            </Text>
          )}
        </View>

        {/* Bottom section */}
        <View className="pb-4">
          <Button 
            title="ПРОДОЛЖИТЬ"
            onPress={handleContinue}
            disabled={!selectedAge}
            fullWidth
            size="lg"
            className="shadow-medium"
          />
        </View>
      </SafeAreaView>

      {/* Модальное окно Пропустить */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showSkipModal}
        onRequestClose={cancelSkip}
      >
        <Pressable className="flex-1 justify-center items-center bg-black/70 p-6" onPress={cancelSkip}>
          <Card variant="default" className="w-full max-w-sm p-6 bg-secondary-900 border border-secondary-700 rounded-3xl shadow-strong">
            <TouchableOpacity onPress={cancelSkip} className="absolute top-4 right-4 p-2">
              <XCircle size={24} color="#cbd5e1" />
            </TouchableOpacity>
            <Text className="text-white text-2xl font-bold mb-4 text-center">Пропустить онбординг?</Text>
            <Text className="text-secondary-300 text-base text-center mb-6">
              Пропуск онбординга может привести к непониманию основных функций приложения и потере ценных данных для персонализации.
            </Text>
            <Button
              title="Продолжить онбординг"
              onPress={cancelSkip}
              fullWidth
              className="mb-3"
            />
            <Button
              title="Пропустить все равно"
              onPress={confirmSkip}
              variant="ghost"
              fullWidth
            />
          </Card>
        </Pressable>
      </Modal>
    </View>
  );
}