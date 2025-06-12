import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Brain, ArrowRight } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

export default function OnboardingWelcome() {
  return (
    <LinearGradient
      colors={['#0F0F23', '#1A1A3A', '#2D2D5F']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          {/* Progress indicator */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '16.67%' }]} />
            </View>
            <Text style={styles.progressText}>Шаг 1 из 6</Text>
          </View>

          {/* Main content */}
          <View style={styles.mainContent}>
            <View style={styles.iconContainer}>
              <Brain size={64} color="#00D4FF" strokeWidth={1.5} />
            </View>

            <Text style={styles.title}>Привет! Я твой компаньон Noowing.</Text>
            
            <Text style={styles.description}>
              Давай вместе перезагрузим твой биологический ритм! 
              Присоединяйся к нашей растущей сообществу цифровых воинов.
            </Text>

            <View style={styles.cycleContainer}>
              <Text style={styles.cycleTitle}>Что такое Noowing? Это твой цикл 45-2-5:</Text>
              <View style={styles.cycleItem}>
                <View style={styles.cycleDot} />
                <Text style={styles.cycleText}>45 минут глубокой работы</Text>
              </View>
              <View style={styles.cycleItem}>
                <View style={styles.cycleDot} />
                <Text style={styles.cycleText}>2 минуты физической активации</Text>
              </View>
              <View style={styles.cycleItem}>
                <View style={styles.cycleDot} />
                <Text style={styles.cycleText}>5 минут мини-отдыха</Text>
              </View>
            </View>

            <Text style={styles.subtitle}>
              Это не просто продуктивность. Это естественная операционная система твоего мозга.
            </Text>

            <Text style={styles.setupText}>
              Готов обновить свою HumanOS? Настройка займет менее 30 секунд.
            </Text>
          </View>

          {/* Bottom section */}
          <View style={styles.bottomSection}>
            <Text style={styles.communityText}>100+ человек уже Noowing</Text>
            
            <TouchableOpacity 
              style={styles.continueButton}
              onPress={() => router.push('/onboarding/step-2')}
            >
              <LinearGradient
                colors={['#00D4FF', '#0099CC']}
                style={styles.buttonGradient}
              >
                <Text style={styles.buttonText}>Давай Noowing</Text>
                <ArrowRight size={20} color="#000" strokeWidth={2} />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  progressContainer: {
    marginBottom: 40,
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 2,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#00D4FF',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    fontFamily: 'Inter-Medium',
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 32,
    padding: 20,
    backgroundColor: 'rgba(0, 212, 255, 0.1)',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(0, 212, 255, 0.2)',
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 36,
  },
  description: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  cycleContainer: {
    width: '100%',
    marginBottom: 24,
  },
  cycleTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#00D4FF',
    marginBottom: 16,
    textAlign: 'center',
  },
  cycleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingLeft: 20,
  },
  cycleDot: {
    width: 6,
    height: 6,
    backgroundColor: '#00D4FF',
    borderRadius: 3,
    marginRight: 12,
  },
  cycleText: {
    fontSize: 15,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 22,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 16,
  },
  setupText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    lineHeight: 20,
  },
  bottomSection: {
    paddingBottom: 20,
  },
  communityText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: 'rgba(255, 255, 255, 0.6)',
    textAlign: 'center',
    marginBottom: 24,
  },
  continueButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 32,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#000',
    marginRight: 8,
  },
});