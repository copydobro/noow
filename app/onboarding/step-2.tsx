import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowRight, ArrowLeft } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ageRanges = [
  { id: '18-25', label: '18-25', subtitle: 'Цифровые аборигены' },
  { id: '26-35', label: '26-35', subtitle: 'Технологические воины' },
  { id: '36-45', label: '36-45', subtitle: 'Цифровые лидеры' },
  { id: '46+', label: '46+', subtitle: 'Технологические пионеры' },
];

export default function OnboardingStep2() {
  const [selectedAge, setSelectedAge] = useState<string | null>(null);

  const handleContinue = () => {
    if (selectedAge) {
      router.push('/onboarding/step-3');
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
                <View style={[styles.progressFill, { width: '33.33%' }]} />
              </View>
              <Text style={styles.progressText}>Шаг 2 из 6</Text>
            </View>
          </View>

          {/* Main content */}
          <View style={styles.mainContent}>
            <Text style={styles.title}>Давай настроим твой ритм!</Text>
            
            <Text style={styles.description}>
              Сначала выбери свой возрастной диапазон:
              {'\n'}Это поможет нам создать твой идеальный биологический цикл.
            </Text>

            <View style={styles.optionsContainer}>
              {ageRanges.map((range) => (
                <TouchableOpacity
                  key={range.id}
                  style={[
                    styles.optionButton,
                    selectedAge === range.id && styles.optionButtonSelected
                  ]}
                  onPress={() => setSelectedAge(range.id)}
                >
                  <View style={styles.optionContent}>
                    <Text style={[
                      styles.optionLabel,
                      selectedAge === range.id && styles.optionLabelSelected
                    ]}>
                      {range.label}
                    </Text>
                    <Text style={[
                      styles.optionSubtitle,
                      selectedAge === range.id && styles.optionSubtitleSelected
                    ]}>
                      {range.subtitle}
                    </Text>
                  </View>
                  {selectedAge === range.id && (
                    <View style={styles.selectedIndicator} />
                  )}
                </TouchableOpacity>
              ))}
            </View>

            {selectedAge && (
              <Text style={styles.confirmationText}>
                Отлично! Давай Noowing!
              </Text>
            )}
          </View>

          {/* Bottom section */}
          <View style={styles.bottomSection}>
            <TouchableOpacity 
              style={[styles.continueButton, !selectedAge && styles.continueButtonDisabled]}
              onPress={handleContinue}
              disabled={!selectedAge}
            >
              <LinearGradient
                colors={selectedAge ? ['#00D4FF', '#0099CC'] : ['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)']}
                style={styles.buttonGradient}
              >
                <Text style={[
                  styles.buttonText,
                  !selectedAge && styles.buttonTextDisabled
                ]}>
                  Продолжить
                </Text>
                <ArrowRight size={20} color={selectedAge ? "#000" : "rgba(255,255,255,0.3)"} strokeWidth={2} />
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
    marginBottom: 40,
  },
  optionsContainer: {
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
  optionLabel: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginBottom: 4,
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