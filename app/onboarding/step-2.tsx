import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, Clock, Sunrise, Sun, Sunset, Moon } from 'lucide-react-native';
import { Button } from '../../components/ui';
import { Colors, Typography } from '../../constants';

const timeSlots = [
  { id: 'morning', label: 'УТРОМ', time: '06:00 - 10:00', icon: Sunrise, color: '#FCD34D' },
  { id: 'day', label: 'ДНЕМ', time: '10:00 - 14:00', icon: Sun, color: '#F59E0B' },
  { id: 'afternoon', label: 'ПОСЛЕ ОБЕДА', time: '14:00 - 18:00', icon: Sunset, color: '#F97316' },
  { id: 'evening', label: 'ВЕЧЕРОМ', time: '18:00 - 22:00', icon: Moon, color: '#7C3AED' },
];

export default function OnboardingStep2() {
  const [selectedTime, setSelectedTime] = useState<string>('');

  const handleNext = () => {
    router.push('/onboarding/step-3');
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
              <View style={[styles.progressFill, { width: '33.33%' }]} />
            </View>
            <Text style={styles.progressText}>ШАГ 2 ИЗ 6</Text>
          </View>

          {/* Content */}
          <View style={styles.mainContent}>
            <View style={styles.iconContainer}>
              <Clock size={32} color={Colors.accentColors.primary} strokeWidth={1.5} />
            </View>
            
            <Text style={styles.title}>КОГДА ВЫ НАИБОЛЕЕ ПРОДУКТИВНЫ?</Text>
            <Text style={styles.subtitle}>
              Выберите время, когда вы чувствуете себя наиболее сосредоточенным и энергичным
            </Text>

            <View style={styles.timeSlots}>
              {timeSlots.map((slot) => (
                <TouchableOpacity
                  key={slot.id}
                  style={[
                    styles.timeSlot,
                    selectedTime === slot.id && styles.timeSlotSelected
                  ]}
                  onPress={() => setSelectedTime(slot.id)}
                >
                  <View style={[styles.timeIcon, { backgroundColor: `${slot.color}20` }]}>
                    <slot.icon size={24} color={slot.color} strokeWidth={1.5} />
                  </View>
                  <View style={styles.timeInfo}>
                    <Text style={[
                      styles.timeLabel,
                      selectedTime === slot.id && styles.timeLabelSelected
                    ]}>
                      {slot.label}
                    </Text>
                    <Text style={[
                      styles.timeRange,
                      selectedTime === slot.id && styles.timeRangeSelected
                    ]}>
                      {slot.time}
                    </Text>
                  </View>
                  {selectedTime === slot.id && (
                    <View style={styles.checkmark}>
                      <Text style={styles.checkmarkText}>✓</Text>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Next Button */}
          <Button
            title="ПРОДОЛЖИТЬ"
            onPress={handleNext}
            disabled={!selectedTime}
            style={[styles.nextButton, !selectedTime && styles.nextButtonDisabled]}
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
    marginBottom: 40,
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
  timeSlots: {
    width: '100%',
    gap: 12,
  },
  timeSlot: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background.secondary,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border.primary,
  },
  timeSlotSelected: {
    borderColor: Colors.accentColors.primary,
    backgroundColor: Colors.accentColors.tertiary,
  },
  timeIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  timeInfo: {
    flex: 1,
  },
  timeLabel: {
    ...Typography.sizes.button,
    color: Colors.text.primary,
    marginBottom: 2,
  },
  timeLabelSelected: {
    color: Colors.accentColors.primary,
  },
  timeRange: {
    ...Typography.sizes.caption,
    color: Colors.text.tertiary,
  },
  timeRangeSelected: {
    color: Colors.text.secondary,
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.accentColors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmarkText: {
    color: '#000',
    fontSize: 12,
    fontFamily: Typography.weights.bold,
  },
  nextButton: {
    marginTop: 'auto',
  },
  nextButtonDisabled: {
    opacity: 0.5,
  },
});