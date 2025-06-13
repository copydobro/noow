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
      colors={['#0A0A0A', '#1A1A1A', '#2A2A2A']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          {/* Progress indicator */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '16.67%' }]} />
            </View>
            <Text style={styles.progressText}>ШАГ 1 ИЗ 6</Text>
          </View>

          {/* Main content */}
          <View style={styles.mainContent}>
            <View style={styles.iconContainer}>
              <Brain size={32} color="#FF6B35" strokeWidth={1.5} />
            </View>

            <Text style={styles.title}>ПРИВЕТ! Я ТВОЙ{'\n'}КОМПАНЬОН NOOWING.</Text>
            
            <Text style={styles.description}>
              ДАВАЙ ВМЕСТЕ ПЕРЕЗАГРУЗИМ{'\n'}
              ТВОЙ БИОЛОГИЧЕСКИЙ РИТМ!{'\n'}
              ПРИСОЕДИНЯЙСЯ К НАШЕМУ{'\n'}
              СООБЩЕСТВУ ЦИФРОВЫХ ВОИНОВ.
            </Text>

            <View style={styles.cycleContainer}>
              <Text style={styles.cycleTitle}>ЧТО ТАКОЕ NOOWING?{'\n'}ЭТО ТВОЙ ЦИКЛ 45-2-5:</Text>
              <View style={styles.cycleItem}>
                <View style={styles.cycleDot} />
                <Text style={styles.cycleText}>45 МИНУТ ГЛУБОКОЙ РАБОТЫ</Text>
              </View>
              <View style={styles.cycleItem}>
                <View style={styles.cycleDot} />
                <Text style={styles.cycleText}>2 МИНУТЫ ФИЗИЧЕСКОЙ АКТИВАЦИИ</Text>
              </View>
              <View style={styles.cycleItem}>
                <View style={styles.cycleDot} />
                <Text style={styles.cycleText}>5 МИНУТ МИНИ-ОТДЫХА</Text>
              </View>
            </View>

            <Text style={styles.subtitle}>
              ЭТО НЕ ПРОСТО ПРОДУКТИВНОСТЬ.{'\n'}
              ЭТО ЕСТЕСТВЕННАЯ ОПЕРАЦИОННАЯ{'\n'}
              СИСТЕМА ТВОЕГО МОЗГА.
            </Text>

            <Text style={styles.setupText}>
              ГОТОВ ОБНОВИТЬ СВОЮ HUMANOS?{'\n'}
              НАСТРОЙКА ЗАЙМЕТ МЕНЕЕ 30 СЕКУНД.
            </Text>
          </View>

          {/* Bottom section */}
          <View style={styles.bottomSection}>
            <Text style={styles.communityText}>100+ ЧЕЛОВЕК УЖЕ NOOWING</Text>
            
            <TouchableOpacity 
              style={styles.continueButton}
              onPress={() => router.push('/onboarding/step-2')}
            >
              <LinearGradient
                colors={['#FF6B35', '#E55A2B']}
                style={styles.buttonGradient}
              >
                <Text style={styles.buttonText}>ДАВАЙ NOOWING</Text>
                <ArrowRight size={16} color="#000" strokeWidth={1.5} />
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
    paddingTop: 16,
  },
  progressContainer: {
    marginBottom: 20,
  },
  progressBar: {
    height: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 2,
    marginBottom: 6,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FF6B35',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.6)',
    fontFamily: 'Inter-Medium',
    letterSpacing: 1,
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: 'rgba(255, 107, 53, 0.08)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 53, 0.15)',
  },
  title: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 22,
    letterSpacing: 1,
  },
  description: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    lineHeight: 16,
    marginBottom: 16,
    letterSpacing: 0.3,
  },
  cycleContainer: {
    width: '100%',
    marginBottom: 16,
  },
  cycleTitle: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#FF6B35',
    marginBottom: 10,
    textAlign: 'center',
    letterSpacing: 0.3,
    lineHeight: 16,
  },
  cycleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    paddingLeft: 16,
  },
  cycleDot: {
    width: 4,
    height: 4,
    backgroundColor: '#FF6B35',
    borderRadius: 2,
    marginRight: 8,
  },
  cycleText: {
    fontSize: 11,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 14,
    letterSpacing: 0.2,
  },
  subtitle: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 16,
    marginBottom: 10,
    letterSpacing: 0.3,
  },
  setupText: {
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    lineHeight: 14,
    letterSpacing: 0.2,
  },
  bottomSection: {
    paddingBottom: 16,
  },
  communityText: {
    fontSize: 10,
    fontFamily: 'Inter-Medium',
    color: 'rgba(255, 255, 255, 0.6)',
    textAlign: 'center',
    marginBottom: 16,
    letterSpacing: 0.5,
  },
  continueButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 24,
  },
  buttonText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#000',
    marginRight: 6,
    letterSpacing: 1,
  },
});