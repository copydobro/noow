import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Modal, Pressable } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, XCircle, Activity } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Card } from '../../components';

const activityLevels = [
  { id: 'low', label: 'Низкий', subtitle: 'МИНИМАЛЬНАЯ АКТИВНОСТЬ' },
  { id: 'medium', label: 'Средний', subtitle: 'УМЕРЕННАЯ АКТИВНОСТЬ' },
  { id: 'high', label: 'Высокий', subtitle: 'Интенсивные тренировки' },
];

export default function OnboardingStep3() {
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [showSkipModal, setShowSkipModal] = useState(false);

  const handleContinue = () => {
    if (selectedLevel) {
      const selectedActivityLevel = activityLevels.find(level => level.id === selectedLevel);
      if (selectedActivityLevel) {
        if (typeof window !== 'undefined') {
          localStorage.setItem('userActivityLevel', selectedActivityLevel.id);
          localStorage.setItem('userActivityLevelLabel', `${selectedActivityLevel.label} (${selectedActivityLevel.subtitle})`);
        }
      }
      router.push('/onboarding/step-4');
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
            <Text className="text-white/60 text-xs font-medium uppercase tracking-widest">ШАГ 3 ИЗ 6</Text>
            <TouchableOpacity onPress={handleSkip} className="p-2 rounded-full ml-auto">
              <Text className="text-white/60 text-xs font-semibold uppercase tracking-widest">Пропустить</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="w-full mb-5">
          <View className="h-1 bg-white/10 rounded-sm mb-1.5">
            <View className="h-full bg-primary-500 rounded-sm" style={{ width: '50%' }} />
          </View>
        </View>

        {/* Main content */}
        <View className="flex-1 items-center">
          <View className="mb-4 p-2.5 bg-primary-500/10 rounded-xl border border-primary-500/20">
            <Activity size={28} color="#f97316" strokeWidth={1.5} />
          </View>

          <Text className="text-white text-lg font-bold text-center mb-3 leading-tight tracking-wide">Какой у тебя текущий{'\n'}уровень активности?</Text>

          <Text className="text-white/80 text-sm text-center leading-snug mb-2.5 tracking-tight">
            Давай измерим его в приседаниях:{'\n'}
            Сколько приседаний ты можешь{'\n'}
            сделать за 1 минуту?
          </Text>

          <Text className="text-white/60 text-xs text-center leading-snug mb-5 tracking-tight">
            Это поможет нам настроить{'\n'}
            идеальную интенсивность активации.
          </Text>

          <View className="w-full gap-2.5 mb-5">
            {activityLevels.map((level) => (
              <TouchableOpacity
                key={level.id}
                className={`
                  bg-white/5 rounded-xl p-3.5 border border-white/10 relative
                  ${selectedLevel === level.id ? 'bg-primary-500/10 border-primary-500' : ''}
                `}
                onPress={() => setSelectedLevel(level.id)}
              >
                <View className="items-center">
                  <View className="flex-row items-center mb-1">
                    <Text className={`
                      text-base font-semibold text-white tracking-wider
                      ${selectedLevel === level.id ? 'text-primary-500' : ''}
                    `}>
                      {level.label}
                    </Text>
                  </View>
                  <Text className={`
                    text-xs text-white/60 tracking-tight
                    ${selectedLevel === level.id ? 'text-primary-500/80' : ''}
                  `}>
                    {level.subtitle}
                  </Text>
                </View>
                {selectedLevel === level.id && (
                  <View className="absolute top-3 right-3 w-2 h-2 bg-primary-500 rounded-full" />
                )}
              </TouchableOpacity>
            ))}
          </View>

          {selectedLevel && (
            <Text className="text-primary-500 text-sm font-medium text-center tracking-wider">
              Отлично! Твоя интенсивность{'\n'}активации установлена
            </Text>
          )}
        </View>

        {/* Bottom section */}
        <View className="pb-4">
          <Button
            title="ПРОДОЛЖИТЬ"
            onPress={handleContinue}
            disabled={!selectedLevel}
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