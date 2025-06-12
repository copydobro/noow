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
      router.push('/onboarding/step-4');
    }
  };

  return (
    <LinearGradient
      colors={['#0F0F23', '#1A1A3A', '#2D2D5F']}
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
              <ArrowLeft size={24} color="#FFFFFF" strokeWidth={2} />
            </TouchableOpacity>
            
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: '50%' }]} />
              </View>
              <Text style={styles.progressText}>Шаг 3 из 6</Text>
            </View>
          </View>

          {/* Main content */}
          <View style={styles.mainContent}>
            <View style={styles.iconContainer}>
              <Activity size={48} color="#00D4FF" strokeWidth={1.5} />
            </View>

            <Text style={styles.title}>Какой у тебя текущий уровень активности?</Text>
            
            <Text style={styles.description}>
              Давай измерим его в приседаниях:
              {'\n'}Сколько приседаний ты можешь сделать за 1 минуту?
            </Text>

            <Text style={styles.subtitle}>
              Это поможет нам настроить идеальную интенсивность активации.
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
                Отлично! Твоя интенсивность активации установлена
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
                colors={selectedLevel ? ['#00D4FF', '#0099CC'] : ['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)']}
                style={styles.buttonGradient}
              >
                <Text style={[
                  styles.buttonText,
                  !selectedLevel && styles.buttonTextDisabled
                ]}>
                  Продолжить
                </Text>
                <ArrowRight size={20} color={selectedLevel ? "#000" : "rgba(255,255,255,0.3)"} strokeWidth={2} />
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
    marginBottom: 40,
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
    marginBottom: 24,
    padding: 16,
    backgroundColor: 'rgba(0, 212, 255, 0.1)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(0, 212, 255, 0.2)',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 32,
  },
  description: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.6)',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 32,
  },
  optionsContainer: {
    width: '100%',
    gap: 16,
    marginBottom: 32,
  },
  optionButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: 'transparent',
    position: 'relative',
  },
  optionButtonSelected: {
    backgroundColor: 'rgba(0, 212, 255, 0.1)',
    borderColor: '#00D4FF',
  },
  optionContent: {
    alignItems: 'center',
  },
  optionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  optionIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  optionLabel: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  optionLabelSelected: {
    color: '#00D4FF',
  },
  optionSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.6)',
  },
  optionSubtitleSelected: {
    color: 'rgba(0, 212, 255, 0.8)',
  },
  selectedIndicator: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 12,
    height: 12,
    backgroundColor: '#00D4FF',
    borderRadius: 6,
  },
  confirmationText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#00D4FF',
    textAlign: 'center',
  },
  bottomSection: {
    paddingBottom: 20,
  },
  continueButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  continueButtonDisabled: {
    opacity: 0.5,
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
  buttonTextDisabled: {
    color: 'rgba(255, 255, 255, 0.3)',
  },
});