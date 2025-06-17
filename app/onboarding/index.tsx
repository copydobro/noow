import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Brain, Clock, Activity, ArrowRight } from 'lucide-react-native';
import { Button } from '@/components/ui';
import { Colors, Typography } from '@/constants';

export default function OnboardingWelcome() {
  const showSkipWarning = () => {
    Alert.alert(
      'Пропустить онбординг?',
      'Настройка профиля поможет персонализировать ваш опыт использования NOOW. Вы уверены, что хотите пропустить?',
      [
        { text: 'Отмена', style: 'cancel' },
        { text: 'Пропустить', style: 'destructive', onPress: () => router.replace('/(tabs)') }
      ]
    );
  };

  const handleNext = () => {
    router.push('/onboarding/step-2');
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          {/* Skip Button */}
          <TouchableOpacity style={styles.skipButton} onPress={showSkipWarning}>
            <Text style={styles.skipText}>ПРОПУСТИТЬ</Text>
          </TouchableOpacity>

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>ДОБРО ПОЖАЛОВАТЬ В</Text>
            <Text style={styles.brand}>NOOW</Text>
            <Text style={styles.subtitle}>РЕВОЛЮЦИОННАЯ СИСТЕМА ПРОДУКТИВНОСТИ</Text>
          </View>

          {/* Cycle Visualization */}
          <View style={styles.cycleContainer}>
            <View style={styles.cycleVisualization}>
              <View style={styles.cycleStep}>
                <View style={styles.cycleIcon}>
                  <Brain size={24} color={Colors.accentColors.primary} strokeWidth={1.5} />
                </View>
                <Text style={styles.cycleTime}>45 МИН</Text>
                <Text style={styles.cycleLabel}>ГЛУБОКАЯ РАБОТА</Text>
              </View>
              
              <ArrowRight size={16} color={Colors.text.tertiary} strokeWidth={1.5} />
              
              <View style={styles.cycleStep}>
                <View style={styles.cycleIcon}>
                  <Activity size={24} color={Colors.accentColors.primary} strokeWidth={1.5} />
                </View>
                <Text style={styles.cycleTime}>2 МИН</Text>
                <Text style={styles.cycleLabel}>АКТИВАЦИЯ</Text>
              </View>
              
              <ArrowRight size={16} color={Colors.text.tertiary} strokeWidth={1.5} />
              
              <View style={styles.cycleStep}>
                <View style={styles.cycleIcon}>
                  <Clock size={24} color={Colors.accentColors.primary} strokeWidth={1.5} />
                </View>
                <Text style={styles.cycleTime}>5 МИН</Text>
                <Text style={styles.cycleLabel}>ОТДЫХ</Text>
              </View>
            </View>
          </View>

          {/* Description */}
          <View style={styles.description}>
            <Text style={styles.descriptionTitle}>КОНЦЕПЦИЯ 45-2-5</Text>
            <Text style={styles.descriptionText}>
              Уникальная методика, сочетающая глубокую концентрацию с физической активацией 
              для максимальной продуктивности и здоровья мозга.
            </Text>
          </View>

          {/* Benefits */}
          <View style={styles.benefits}>
            <View style={styles.benefit}>
              <View style={styles.benefitIcon}>
                <Brain size={16} color={Colors.accentColors.primary} strokeWidth={1.5} />
              </View>
              <Text style={styles.benefitText}>УЛУЧШЕНИЕ КОГНИТИВНЫХ ФУНКЦИЙ</Text>
            </View>
            
            <View style={styles.benefit}>
              <View style={styles.benefitIcon}>
                <Activity size={16} color={Colors.accentColors.primary} strokeWidth={1.5} />
              </View>
              <Text style={styles.benefitText}>ПОВЫШЕНИЕ ФИЗИЧЕСКОЙ АКТИВНОСТИ</Text>
            </View>
            
            <View style={styles.benefit}>
              <View style={styles.benefitIcon}>
                <Clock size={16} color={Colors.accentColors.primary} strokeWidth={1.5} />
              </View>
              <Text style={styles.benefitText}>ОПТИМИЗАЦИЯ ВРЕМЕНИ</Text>
            </View>
          </View>

          {/* Progress */}
          <View style={styles.progress}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '16.67%' }]} />
            </View>
            <Text style={styles.progressText}>ШАГ 1 ИЗ 6</Text>
          </View>

          {/* Next Button */}
          <Button
            title="НАЧАТЬ НАСТРОЙКУ"
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
  skipButton: {
    alignSelf: 'flex-end',
    padding: 8,
  },
  skipText: {
    ...Typography.sizes.caption,
    color: Colors.text.tertiary,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    ...Typography.sizes.subtitle,
    color: Colors.text.secondary,
    textAlign: 'center',
    marginBottom: 8,
  },
  brand: {
    ...Typography.sizes.h1,
    color: Colors.accentColors.primary,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    ...Typography.sizes.caption,
    color: Colors.text.tertiary,
    textAlign: 'center',
  },
  cycleContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  cycleVisualization: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  cycleStep: {
    alignItems: 'center',
    flex: 1,
  },
  cycleIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.accentColors.tertiary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  cycleTime: {
    ...Typography.sizes.button,
    color: Colors.accentColors.primary,
    marginBottom: 4,
  },
  cycleLabel: {
    ...Typography.sizes.micro,
    color: Colors.text.tertiary,
    textAlign: 'center',
  },
  description: {
    alignItems: 'center',
    marginBottom: 32,
  },
  descriptionTitle: {
    ...Typography.sizes.subtitle,
    color: Colors.text.primary,
    textAlign: 'center',
    marginBottom: 12,
  },
  descriptionText: {
    ...Typography.sizes.body,
    color: Colors.text.secondary,
    textAlign: 'center',
    lineHeight: 18,
  },
  benefits: {
    gap: 16,
    marginBottom: 40,
  },
  benefit: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background.secondary,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border.primary,
  },
  benefitIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.accentColors.tertiary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  benefitText: {
    ...Typography.sizes.bodySmall,
    color: Colors.text.primary,
    flex: 1,
  },
  progress: {
    alignItems: 'center',
    marginBottom: 24,
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
  nextButton: {
    marginTop: 'auto',
  },
});