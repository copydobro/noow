import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Heart, Zap, Brain, X, CheckCircle } from 'lucide-react-native';
import { Button, Card } from '@/components/ui';
import { Colors } from '@/constants';
import Slider from '@react-native-community/slider';

export default function FeedbackScreen() {
  const [visible, setVisible] = useState(true);
  const [feedback, setFeedback] = useState({ mood: 3, energy: 3, focus: 3 });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSlider = (category: string, value: number) => {
    setFeedback(prev => ({ ...prev, [category]: Math.round(value) }));
  };

  const submitFeedback = () => {
    setIsSubmitted(true);
    setTimeout(() => {
      setVisible(false);
      router.replace('/(tabs)');
    }, 1200);
  };

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View className="flex-1 bg-black/80 justify-center items-center px-4">
        <Card style={{ backgroundColor: '#0A0A0A', width: '100%', maxWidth: 400, padding: 24, borderRadius: 24 }}>
          {/* Header */}
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-lg font-bold text-white tracking-widest">ОБРАТНАЯ СВЯЗЬ</Text>
            <TouchableOpacity onPress={() => { setVisible(false); router.back(); }} className="p-2 rounded-full">
              <X size={22} color={Colors.text.primary} />
            </TouchableOpacity>
          </View>
          <Text className="text-xs text-white/50 mb-6">Как вы себя чувствуете?</Text>

          {/* Ползунки */}
          <View className="mb-4">
            <View className="mb-6">
              <View className="flex-row items-center mb-2">
                <Heart size={18} color={Colors.accentColors.primary} />
                <Text className="ml-2 text-white font-semibold">Настроение</Text>
                <Text className="ml-auto text-orange-400 font-bold text-base">{feedback.mood}</Text>
              </View>
              <Slider
                minimumValue={1}
                maximumValue={5}
                step={1}
                value={feedback.mood}
                onValueChange={v => handleSlider('mood', v)}
                minimumTrackTintColor={Colors.accentColors.primary}
                maximumTrackTintColor="#222"
                thumbTintColor={Colors.accentColors.primary}
                style={{ width: '100%', height: 32 }}
              />
            </View>
            <View className="mb-6">
              <View className="flex-row items-center mb-2">
                <Zap size={18} color={Colors.accentColors.primary} />
                <Text className="ml-2 text-white font-semibold">Энергия</Text>
                <Text className="ml-auto text-orange-400 font-bold text-base">{feedback.energy}</Text>
              </View>
              <Slider
                minimumValue={1}
                maximumValue={5}
                step={1}
                value={feedback.energy}
                onValueChange={v => handleSlider('energy', v)}
                minimumTrackTintColor={Colors.accentColors.primary}
                maximumTrackTintColor="#222"
                thumbTintColor={Colors.accentColors.primary}
                style={{ width: '100%', height: 32 }}
              />
            </View>
            <View className="mb-2">
              <View className="flex-row items-center mb-2">
                <Brain size={18} color={Colors.accentColors.primary} />
                <Text className="ml-2 text-white font-semibold">Концентрация</Text>
                <Text className="ml-auto text-orange-400 font-bold text-base">{feedback.focus}</Text>
              </View>
              <Slider
                minimumValue={1}
                maximumValue={5}
                step={1}
                value={feedback.focus}
                onValueChange={v => handleSlider('focus', v)}
                minimumTrackTintColor={Colors.accentColors.primary}
                maximumTrackTintColor="#222"
                thumbTintColor={Colors.accentColors.primary}
                style={{ width: '100%', height: 32 }}
              />
            </View>
          </View>

          {/* Статистика */}
          <Card style={{ backgroundColor: '#0A0A0A', marginBottom: 24, padding: 16, borderRadius: 16 }}>
            <Text className="text-xs text-white/50 mb-2 tracking-widest">КРАТКАЯ СТАТИСТИКА ЦИКЛА</Text>
            <View className="flex-row justify-between">
              <View className="items-center flex-1">
                <Text className="text-lg font-bold text-orange-400">52:00</Text>
                <Text className="text-xs text-white/60 mt-1">ОБЩЕЕ ВРЕМЯ</Text>
              </View>
              <View className="items-center flex-1">
                <Text className="text-lg font-bold text-orange-400">100%</Text>
                <Text className="text-xs text-white/60 mt-1">ЗАВЕРШЕНО</Text>
              </View>
              <View className="items-center flex-1">
                <Text className="text-lg font-bold text-orange-400">7</Text>
                <Text className="text-xs text-white/60 mt-1">СЕРИЯ ДНЕЙ</Text>
              </View>
            </View>
          </Card>

          {/* Кнопка */}
          {!isSubmitted ? (
            <Button
              title="ОТПРАВИТЬ ОТЗЫВ"
              onPress={submitFeedback}
              style={{ marginTop: 8, marginBottom: 0 }}
            />
          ) : (
            <View className="items-center py-6">
              <CheckCircle size={48} color={Colors.success[500]} className="mb-2" />
              <Text className="text-lg text-white font-bold mb-1">Спасибо за отзыв!</Text>
            </View>
          )}
        </Card>
      </View>
    </Modal>
  );
} 