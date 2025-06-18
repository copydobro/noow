import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, Activity, Zap, Target } from 'lucide-react-native';
import { Button } from '@/components/ui';
import { Colors, Typography } from '@/constants';

const activityLevels = [
  {
    id: 'beginner',
    label: 'НАЧИНАЮЩИЙ',
    description: 'Я только начинаю заниматься физической активностью',
    icon: Activity,
    color: '#22C55E',
    exercises: ['Легкая растяжка', 'Простые упражнения', 'Короткие прогулки']
  },
  {
    id: 'intermediate',
    label: 'СРЕДНИЙ',
    description: 'Я регулярно занимаюсь спортом несколько раз в неделю',
    icon: Zap,
    color: '#F59E0B',
    exercises: ['Кардио упражнения', 'Силовые тренировки', 'Йога']
  },
  {
    id: 'advanced',
    label: 'ПРОДВИНУТЫЙ',
    description: 'Я активно тренируюсь каждый день и люблю вызовы',
    icon: Target,
    color: '#EF4444',
    exercises: ['HIIT тренировки', 'Сложные упражнения', 'Интенсивные нагрузки']
  },
];

export default function OnboardingStep3() {
  const [selectedLevel, setSelectedLevel] = useState<string>('');

  const handleNext = () => {
    router.push('/onboarding/step-4');
  };

  const handleSkip = () => {
    router.push('/onboarding/step-4');
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
              <View style={[styles.progressFill, { width: '50%' }]} />
            </View>
            <Text style={styles.progressText}>ШАГ 3 ИЗ 6</Text>
          </View>

          {/* Content */}
          <View style={styles.mainContent}>
            <View style={styles.iconContainer}>
              <Activity size={32} color={Colors.accentColors.primary} strokeWidth={1.5} />
            </View>
            
            <Text style={styles.title}>КАКОЙ ВАШ УРОВЕНЬ АКТИВНОСТИ?</Text>
            <Text style={styles.subtitle}>
              Это поможет нам подобрать подходящие упражнения для 2-минутных активаций
            </Text>

            <View style={styles.activityLevels}>
              {activityLevels.map((level) => (
                <TouchableOpacity
                  key={level.id}
                  style={[
                    styles.activityLevel,
                    selectedLevel === level.id && styles.activityLevelSelected
                  ]}
                  onPress={() => setSelectedLevel(level.id)}
                >
                  <View style={[styles.levelIcon, { backgroundColor: `${level.color}20` }]}>
                    <level.icon size={24} color={level.color} strokeWidth={1.5} />
                  </View>
                  
                  <View style={styles.levelContent}>
                    <Text style={[
                      styles.levelLabel,
                      selectedLevel === level.id && styles.levelLabelSelected
                    ]}>
                      {level.label}
                    </Text>
                    <Text style={[
                      styles.levelDescription,
                      selectedLevel === level.id && styles.levelDescriptionSelected
                    ]}>
                      {level.description}
                    </Text>
                    
                    <View style={styles.exercisesList}>
                      {level.exercises.map((exercise, index) => (
                        <Text key={index} style={[
                          styles.exerciseItem,
                          selectedLevel === level.id && styles.exerciseItemSelected
                        ]}>
                          • {exercise}
                        </Text>
                      ))}
                    </View>
                  </View>
                  
                  {selectedLevel === level.id && (
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
            disabled={!selectedLevel}
            style={[styles.nextButton, !selectedLevel && styles.nextButtonDisabled]}
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
  activityLevels: {
    width: '100%',
    gap: 16,
  },
  activityLevel: {
    backgroundColor: Colors.background.secondary,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border.primary,
  },
  activityLevelSelected: {
    borderColor: Colors.accentColors.primary,
    backgroundColor: Colors.accentColors.tertiary,
  },
  levelIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    alignSelf: 'flex-start',
  },
  levelContent: {
    flex: 1,
  },
  levelLabel: {
    ...Typography.sizes.button,
    color: Colors.text.primary,
    marginBottom: 4,
  },
  levelLabelSelected: {
    color: Colors.accentColors.primary,
  },
  levelDescription: {
    ...Typography.sizes.bodySmall,
    color: Colors.text.secondary,
    marginBottom: 12,
    lineHeight: 16,
  },
  levelDescriptionSelected: {
    color: Colors.text.primary,
  },
  exercisesList: {
    gap: 4,
  },
  exerciseItem: {
    ...Typography.sizes.caption,
    color: Colors.text.tertiary,
  },
  exerciseItemSelected: {
    color: Colors.text.secondary,
  },
  checkmark: {
    position: 'absolute',
    top: 16,
    right: 16,
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