import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Modal, Pressable, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, XCircle, Clock } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Card } from '../../components';

const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
const minutes = ['00', '15', '30', '45'];

export default function OnboardingStep4() {
  const [startTime, setStartTime] = useState<string | null>(null);
  const [endTime, setEndTime] = useState<string | null>(null);
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [pickerType, setPickerType] = useState<'start' | 'end' | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showSkipModal, setShowSkipModal] = useState(false);

  const handleQuickTimeSelect = (time: string) => {
    const [startH, startM] = time.split(' - ')[0].split(':');
    const [endH, endM] = time.split(' - ')[1].split(':');
    setStartTime(`${startH}:${startM}`);
    setEndTime(`${endH}:${endM}`);
    setError(null);
  };

  const handleContinue = () => {
    if (startTime && endTime) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('userWorkStartTime', startTime);
        localStorage.setItem('userWorkEndTime', endTime);
      }
      router.push('/onboarding/step-5');
    } else {
      setError('Пожалуйста, выберите начало и конец рабочего дня.');
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

  const renderTimePicker = () => {
    if (!showPicker) return null;

    const selectedHours = pickerType === 'start' ? startTime?.split(':')[0] : endTime?.split(':')[0];
    const selectedMinutes = pickerType === 'start' ? startTime?.split(':')[1] : endTime?.split(':')[1];

    return (
      <View className="bg-secondary-800 rounded-xl p-4 mt-4 mb-4">
        <Text className="text-white text-lg font-bold mb-3 text-center">
          {pickerType === 'start' ? 'Выберите время начала' : 'Выберите время окончания'}
        </Text>
        <View className="flex-row justify-center mb-4">
          {/* Assuming Picker is available or will be handled */}
          {/* <Picker
            selectedValue={selectedHours}
            onValueChange={(itemValue) => {
              const newTime = `${itemValue}:${selectedMinutes || '00'}`;
              if (pickerType === 'start') setStartTime(newTime);
              else setEndTime(newTime);
              setError(null);
            }}
            className="w-1/2 text-white"
            itemStyle={{ color: '#FFFFFF', fontSize: 18 }}
          >
            {hours.map((h) => (
              <Picker.Item key={h} label={h} value={h} />
            ))}
          </Picker>
          <Picker
            selectedValue={selectedMinutes}
            onValueChange={(itemValue) => {
              const newTime = `${selectedHours || '00'}:${itemValue}`;
              if (pickerType === 'start') setStartTime(newTime);
              else setEndTime(newTime);
              setError(null);
            }}
            className="w-1/2 text-white"
            itemStyle={{ color: '#FFFFFF', fontSize: 18 }}
          >
            {minutes.map((m) => (
              <Picker.Item key={m} label={m} value={m} />
            ))}
          </Picker> */}
        </View>
        <Button title="ОК" onPress={() => setShowPicker(false)} fullWidth />
      </View>
    );
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
            <Text className="text-white/60 text-xs font-medium uppercase tracking-widest">ШАГ 4 ИЗ 6</Text>
            <TouchableOpacity onPress={handleSkip} className="p-2 rounded-full ml-auto">
              <Text className="text-white/60 text-xs font-semibold uppercase tracking-widest">Пропустить</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="w-full mb-5">
          <View className="h-1 bg-white/10 rounded-sm mb-1.5">
            <View className="h-full bg-primary-500 rounded-sm" style={{ width: '66.67%' }} />
          </View>
        </View>

        {/* Main content */}
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <View className="items-center">
            <View className="mb-4 p-2.5 bg-primary-500/10 rounded-xl border border-primary-500/20">
              <Clock size={28} color="#f97316" strokeWidth={1.5} />
            </View>

            <Text className="text-white text-lg font-bold text-center mb-6 leading-tight tracking-wide">
              НАСТРОИМ ТВОЙ РИТМ!{'\n'}
              КАКОЕ ТВОЕ ИДЕАЛЬНОЕ{'\n'}
              ВРЕМЯ ДЛЯ ГЛУБОКОЙ РАБОТЫ?
            </Text>

            {/* Quick Time Select */}
            <View className="w-full mb-6">
              <Text className="text-secondary-300 text-sm font-semibold uppercase tracking-wider mb-3 text-center">
                БЫСТРЫЙ ВЫБОР
              </Text>
              <View className="flex-row flex-wrap justify-center gap-2">
                {['6:00 - 10:00', '10:00 - 14:00', '14:00 - 18:00', '18:00 - 22:00', '22:00 - 2:00', '2:00 - 6:00'].map((time, index) => (
                  <TouchableOpacity
                    key={index}
                    className={`
                      bg-secondary-800 rounded-lg py-2 px-4 border border-secondary-700
                      ${(startTime === time.split(' - ')[0] && endTime === time.split(' - ')[1]) ? 'bg-primary-500/10 border-primary-500' : ''}
                    `}
                    onPress={() => handleQuickTimeSelect(time)}
                  >
                    <Text className="text-white text-xs font-medium">{time}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Manual Time Input */}
            <View className="w-full bg-secondary-900 rounded-3xl p-5 mb-6 border border-secondary-700 shadow-strong">
              <Text className="text-white text-sm font-semibold tracking-wider mb-4 text-center">
                ИЛИ ВВЕДИ ВРУЧНУЮ
              </Text>
              <View className="flex-row justify-between mb-4">
                <TouchableOpacity
                  className={`
                    flex-1 bg-secondary-800 rounded-xl p-3 border border-secondary-700
                    ${pickerType === 'start' ? 'border-primary-500' : ''}
                  `}
                  onPress={() => { setShowPicker(true); setPickerType('start'); }}
                >
                  <Text className="text-secondary-300 text-xs mb-1">Начало</Text>
                  <Text className="text-white text-lg font-bold">{startTime || '--:--'}</Text>
                </TouchableOpacity>
                <View className="w-4" />
                <TouchableOpacity
                  className={`
                    flex-1 bg-secondary-800 rounded-xl p-3 border border-secondary-700
                    ${pickerType === 'end' ? 'border-primary-500' : ''}
                  `}
                  onPress={() => { setShowPicker(true); setPickerType('end'); }}
                >
                  <Text className="text-secondary-300 text-xs mb-1">Конец</Text>
                  <Text className="text-white text-lg font-bold">{endTime || '--:--'}</Text>
                </TouchableOpacity>
              </View>

              {renderTimePicker()}

              {error && (
                <Text className="text-error-500 text-sm text-center mt-2">{error}</Text>
              )}
            </View>
          </View>
        </ScrollView>

        {/* Bottom section */}
        <View className="pb-4">
          <Button
            title="ПРОДОЛЖИТЬ"
            onPress={handleContinue}
            disabled={!(startTime && endTime && !error)}
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