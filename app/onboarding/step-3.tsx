import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowRight, ArrowLeft, Activity } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const activityLevels = [
  { 
    id: 'beginner', 
    label: 'Начинающий', 
    subtitle: '0-10 приседаний',
    color: '#4ADE80',
    icon: '🟢'
  },
  { 
    id: 'intermediate', 
    label: 'Средний', 
    subtitle: '11-20 приседаний',
    color: '#FBBF24',
    icon: '🟡'
  },
  { 
    id: 'advanced', 
    label: 'Продвинутый', 
    subtitle: '21+ приседаний',
    color: '#EF4444',
    icon: '🔴'
  },
];

export default function OnboardingStep3() {
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

  const handleContinue = () => {
    if (selectedLevel) {
      const selectedActivityLevel = activityLevels.find(level => level.id === selectedLevel);
      if (selectedActivityLevel) {
        if (typeof window !== 'undefined') {
          localStorage.setItem('userActivityLevel', selectedActivityLevel.id);
          localStorage.setItem('userActivityLevelLabel', `${selectedActivityLevel.label} (${selectedActivityLevel.subtitle})`);
        }
      }
      router.push('/onboarding/step-4');
    }
  };

  return (
    <LinearGradient
      colors={['#0A0A0A', '#1A1A1A', '#2A2A2A']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <ArrowLeft size={20} color="#FFFFFF" strokeWidth={1.5} />
            </TouchableOpacity>
            
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: '50%' }]} />
              </View>
              <Text style={styles.progressText}>ШАГ 3 ИЗ 6</Text>
            </View>
          </View>

          {/* Main content */}
          <View style={styles.mainContent}>
            <View style={styles.iconContainer}>
              <Activity size={40} color="#FF6B35" strokeWidth={1.5} />
            </View>

            <Text style={styles.title}>Какой у тебя текущий{'\n'}уровень активности?</Text>
            
            <Text style={styles.description}>
              Давай измерим его в приседаниях:{'\n'}
              Сколько приседаний ты можешь{'\n'}
              сделать за 1 минуту?
            </Text>

            <Text style={styles.subtitle}>
              Это поможет нам настроить{'\n'}
              идеальную интенсивность активации.
            </Text>

            <View style={styles.optionsContainer}>
              {activityLevels.map((level) => (
                <TouchableOpacity
                  key={level.id}
                  style={[
                    styles.optionButton,
                    selectedLevel === level.id && styles.optionButtonSelected
                  ]}
                  onPress={() => setSelectedLevel(level.id)}
                >
                  <View style={styles.optionContent}>
                    <View style={styles.optionHeader}>
                      <Text style={styles.optionIcon}>{level.icon}</Text>
                      <Text style={[
                        styles.optionLabel,
                        selectedLevel === level.id && styles.optionLabelSelected
                      ]}>
                        {level.label}
                      </Text>
                    </View>
                    <Text style={[
                      styles.optionSubtitle,
                      selectedLevel === level.id && styles.optionSubtitleSelected
                    ]}>
                      {level.subtitle}
                    </Text>
                  </View>
                  {selectedLevel === level.id && (
                    <View style={styles.selectedIndicator} />
                  )}
                </TouchableOpacity>
              ))}
            </View>

            {selectedLevel && (
              <Text style={styles.confirmationText}>
                Отлично! Твоя интенсивность{'\n'}активации установлена
              </Text>
            )}
          </View>

          {/* Bottom section */}
          <View style={styles.bottomSection}>
            <TouchableOpacity 
              style={[styles.continueButton, !selectedLevel && styles.continueButtonDisabled]}
              onPress={handleContinue}
              disabled={!selectedLevel}
            >
              <LinearGradient
                colors={selectedLevel ? ['#FF6B35', '#E55A2B'] : ['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)']}
                style={styles.buttonGradient}
              >
                <Text style={[
                  styles.buttonText,
                  !selectedLevel && styles.buttonTextDisabled
                ]}>
                  ПРОДОЛЖИТЬ
                </Text>
                <ArrowRight size={18} color={selectedLevel ? "#000" : "rgba(255,255,255,0.3)"} strokeWidth={1.5} />
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  backButton: {
    padding: 8,
    marginRight: 16,
  },
  progressContainer: {
    flex: 1,
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
    marginBottom: 20,
    padding: 12,
    backgroundColor: 'rgba(255, 107, 53, 0.08)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 53, 0.15)',
  },
  title: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 26,
    letterSpacing: 1.5,
  },
  description: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.6)',
    textAlign: 'center',
    lineHeight: 16,
    marginBottom: 24,
    letterSpacing: 0.3,
  },
  optionsContainer: {
    width: '100%',
    gap: 12,
    marginBottom: 24,
  },
  optionButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    position: 'relative',
  },
  optionButtonSelected: {
    backgroundColor: 'rgba(255, 107, 53, 0.08)',
    borderColor: '#FF6B35',
  },
  optionContent: {
    alignItems: 'center',
  },
  optionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  optionIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  optionLabel: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  optionLabelSelected: {
    color: '#FF6B35',
  },
  optionSubtitle: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.6)',
    letterSpacing: 0.5,
  },
  optionSubtitleSelected: {
    color: 'rgba(255, 107, 53, 0.8)',
  },
  selectedIndicator: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 10,
    height: 10,
    backgroundColor: '#FF6B35',
    borderRadius: 5,
  },
  confirmationText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#FF6B35',
    textAlign: 'center',
    lineHeight: 18,
    letterSpacing: 0.5,
  },
  bottomSection: {
    paddingBottom: 20,
  },
  continueButton: {
    borderRadius: 18,
    overflow: 'hidden',
  },
  continueButtonDisabled: {
    opacity: 0.5,
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 28,
  },
  buttonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#000',
    marginRight: 8,
    letterSpacing: 1.5,
  },
  buttonTextDisabled: {
    color: 'rgba(255, 255, 255, 0.3)',
  },
});