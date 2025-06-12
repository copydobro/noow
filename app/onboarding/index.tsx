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
              <Brain size={64} color="#FF6B35" strokeWidth={1.5} />
            </View>

            <Text style={styles.title}>ПРИВЕТ! Я ТВОЙ КОМПАНЬОН NOOWING.</Text>
            
            <Text style={styles.description}>
              ДАВАЙ ВМЕСТЕ ПЕРЕЗАГРУЗИМ ТВОЙ БИОЛОГИЧЕСКИЙ РИТМ! 
              ПРИСОЕДИНЯЙСЯ К НАШЕЙ РАСТУЩЕЙ СООБЩЕСТВУ ЦИФРОВЫХ ВОИНОВ.
            </Text>

            <View style={styles.cycleContainer}>
              <Text style={styles.cycleTitle}>ЧТО ТАКОЕ NOOWING? ЭТО ТВОЙ ЦИКЛ 45-2-5:</Text>
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
              ЭТО НЕ ПРОСТО ПРОДУКТИВНОСТЬ. ЭТО ЕСТЕСТВЕННАЯ ОПЕРАЦИОННАЯ СИСТЕМА ТВОЕГО МОЗГА.
            </Text>

            <Text style={styles.setupText}>
              ГОТОВ ОБНОВИТЬ СВОЮ HUMANOS? НАСТРОЙКА ЗАЙМЕТ МЕНЕЕ 30 СЕКУНД.
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
                <ArrowRight size={20} color="#000" strokeWidth={1.5} />
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
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 2,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FF6B35',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
    fontFamily: 'Inter-Medium',
    letterSpacing: 1.5,
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 32,
    padding: 20,
    backgroundColor: 'rgba(255, 107, 53, 0.08)',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 53, 0.15)',
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 36,
    letterSpacing: 2,
  },
  description: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
    letterSpacing: 0.5,
  },
  cycleContainer: {
    width: '100%',
    marginBottom: 24,
  },
  cycleTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FF6B35',
    marginBottom: 16,
    textAlign: 'center',
    letterSpacing: 1,
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
    backgroundColor: '#FF6B35',
    borderRadius: 3,
    marginRight: 12,
  },
  cycleText: {
    fontSize: 15,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 22,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 16,
    letterSpacing: 1,
  },
  setupText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    lineHeight: 20,
    letterSpacing: 0.5,
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
    letterSpacing: 1,
  },
  continueButton: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 32,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#000',
    marginRight: 12,
    letterSpacing: 2,
  },
});