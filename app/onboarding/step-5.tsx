import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, Globe } from 'lucide-react-native';
import { Button } from '../../components/ui';
import { Colors, Typography } from '../../constants';

const timezones = [
  { id: 'utc-12', label: 'UTC-12', name: 'Международная линия дат' },
  { id: 'utc-11', label: 'UTC-11', name: 'Самоа' },
  { id: 'utc-10', label: 'UTC-10', name: 'Гавайи' },
  { id: 'utc-9', label: 'UTC-9', name: 'Аляска' },
  { id: 'utc-8', label: 'UTC-8', name: 'Тихоокеанское время' },
  { id: 'utc-7', label: 'UTC-7', name: 'Горное время' },
  { id: 'utc-6', label: 'UTC-6', name: 'Центральное время' },
  { id: 'utc-5', label: 'UTC-5', name: 'Восточное время' },
  { id: 'utc-4', label: 'UTC-4', name: 'Атлантическое время' },
  { id: 'utc-3', label: 'UTC-3', name: 'Бразилия, Аргентина' },
  { id: 'utc-2', label: 'UTC-2', name: 'Средняя Атлантика' },
  { id: 'utc-1', label: 'UTC-1', name: 'Азорские острова' },
  { id: 'utc+0', label: 'UTC+0', name: 'Лондон, Дублин' },
  { id: 'utc+1', label: 'UTC+1', name: 'Берлин, Париж, Рим' },
  { id: 'utc+2', label: 'UTC+2', name: 'Каир, Хельсинки' },
  { id: 'utc+3', label: 'UTC+3', name: 'Москва, Стамбул' },
  { id: 'utc+4', label: 'UTC+4', name: 'Дубай, Баку' },
  { id: 'utc+5', label: 'UTC+5', name: 'Ташкент, Карачи' },
  { id: 'utc+6', label: 'UTC+6', name: 'Алматы, Дакка' },
  { id: 'utc+7', label: 'UTC+7', name: 'Бангкок, Джакарта' },
  { id: 'utc+8', label: 'UTC+8', name: 'Пекин, Сингапур' },
  { id: 'utc+9', label: 'UTC+9', name: 'Токио, Сеул' },
  { id: 'utc+10', label: 'UTC+10', name: 'Сидней, Мельбурн' },
  { id: 'utc+11', label: 'UTC+11', name: 'Соломоновы острова' },
  { id: 'utc+12', label: 'UTC+12', name: 'Фиджи, Новая Зеландия' },
];

export default function OnboardingStep5() {
  const [selectedTimezone, setSelectedTimezone] = useState('utc+3');

  const handleNext = () => {
    router.push('/onboarding/step-6');
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
              <View style={[styles.progressFill, { width: '83.33%' }]} />
            </View>
            <Text style={styles.progressText}>ШАГ 5 ИЗ 6</Text>
          </View>

          {/* Content */}
          <View style={styles.mainContent}>
            <View style={styles.iconContainer}>
              <Globe size={32} color={Colors.accentColors.primary} strokeWidth={1.5} />
            </View>
            
            <Text style={styles.title}>ВЫБЕРИТЕ ЧАСОВОЙ ПОЯС</Text>
            <Text style={styles.subtitle}>
              Правильный часовой пояс поможет синхронизировать циклы с вашим биологическим ритмом
            </Text>

            {/* Current Selection */}
            <View style={styles.currentSelection}>
              <Text style={styles.currentLabel}>ТЕКУЩИЙ ВЫБОР</Text>
              <Text style={styles.currentTimezone}>
                {timezones.find(tz => tz.id === selectedTimezone)?.label} - {timezones.find(tz => tz.id === selectedTimezone)?.name}
              </Text>
            </View>

            {/* Timezone List */}
            <ScrollView style={styles.timezoneList} showsVerticalScrollIndicator={false}>
              {timezones.map((timezone) => (
                <TouchableOpacity
                  key={timezone.id}
                  style={[
                    styles.timezoneItem,
                    selectedTimezone === timezone.id && styles.timezoneItemSelected
                  ]}
                  onPress={() => setSelectedTimezone(timezone.id)}
                >
                  <View style={styles.timezoneInfo}>
                    <Text style={[
                      styles.timezoneLabel,
                      selectedTimezone === timezone.id && styles.timezoneLabelSelected
                    ]}>
                      {timezone.label}
                    </Text>
                    <Text style={[
                      styles.timezoneName,
                      selectedTimezone === timezone.id && styles.timezoneNameSelected
                    ]}>
                      {timezone.name}
                    </Text>
                  </View>
                  
                  {selectedTimezone === timezone.id && (
                    <View style={styles.checkmark}>
                      <Text style={styles.checkmarkText}>✓</Text>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
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
    marginBottom: 24,
  },
  currentSelection: {
    backgroundColor: Colors.accentColors.tertiary,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.accentColors.primary,
    marginBottom: 16,
    width: '100%',
    alignItems: 'center',
  },
  currentLabel: {
    ...Typography.sizes.caption,
    color: Colors.text.tertiary,
    marginBottom: 4,
  },
  currentTimezone: {
    ...Typography.sizes.button,
    color: Colors.accentColors.primary,
    textAlign: 'center',
  },
  timezoneList: {
    flex: 1,
    width: '100%',
  },
  timezoneItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background.secondary,
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Colors.border.primary,
  },
  timezoneItemSelected: {
    borderColor: Colors.accentColors.primary,
    backgroundColor: Colors.accentColors.tertiary,
  },
  timezoneInfo: {
    flex: 1,
  },
  timezoneLabel: {
    ...Typography.sizes.button,
    color: Colors.text.primary,
    marginBottom: 2,
  },
  timezoneLabelSelected: {
    color: Colors.accentColors.primary,
  },
  timezoneName: {
    ...Typography.sizes.caption,
    color: Colors.text.tertiary,
  },
  timezoneNameSelected: {
    color: Colors.text.secondary,
  },
  checkmark: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.accentColors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmarkText: {
    color: '#000',
    fontSize: 10,
    fontFamily: Typography.weights.bold,
  },
  nextButton: {
    marginTop: 16,
  },
});