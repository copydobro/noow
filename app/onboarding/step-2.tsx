import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowRight, ArrowLeft } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ageRanges = [
  { id: '18-25', label: '18-25', subtitle: 'ЦИФРОВЫЕ АБОРИГЕНЫ' },
  { id: '26-35', label: '26-35', subtitle: 'ТЕХНОЛОГИЧЕСКИЕ ВОИНЫ' },
  { id: '36-45', label: '36-45', subtitle: 'ЦИФРОВЫЕ ЛИДЕРЫ' },
  { id: '46+', label: '46+', subtitle: 'ТЕХНОЛОГИЧЕСКИЕ ПИОНЕРЫ' },
];

export default function OnboardingStep2() {
  const [selectedAge, setSelectedAge] = useState<string | null>(null);

  const handleContinue = () => {
    if (selectedAge) {
      const selectedRange = ageRanges.find(range => range.id === selectedAge);
      if (selectedRange) {
        if (typeof window !== 'undefined') {
          localStorage.setItem('userAgeRange', selectedRange.id);
          localStorage.setItem('userAgeRangeLabel', selectedRange.subtitle);
        }
      }
      router.push('/onboarding/step-3');
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
              <ArrowLeft size={18} color="#FFFFFF" strokeWidth={1.5} />
            </TouchableOpacity>
            
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: '33.33%' }]} />
              </View>
              <Text style={styles.progressText}>ШАГ 2 ИЗ 6</Text>
            </View>
          </View>

          {/* Main content */}
          <View style={styles.mainContent}>
            <Text style={styles.title}>ДАВАЙ НАСТРОИМ{'\n'}ТВОЙ РИТМ!</Text>
            
            <Text style={styles.description}>
              СНАЧАЛА ВЫБЕРИ СВОЙ{'\n'}
              ВОЗРАСТНОЙ ДИАПАЗОН:{'\n'}
              ЭТО ПОМОЖЕТ НАМ СОЗДАТЬ{'\n'}
              ТВОЙ ИДЕАЛЬНЫЙ БИОЛОГИЧЕСКИЙ ЦИКЛ.
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
                ОТЛИЧНО! ДАВАЙ NOOWING!
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
                colors={selectedAge ? ['#FF6B35', '#E55A2B'] : ['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.02)']}
                style={styles.buttonGradient}
              >
                <Text style={[
                  styles.buttonText,
                  !selectedAge && styles.buttonTextDisabled
                ]}>
                  ПРОДОЛЖИТЬ
                </Text>
                <ArrowRight size={16} color={selectedAge ? "#000" : "rgba(255,255,255,0.3)"} strokeWidth={1.5} />
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  backButton: {
    padding: 8,
    marginRight: 16,
  },
  progressContainer: {
    flex: 1,
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
    marginBottom: 24,
    letterSpacing: 0.3,
  },
  optionsContainer: {
    gap: 10,
    marginBottom: 20,
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
  optionLabel: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginBottom: 2,
    letterSpacing: 0.5,
  },
  optionLabelSelected: {
    color: '#FF6B35',
  },
  optionSubtitle: {
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.6)',
    letterSpacing: 0.3,
  },
  optionSubtitleSelected: {
    color: 'rgba(255, 107, 53, 0.8)',
  },
  selectedIndicator: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 8,
    height: 8,
    backgroundColor: '#FF6B35',
    borderRadius: 4,
  },
  confirmationText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#FF6B35',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  bottomSection: {
    paddingBottom: 16,
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
  buttonTextDisabled: {
    color: 'rgba(255, 255, 255, 0.3)',
  },
});