import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, Clock } from 'lucide-react-native';
import { Button } from '../../components/ui';
import { Colors, Typography } from '../../constants';

export default function OnboardingStep4() {
  const [workStart, setWorkStart] = useState('09:00');
  const [workEnd, setWorkEnd] = useState('17:00');

  const timeSlots = [
    '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
    '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
    '18:00', '19:00', '20:00', '21:00', '22:00'
  ];

  const handleNext = () => {
    router.push('/onboarding/step-5');
  };

  const handleSkip = () => {
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
              <ArrowLeft size={20} color={Colors.text.primary} strokeWidth={1.5} />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
              <Text style={styles.skipText}>ПРОПУСТИТЬ</Text>
            </TouchableOpacity>
          </View>

          {/* Progress */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '66.67%' }]} />
            </View>
            <Text style={styles.progressText}>ШАГ 4 ИЗ 6</Text>
          </View>

          {/* Content */}
          <View style={styles.mainContent}>
            <View style={styles.iconContainer}>
              <Clock size={32} color={Colors.accentColors.primary} strokeWidth={1.5} />
            </View>
            
            <Text style={styles.title}>ВАШИ РАБОЧИЕ ЧАСЫ</Text>
            <Text style={styles.subtitle}>
              Установите время, когда вы обычно работаете. Это поможет планировать циклы NOOWING
            </Text>

            {/* Time Pickers */}
            <View style={styles.timePickers}>
              <View style={styles.timePicker}>
                <Text style={styles.timeLabel}>НАЧАЛО РАБОТЫ</Text>
                <View style={styles.timeSelector}>
                  <Text style={styles.selectedTime}>{workStart}</Text>
                  <TouchableOpacity style={styles.timeButton}>
                    <Text style={styles.timeButtonText}>ИЗМЕНИТЬ</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.timePicker}>
                <Text style={styles.timeLabel}>КОНЕЦ РАБОТЫ</Text>
                <View style={styles.timeSelector}>
                  <Text style={styles.selectedTime}>{workEnd}</Text>
                  <TouchableOpacity style={styles.timeButton}>
                    <Text style={styles.timeButtonText}>ИЗМЕНИТЬ</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Work Duration Info */}
            <View style={styles.workInfo}>
              <Text style={styles.workInfoTitle}>ПРОДОЛЖИТЕЛЬНОСТЬ РАБОЧЕГО ДНЯ</Text>
              <Text style={styles.workDuration}>8 ЧАСОВ</Text>
              <Text style={styles.workInfoSubtitle}>
                Рекомендуется 9-10 циклов NOOWING в день для максимальной продуктивности
              </Text>
            </View>

            {/* Quick Presets */}
            <View style={styles.presets}>
              <Text style={styles.presetsTitle}>БЫСТРЫЕ НАСТРОЙКИ</Text>
              <View style={styles.presetButtons}>
                <TouchableOpacity 
                  style={styles.presetButton}
                  onPress={() => {
                    setWorkStart('09:00');
                    setWorkEnd('17:00');
                  }}
                >
                  <Text style={styles.presetButtonText}>9:00 - 17:00</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.presetButton}
                  onPress={() => {
                    setWorkStart('08:00');
                    setWorkEnd('16:00');
                  }}
                >
                  <Text style={styles.presetButtonText}>8:00 - 16:00</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.presetButton}
                  onPress={() => {
                    setWorkStart('10:00');
                    setWorkEnd('18:00');
                  }}
                >
                  <Text style={styles.presetButtonText}>10:00 - 18:00</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Next Button */}
          <Button
            title="ПРОДОЛЖИТЬ"
            onPress={handleNext}
            style={styles.nextButton}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.background.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  skipButton: {
    padding: 8,
  },
  skipText: {
    ...Typography.sizes.caption,
    color: Colors.text.tertiary,
  },
  progressContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  progressBar: {
    width: '100%',
    height: 4,
    backgroundColor: Colors.background.secondary,
    borderRadius: 2,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.accentColors.primary,
    borderRadius: 2,
  },
  progressText: {
    ...Typography.sizes.micro,
    color: Colors.text.tertiary,
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.accentColors.tertiary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  title: {
    ...Typography.sizes.subtitle,
    color: Colors.text.primary,
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    ...Typography.sizes.body,
    color: Colors.text.secondary,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 32,
  },
  timePickers: {
    width: '100%',
    gap: 16,
    marginBottom: 24,
  },
  timePicker: {
    backgroundColor: Colors.background.secondary,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border.primary,
  },
  timeLabel: {
    ...Typography.sizes.caption,
    color: Colors.text.tertiary,
    marginBottom: 8,
  },
  timeSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedTime: {
    ...Typography.sizes.accent,
    color: Colors.accentColors.primary,
  },
  timeButton: {
    backgroundColor: Colors.accentColors.tertiary,
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  timeButtonText: {
    ...Typography.sizes.caption,
    color: Colors.accentColors.primary,
  },
  workInfo: {
    backgroundColor: Colors.background.secondary,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border.primary,
    alignItems: 'center',
    marginBottom: 24,
    width: '100%',
  },
  workInfoTitle: {
    ...Typography.sizes.caption,
    color: Colors.text.tertiary,
    marginBottom: 4,
  },
  workDuration: {
    ...Typography.sizes.accent,
    color: Colors.accentColors.primary,
    marginBottom: 8,
  },
  workInfoSubtitle: {
    ...Typography.sizes.caption,
    color: Colors.text.secondary,
    textAlign: 'center',
    lineHeight: 14,
  },
  presets: {
    width: '100%',
  },
  presetsTitle: {
    ...Typography.sizes.caption,
    color: Colors.text.tertiary,
    marginBottom: 12,
    textAlign: 'center',
  },
  presetButtons: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
  },
  presetButton: {
    backgroundColor: Colors.background.secondary,
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: Colors.border.primary,
  },
  presetButtonText: {
    ...Typography.sizes.caption,
    color: Colors.text.secondary,
  },
  nextButton: {
    marginTop: 'auto',
  },
});