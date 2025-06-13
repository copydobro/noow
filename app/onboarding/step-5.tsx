import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowRight, ArrowLeft, Globe, MapPin } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OnboardingStep5() {
  const [selectedMethod, setSelectedMethod] = useState<'auto' | 'manual' | null>(null);
  const [utcOffset, setUtcOffset] = useState('');
  const [detectedTimezone, setDetectedTimezone] = useState<string | null>(null);

  const handleAutoLocation = () => {
    setSelectedMethod('auto');
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const offset = new Date().getTimezoneOffset() / -60;
    const offsetString = offset >= 0 ? `+${offset}` : `${offset}`;
    setDetectedTimezone(`${timezone} (UTC${offsetString})`);
  };

  const handleManualInput = () => {
    setSelectedMethod('manual');
    setDetectedTimezone(null);
  };

  const validateUTCOffset = (input: string): boolean => {
    const regex = /^[+-]?\d{1,2}$/;
    if (!regex.test(input)) return false;
    
    const num = parseInt(input);
    return num >= -12 && num <= 14;
  };

  const handleContinue = () => {
    if (selectedMethod === 'auto' && detectedTimezone) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('userTimezone', detectedTimezone);
      }
      router.push('/onboarding/step-6');
    } else if (selectedMethod === 'manual' && validateUTCOffset(utcOffset)) {
      const offsetString = utcOffset.startsWith('+') || utcOffset.startsWith('-') ? utcOffset : '+' + utcOffset;
      const timezoneString = `UTC${offsetString}`;
      if (typeof window !== 'undefined') {
        localStorage.setItem('userTimezone', timezoneString);
      }
      router.push('/onboarding/step-6');
    }
  };

  const canContinue = 
    (selectedMethod === 'auto' && detectedTimezone) ||
    (selectedMethod === 'manual' && validateUTCOffset(utcOffset));

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
                <View style={[styles.progressFill, { width: '83.33%' }]} />
              </View>
              <Text style={styles.progressText}>ШАГ 5 ИЗ 6</Text>
            </View>
          </View>

          {/* Main content */}
          <View style={styles.mainContent}>
            <View style={styles.iconContainer}>
              <Globe size={40} color="#FF6B35" strokeWidth={1.5} />
            </View>

            <Text style={styles.title}>Какой у тебя{'\n'}часовой пояс?</Text>
            
            <Text style={styles.description}>
              Это обеспечит соответствие твоего{'\n'}
              ритма биологическим часам.{'\n'}
              Выбери свой вариант:
            </Text>

            <Text style={styles.subtitle}>
              Твой стул убивает тебя. Давай{'\n'}
              бороться с этим идеальным таймингом.
            </Text>

            <View style={styles.optionsContainer}>
              <TouchableOpacity
                style={[
                  styles.optionButton,
                  selectedMethod === 'auto' && styles.optionButtonSelected
                ]}
                onPress={handleAutoLocation}
              >
                <View style={styles.optionContent}>
                  <MapPin size={20} color={selectedMethod === 'auto' ? '#FF6B35' : '#FFFFFF'} strokeWidth={1.5} />
                  <View style={styles.optionTextContainer}>
                    <Text style={[
                      styles.optionLabel,
                      selectedMethod === 'auto' && styles.optionLabelSelected
                    ]}>
                      Поделиться моим{'\n'}местоположением
                    </Text>
                    <Text style={[
                      styles.optionSubtitle,
                      selectedMethod === 'auto' && styles.optionSubtitleSelected
                    ]}>
                      (рекомендуется)
                    </Text>
                  </View>
                </View>
                {selectedMethod === 'auto' && (
                  <View style={styles.selectedIndicator} />
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.optionButton,
                  selectedMethod === 'manual' && styles.optionButtonSelected
                ]}
                onPress={handleManualInput}
              >
                <View style={styles.optionContent}>
                  <Globe size={20} color={selectedMethod === 'manual' ? '#FF6B35' : '#FFFFFF'} strokeWidth={1.5} />
                  <View style={styles.optionTextContainer}>
                    <Text style={[
                      styles.optionLabel,
                      selectedMethod === 'manual' && styles.optionLabelSelected
                    ]}>
                      Ввести смещение UTC
                    </Text>
                    <Text style={[
                      styles.optionSubtitle,
                      selectedMethod === 'manual' && styles.optionSubtitleSelected
                    ]}>
                      (например, +3, -5)
                    </Text>
                  </View>
                </View>
                {selectedMethod === 'manual' && (
                  <View style={styles.selectedIndicator} />
                )}
              </TouchableOpacity>
            </View>

            {selectedMethod === 'manual' && (
              <View style={styles.manualInputContainer}>
                <Text style={styles.inputLabel}>Смещение UTC:</Text>
                <TextInput
                  style={styles.textInput}
                  value={utcOffset}
                  onChangeText={setUtcOffset}
                  placeholder="+3"
                  placeholderTextColor="rgba(255, 255, 255, 0.4)"
                  keyboardType="numeric"
                  maxLength={3}
                />
                {utcOffset && !validateUTCOffset(utcOffset) && (
                  <Text style={styles.errorText}>
                    Введите корректное смещение{'\n'}от -12 до +14
                  </Text>
                )}
              </View>
            )}

            {detectedTimezone && (
              <View style={styles.detectedContainer}>
                <Text style={styles.detectedLabel}>Определенный часовой пояс:</Text>
                <Text style={styles.detectedTimezone}>{detectedTimezone}</Text>
              </View>
            )}

            {canContinue && (
              <Text style={styles.confirmationText}>
                Идеально! Твой ритм синхронизирован с{'\n'}{
                  selectedMethod === 'auto' 
                    ? detectedTimezone 
                    : `UTC${utcOffset.startsWith('+') || utcOffset.startsWith('-') ? utcOffset : '+' + utcOffset}`
                }
              </Text>
            )}
          </View>

          {/* Bottom section */}
          <View style={styles.bottomSection}>
            <TouchableOpacity 
              style={[styles.continueButton, !canContinue && styles.continueButtonDisabled]}
              onPress={handleContinue}
              disabled={!canContinue}
            >
              <LinearGradient
                colors={canContinue ? ['#FF6B35', '#E55A2B'] : ['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)']}
                style={styles.buttonGradient}
              >
                <Text style={[
                  styles.buttonText,
                  !canContinue && styles.buttonTextDisabled
                ]}>
                  ПРОДОЛЖИТЬ
                </Text>
                <ArrowRight size={18} color={canContinue ? "#000" : "rgba(255,255,255,0.3)"} strokeWidth={1.5} />
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
    lineHeight: 18,
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  optionLabel: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginBottom: 4,
    lineHeight: 18,
    letterSpacing: 0.5,
  },
  optionLabelSelected: {
    color: '#FF6B35',
  },
  optionSubtitle: {
    fontSize: 12,
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
    width: 10,
    height: 10,
    backgroundColor: '#FF6B35',
    borderRadius: 5,
  },
  manualInputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginBottom: 10,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  textInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    letterSpacing: 0.5,
  },
  errorText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#EF4444',
    textAlign: 'center',
    marginTop: 6,
    lineHeight: 16,
    letterSpacing: 0.3,
  },
  detectedContainer: {
    backgroundColor: 'rgba(255, 107, 53, 0.08)',
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 53, 0.15)',
  },
  detectedLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    marginBottom: 4,
    letterSpacing: 0.3,
  },
  detectedTimezone: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#FF6B35',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  confirmationText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#FF6B35',
    textAlign: 'center',
    lineHeight: 16,
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