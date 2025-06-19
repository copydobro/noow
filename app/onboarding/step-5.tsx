import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert, Modal, Pressable } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, Globe, MapPin, XCircle } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Card } from '../../components';

export default function OnboardingStep5() {
  const [selectedMethod, setSelectedMethod] = useState<'auto' | 'manual' | null>(null);
  const [utcOffset, setUtcOffset] = useState('');
  const [detectedTimezone, setDetectedTimezone] = useState<string | null>(null);
  const [showSkipModal, setShowSkipModal] = useState(false);

  const handleAutoLocation = () => {
    setSelectedMethod('auto');
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const offset = new Date().getTimezoneOffset() / -60;
    const offsetString = offset >= 0 ? `+${offset}` : `${offset}`;
    setDetectedTimezone(`${timezone} (UTC${offsetString})`);
  };

  const handleManualInput = () => {
    setSelectedMethod('manual');
    setDetectedTimezone(null);
  };

  const validateUTCOffset = (input: string): boolean => {
    const regex = /^[+-]?\d{1,2}$/;
    if (!regex.test(input)) return false;
    
    const num = parseInt(input);
    return num >= -12 && num <= 14;
  };

  const handleContinue = () => {
    if (selectedMethod === 'auto' && detectedTimezone) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('userTimezone', detectedTimezone);
      }
      router.push('/onboarding/step-6');
    } else if (selectedMethod === 'manual' && validateUTCOffset(utcOffset)) {
      const offsetString = utcOffset.startsWith('+') || utcOffset.startsWith('-') ? utcOffset : '+' + utcOffset;
      const timezoneString = `UTC${offsetString}`;
      if (typeof window !== 'undefined') {
        localStorage.setItem('userTimezone', timezoneString);
      }
      router.push('/onboarding/step-6');
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

  const canContinue =
    (selectedMethod === 'auto' && detectedTimezone) ||
    (selectedMethod === 'manual' && validateUTCOffset(utcOffset));

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
              <Text className="text-white/60 text-xs font-medium uppercase tracking-widest">ШАГ 5 ИЗ 6</Text>
              <TouchableOpacity onPress={handleSkip} className="p-2 rounded-full ml-auto">
                <Text className="text-white/60 text-xs font-semibold uppercase tracking-widest">Пропустить</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View className="w-full mb-5">
            <View className="h-1 bg-white/10 rounded-sm mb-1.5">
              <View className="h-full bg-primary-500 rounded-sm" style={{ width: '83.33%' }} />
            </View>
          </View>

          {/* Main content */}
        <View className="flex-1 items-center">
          <View className="mb-4 p-2.5 bg-primary-500/10 rounded-xl border border-primary-500/20">
            <Globe size={28} color="#f97316" strokeWidth={1.5} />
            </View>

          <Text className="text-white text-lg font-bold text-center mb-3 leading-tight tracking-wide">Какой у тебя{'\n'}часовой пояс?</Text>
            
          <Text className="text-white/80 text-sm text-center leading-snug mb-5 tracking-tight">
              Это обеспечит соответствие твоего{'\n'}
              ритма биологическим часам.{'\n'}
              Выбери свой вариант:
            </Text>

          <Text className="text-white/60 text-xs text-center leading-snug mb-5 tracking-tight">
              Твой стул убивает тебя. Давай{'\n'}
              бороться с этим идеальным таймингом.
            </Text>

          <View className="w-full gap-2.5 mb-5">
              <TouchableOpacity
              className={`
                bg-white/5 rounded-xl p-3.5 border border-white/10 relative flex-row items-center
                ${selectedMethod === 'auto' ? 'bg-primary-500/10 border-primary-500' : ''}
              `}
                onPress={handleAutoLocation}
              >
              <MapPin size={18} color={selectedMethod === 'auto' ? '#f97316' : '#FFFFFF'} strokeWidth={1.5} className="mr-2" />
              <View className="flex-1">
                <Text className={`
                  text-base font-semibold text-white mb-0.5 tracking-wider
                  ${selectedMethod === 'auto' ? 'text-primary-500' : ''}
                `}>
                      Поделиться моим{'\n'}местоположением
                    </Text>
                <Text className={`
                  text-xs text-white/60 tracking-tight
                  ${selectedMethod === 'auto' ? 'text-primary-500/80' : ''}
                `}>
                      (рекомендуется)
                    </Text>
                </View>
                {selectedMethod === 'auto' && (
                <View className="absolute top-3 right-3 w-2 h-2 bg-primary-500 rounded-full" />
                )}
              </TouchableOpacity>

              <TouchableOpacity
              className={`
                bg-white/5 rounded-xl p-3.5 border border-white/10 relative flex-row items-center
                ${selectedMethod === 'manual' ? 'bg-primary-500/10 border-primary-500' : ''}
              `}
                onPress={handleManualInput}
              >
              <Globe size={18} color={selectedMethod === 'manual' ? '#f97316' : '#FFFFFF'} strokeWidth={1.5} className="mr-2" />
              <View className="flex-1">
                <Text className={`
                  text-base font-semibold text-white mb-0.5 tracking-wider
                  ${selectedMethod === 'manual' ? 'text-primary-500' : ''}
                `}>
                      Ввести смещение UTC
                    </Text>
                <Text className={`
                  text-xs text-white/60 tracking-tight
                  ${selectedMethod === 'manual' ? 'text-primary-500/80' : ''}
                `}>
                      (например, +3, -5)
                    </Text>
                </View>
                {selectedMethod === 'manual' && (
                <View className="absolute top-3 right-3 w-2 h-2 bg-primary-500 rounded-full" />
                )}
              </TouchableOpacity>
            </View>

            {selectedMethod === 'manual' && (
            <View className="w-full mb-5">
              <Text className="text-secondary-300 text-sm font-semibold mb-2">Смещение UTC:</Text>
                <TextInput
                className="w-full p-4 rounded-xl bg-secondary-800 text-white border border-secondary-700 focus:border-primary-500"
                  value={utcOffset}
                  onChangeText={setUtcOffset}
                  placeholder="+3"
                placeholderTextColor="#64748b"
                  keyboardType="numeric"
                  maxLength={3}
                />
                {utcOffset && !validateUTCOffset(utcOffset) && (
                <Text className="text-red-400 text-xs mt-2 text-center leading-snug">
                    Введите корректное смещение{'\n'}от -12 до +14
                  </Text>
                )}
              </View>
            )}

          {detectedTimezone && selectedMethod === 'auto' && (
            <View className="w-full flex-row items-center justify-center mb-5 p-3 bg-secondary-800 rounded-xl border border-secondary-700">
              <Text className="text-secondary-300 text-sm mr-2">Определенный часовой пояс:</Text>
              <Text className="text-white text-base font-semibold">{detectedTimezone}</Text>
              </View>
            )}

            {canContinue && (
            <Text className="text-primary-500 text-sm font-medium text-center tracking-wider">
                Идеально! Твой ритм синхронизирован с{'\n'}{
                  selectedMethod === 'auto' 
                    ? detectedTimezone 
                    : `UTC${utcOffset.startsWith('+') || utcOffset.startsWith('-') ? utcOffset : '+' + utcOffset}`
                }
              </Text>
            )}
          </View>

          {/* Bottom section */}
        <View className="pb-4">
          <Button 
            title="ПРОДОЛЖИТЬ"
              onPress={handleContinue}
              disabled={!canContinue}
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