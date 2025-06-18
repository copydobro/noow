import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, CircleCheck as CheckCircle, User, Clock, Activity, Globe } from 'lucide-react-native';
import { Button } from '@/components/ui';
import { Colors, Typography } from '@/constants';

export default function OnboardingStep6() {
  const handleComplete = () => {
    router.replace('/(tabs)');
  };

  const handleReset = () => {
    router.push('/onboarding');
  };

  const profileData = [
    { icon: User, label: 'УРОВЕНЬ АКТИВНОСТИ', value: 'СРЕДНИЙ' },
    { icon: Clock, label: 'РАБОЧИЕ ЧАСЫ', value: '09:00 - 17:00' },
    { icon: Activity, label: 'ПРЕДПОЧТИТЕЛЬНОЕ ВРЕМЯ', value: 'УТРОМ' },
    { icon: Globe, label: 'ЧАСОВОЙ ПОЯС', value: 'UTC+3 (Москва)' },
  ];

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
              <ArrowLeft size={20} color={Colors.text.primary} strokeWidth={1.5} />
            </TouchableOpacity>
          </View>

          {/* Progress */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '100%' }]} />
            </View>
            <Text style={styles.progressText}>ШАГ 6 ИЗ 6</Text>
          </View>

          {/* Content */}
          <View style={styles.mainContent}>
            <View style={styles.successIcon}>
              <CheckCircle size={48} color={Colors.success[500]} strokeWidth={1.5} />
            </View>
            
            <Text style={styles.title}>НАСТРОЙКА ЗАВЕРШЕНА!</Text>
            <Text style={styles.subtitle}>
              Ваш профиль готов. Теперь вы можете начать использовать NOOW для максимальной продуктивности
            </Text>

            {/* Profile Summary */}
            <View style={styles.profileSummary}>
              <Text style={styles.summaryTitle}>СВОДКА ПРОФИЛЯ</Text>
              
              {profileData.map((item, index) => (
                <View key={index} style={styles.summaryItem}>
                  <View style={styles.summaryIcon}>
                    <item.icon size={16} color={Colors.accentColors.primary} strokeWidth={1.5} />
                  </View>
                  <View style={styles.summaryContent}>
                    <Text style={styles.summaryLabel}>{item.label}</Text>
                    <Text style={styles.summaryValue}>{item.value}</Text>
                  </View>
                </View>
              ))}
            </View>

            {/* Benefits Reminder */}
            <View style={styles.benefits}>
              <Text style={styles.benefitsTitle}>ЧТО ВАС ЖДЕТ</Text>
              <View style={styles.benefitsList}>
                <View style={styles.benefitItem}>
                  <Text style={styles.benefitIcon}>🧠</Text>
                  <Text style={styles.benefitText}>Улучшение когнитивных функций</Text>
                </View>
                <View style={styles.benefitItem}>
                  <Text style={styles.benefitIcon}>⚡</Text>
                  <Text style={styles.benefitText}>Повышение энергии и концентрации</Text>
                </View>
                <View style={styles.benefitItem}>
                  <Text style={styles.benefitIcon}>📈</Text>
                  <Text style={styles.benefitText}>Отслеживание прогресса</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Actions */}
          <View style={styles.actions}>
            <Button
              title="НАЧАТЬ ИСПОЛЬЗОВАНИЕ NOOW"
              onPress={handleComplete}
              style={styles.completeButton}
            />
            
            <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
              <Text style={styles.resetText}>СБРОСИТЬ НАСТРОЙКИ</Text>
            </TouchableOpacity>
          </View>
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
    justifyContent: 'flex-start',
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
    backgroundColor: Colors.success[500],
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
  successIcon: {
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
  profileSummary: {
    backgroundColor: Colors.background.secondary,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border.primary,
    width: '100%',
    marginBottom: 24,
  },
  summaryTitle: {
    ...Typography.sizes.button,
    color: Colors.text.primary,
    textAlign: 'center',
    marginBottom: 16,
  },
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.accentColors.tertiary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  summaryContent: {
    flex: 1,
  },
  summaryLabel: {
    ...Typography.sizes.caption,
    color: Colors.text.tertiary,
    marginBottom: 2,
  },
  summaryValue: {
    ...Typography.sizes.bodySmall,
    color: Colors.text.primary,
  },
  benefits: {
    backgroundColor: Colors.background.secondary,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border.primary,
    width: '100%',
  },
  benefitsTitle: {
    ...Typography.sizes.button,
    color: Colors.text.primary,
    textAlign: 'center',
    marginBottom: 16,
  },
  benefitsList: {
    gap: 12,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  benefitIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  benefitText: {
    ...Typography.sizes.bodySmall,
    color: Colors.text.secondary,
    flex: 1,
  },
  actions: {
    gap: 16,
  },
  completeButton: {
    // Uses default button styles
  },
  resetButton: {
    alignItems: 'center',
    padding: 16,
  },
  resetText: {
    ...Typography.sizes.caption,
    color: Colors.text.tertiary,
  },
});