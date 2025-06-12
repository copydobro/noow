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
    // Simulate getting timezone from browser/device
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
      // Сохраняем автоматически определенный часовой пояс
      if (typeof window !== 'undefined') {
        localStorage.setItem('userTimezone', detectedTimezone);
      }
      router.push('/onboarding/step-6');
    } else if (selectedMethod === 'manual' && validateUTCOffset(utcOffset)) {
      // Сохраняем вручную введенный часовой пояс
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
                <View style={[styles.progressFill, { width: '83.33%' }]} />
              </View>
              <Text style={styles.progressText}>Шаг 5 из 6</Text>
            </View>
          </View>

          {/* Main content */}
          <View style={styles.mainContent}>
            <View style={styles.iconContainer}>
              <Globe size={48} color="#00D4FF" strokeWidth={1.5} />
            </View>

            <Text style={styles.title}>Какой у тебя часовой пояс?</Text>
            
            <Text style={styles.description}>
              Это обеспечит соответствие твоего ритма биологическим часам.
              {'\n'}Выбери свой вариант:
            </Text>

            <Text style={styles.subtitle}>
              Твой стул убивает тебя. Давай бороться с этим идеальным таймингом.
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
                  <MapPin size={24} color={selectedMethod === 'auto' ? '#00D4FF' : '#FFFFFF'} strokeWidth={2} />
                  <View style={styles.optionTextContainer}>
                    <Text style={[
                      styles.optionLabel,
                      selectedMethod === 'auto' && styles.optionLabelSelected
                    ]}>
                      Поделиться моим местоположением
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
                  <Globe size={24} color={selectedMethod === 'manual' ? '#00D4FF' : '#FFFFFF'} strokeWidth={2} />
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
                    Введите корректное смещение от -12 до +14
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
                Идеально! Твой ритм синхронизирован с {
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
                colors={canContinue ? ['#00D4FF', '#0099CC'] : ['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)']}
                style={styles.buttonGradient}
              >
                <Text style={[
                  styles.buttonText,
                  !canContinue && styles.buttonTextDisabled
                ]}>
                  Продолжить
                </Text>
                <ArrowRight size={20} color={canContinue ? "#000" : "rgba(255,255,255,0.3)"} strokeWidth={2} />
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
    marginBottom: 24,
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionTextContainer: {
    marginLeft: 16,
    flex: 1,
  },
  optionLabel: {
    fontSize: 16,
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
  manualInputContainer: {
    width: '100%',
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginBottom: 12,
    textAlign: 'center',
  },
  textInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
    textAlign: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  errorText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#EF4444',
    textAlign: 'center',
    marginTop: 8,
  },
  detectedContainer: {
    backgroundColor: 'rgba(0, 212, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(0, 212, 255, 0.3)',
  },
  detectedLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    marginBottom: 4,
  },
  detectedTimezone: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#00D4FF',
    textAlign: 'center',
  },
  confirmationText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#00D4FF',
    textAlign: 'center',
    lineHeight: 20,
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