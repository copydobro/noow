import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowRight, ArrowLeft, Clock, CircleAlert as AlertCircle } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const quickStartTimes = ['08:00', '09:00', '10:00'];
const quickEndTimes = ['16:00', '17:00', '18:00'];

const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
const minutes = ['00', '15', '30', '45'];

export default function OnboardingStep4() {
  const [step, setStep] = useState<'start' | 'end'>('start');
  const [startTime, setStartTime] = useState<string | null>(null);
  const [endTime, setEndTime] = useState<string | null>(null);
  const [showCustomPicker, setShowCustomPicker] = useState(false);
  const [selectedHour, setSelectedHour] = useState('09');
  const [selectedMinute, setSelectedMinute] = useState('00');
  const [error, setError] = useState<string | null>(null);

  const handleQuickTimeSelect = (time: string) => {
    if (step === 'start') {
      setStartTime(time);
      setStep('end');
    } else {
      if (validateTimeRange(startTime!, time)) {
        setEndTime(time);
        setError(null);
      }
    }
    setShowCustomPicker(false);
  };

  const handleCustomTimeSelect = () => {
    const customTime = `${selectedHour}:${selectedMinute}`;
    if (step === 'start') {
      setStartTime(customTime);
      setStep('end');
    } else {
      if (validateTimeRange(startTime!, customTime)) {
        setEndTime(customTime);
        setError(null);
      }
    }
    setShowCustomPicker(false);
  };

  const validateTimeRange = (start: string, end: string): boolean => {
    const [startHour, startMin] = start.split(':').map(Number);
    const [endHour, endMin] = end.split(':').map(Number);
    
    const startMinutes = startHour * 60 + startMin;
    const endMinutes = endHour * 60 + endMin;
    
    const diffMinutes = endMinutes - startMinutes;
    
    if (diffMinutes < 240) {
      setError('Пожалуйста, выбери минимум\n4 часа между началом и концом');
      return false;
    }
    
    return true;
  };

  const handleContinue = () => {
    if (startTime && endTime) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('userWorkStartTime', startTime);
        localStorage.setItem('userWorkEndTime', endTime);
      }
      router.push('/onboarding/step-5');
    }
  };

  const getCurrentStepData = () => {
    if (step === 'start') {
      return {
        title: 'Выбери время начала работы:',
        quickTimes: quickStartTimes,
        selectedTime: startTime,
      };
    } else {
      return {
        title: 'Теперь выбери время\nокончания работы:',
        quickTimes: quickEndTimes,
        selectedTime: endTime,
      };
    }
  };

  const stepData = getCurrentStepData();

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
              onPress={() => {
                if (step === 'end' && !showCustomPicker) {
                  setStep('start');
                  setEndTime(null);
                  setError(null);
                } else if (showCustomPicker) {
                  setShowCustomPicker(false);
                } else {
                  router.back();
                }
              }}
            >
              <ArrowLeft size={18} color="#FFFFFF" strokeWidth={1.5} />
            </TouchableOpacity>
            
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: '66.67%' }]} />
              </View>
              <Text style={styles.progressText}>ШАГ 4 ИЗ 6</Text>
            </View>
          </View>

          {/* Main content */}
          <View style={styles.mainContent}>
            <View style={styles.iconContainer}>
              <Clock size={28} color="#FF6B35" strokeWidth={1.5} />
            </View>

            <Text style={styles.title}>Когда ты обычно{'\n'}работаешь или учишься?</Text>
            
            <Text style={styles.description}>
              Помни: Твой мозг работает наиболее{'\n'}
              эффективно, когда тело активно.{'\n'}
              Если у тебя Ошибка 404: Энергия не найдена.{'\n'}
              Давай Noowing для подзарядки.
            </Text>

            {!showCustomPicker ? (
              <>
                <Text style={styles.stepTitle}>{stepData.title}</Text>

                {startTime && step === 'end' && (
                  <View style={styles.selectedTimeContainer}>
                    <Text style={styles.selectedTimeLabel}>Время начала:</Text>
                    <Text style={styles.selectedTime}>{startTime}</Text>
                  </View>
                )}

                <View style={styles.quickTimesContainer}>
                  {stepData.quickTimes.map((time) => (
                    <TouchableOpacity
                      key={time}
                      style={[
                        styles.quickTimeButton,
                        stepData.selectedTime === time && styles.quickTimeButtonSelected
                      ]}
                      onPress={() => handleQuickTimeSelect(time)}
                    >
                      <Text style={[
                        styles.quickTimeText,
                        stepData.selectedTime === time && styles.quickTimeTextSelected
                      ]}>
                        {time}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <TouchableOpacity
                  style={styles.customButton}
                  onPress={() => setShowCustomPicker(true)}
                >
                  <Text style={styles.customButtonText}>Своё время</Text>
                </TouchableOpacity>

                {error && (
                  <View style={styles.errorContainer}>
                    <AlertCircle size={12} color="#EF4444" strokeWidth={1.5} />
                    <Text style={styles.errorText}>{error}</Text>
                  </View>
                )}

                {stepData.selectedTime && !error && (
                  <Text style={styles.confirmationText}>
                    {step === 'start' 
                      ? `Отлично! Твой рабочий день\nначинается в ${stepData.selectedTime}`
                      : `Идеально! Твои рабочие часы\nустановлены: ${startTime} - ${stepData.selectedTime}`
                    }
                  </Text>
                )}
              </>
            ) : (
              <View style={styles.customPickerContainer}>
                <Text style={styles.stepTitle}>Выбери время:</Text>
                
                <View style={styles.timePickerContainer}>
                  {/* Hours Picker */}
                  <View style={styles.timePickerSection}>
                    <Text style={styles.timePickerLabel}>Час</Text>
                    <View style={styles.pickerWrapper}>
                      <ScrollView 
                        style={styles.picker}
                        showsVerticalScrollIndicator={false}
                        snapToInterval={40}
                        decelerationRate="fast"
                        contentContainerStyle={styles.pickerContent}
                      >
                        {hours.map((hour, index) => (
                          <TouchableOpacity
                            key={hour}
                            style={[
                              styles.pickerItem,
                              selectedHour === hour && styles.pickerItemSelected
                            ]}
                            onPress={() => setSelectedHour(hour)}
                          >
                            <Text style={[
                              styles.pickerItemText,
                              selectedHour === hour && styles.pickerItemTextSelected
                            ]}>
                              {hour}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </ScrollView>
                      <View style={styles.pickerOverlay} />
                    </View>
                  </View>

                  {/* Minutes Picker */}
                  <View style={styles.timePickerSection}>
                    <Text style={styles.timePickerLabel}>Минуты</Text>
                    <View style={styles.pickerWrapper}>
                      <ScrollView 
                        style={styles.picker}
                        showsVerticalScrollIndicator={false}
                        snapToInterval={40}
                        decelerationRate="fast"
                        contentContainerStyle={styles.pickerContent}
                      >
                        {minutes.map((minute) => (
                          <TouchableOpacity
                            key={minute}
                            style={[
                              styles.pickerItem,
                              selectedMinute === minute && styles.pickerItemSelected
                            ]}
                            onPress={() => setSelectedMinute(minute)}
                          >
                            <Text style={[
                              styles.pickerItemText,
                              selectedMinute === minute && styles.pickerItemTextSelected
                            ]}>
                              {minute}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </ScrollView>
                      <View style={styles.pickerOverlay} />
                    </View>
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.confirmCustomButton}
                  onPress={handleCustomTimeSelect}
                >
                  <LinearGradient
                    colors={['#FF6B35', '#E55A2B']}
                    style={styles.confirmCustomButtonGradient}
                  >
                    <Text style={styles.confirmCustomButtonText}>
                      Выбрать {selectedHour}:{selectedMinute}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Bottom section */}
          <View style={styles.bottomSection}>
            <TouchableOpacity 
              style={[
                styles.continueButton, 
                (!startTime || !endTime || error) && styles.continueButtonDisabled
              ]}
              onPress={handleContinue}
              disabled={!startTime || !endTime || !!error}
            >
              <LinearGradient
                colors={(startTime && endTime && !error) ? ['#FF6B35', '#E55A2B'] : ['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)']}
                style={styles.buttonGradient}
              >
                <Text style={[
                  styles.buttonText,
                  (!startTime || !endTime || error) && styles.buttonTextDisabled
                ]}>
                  ПРОДОЛЖИТЬ
                </Text>
                <ArrowRight size={16} color={(startTime && endTime && !error) ? "#000" : "rgba(255,255,255,0.3)"} strokeWidth={1.5} />
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
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 16,
    padding: 10,
    backgroundColor: 'rgba(255, 107, 53, 0.08)',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 53, 0.15)',
  },
  title: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 20,
    letterSpacing: 1,
  },
  description: {
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.6)',
    textAlign: 'center',
    lineHeight: 14,
    marginBottom: 20,
    letterSpacing: 0.2,
  },
  stepTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 18,
    letterSpacing: 0.3,
  },
  selectedTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    padding: 8,
    backgroundColor: 'rgba(255, 107, 53, 0.08)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 53, 0.15)',
  },
  selectedTimeLabel: {
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.7)',
    marginRight: 6,
  },
  selectedTime: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#FF6B35',
  },
  quickTimesContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  quickTimeButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  quickTimeButtonSelected: {
    backgroundColor: 'rgba(255, 107, 53, 0.08)',
    borderColor: '#FF6B35',
  },
  quickTimeText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
  quickTimeTextSelected: {
    color: '#FF6B35',
  },
  customButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  customButtonText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: 'rgba(255, 255, 255, 0.8)',
    letterSpacing: 0.3,
  },
  customPickerContainer: {
    width: '100%',
    alignItems: 'center',
  },
  timePickerContainer: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 20,
    width: '100%',
    justifyContent: 'center',
  },
  timePickerSection: {
    alignItems: 'center',
    flex: 1,
  },
  timePickerLabel: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginBottom: 10,
    letterSpacing: 0.3,
  },
  pickerWrapper: {
    position: 'relative',
    height: 160,
    width: 80,
  },
  picker: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 12,
  },
  pickerContent: {
    paddingVertical: 60,
  },
  pickerItem: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 2,
  },
  pickerItemSelected: {
    backgroundColor: 'rgba(255, 107, 53, 0.15)',
    borderRadius: 8,
    marginHorizontal: 8,
  },
  pickerItemText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: 'rgba(255, 255, 255, 0.6)',
    letterSpacing: 0.5,
  },
  pickerItemTextSelected: {
    color: '#FF6B35',
    fontFamily: 'Inter-SemiBold',
  },
  pickerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    pointerEvents: 'none',
  },
  confirmCustomButton: {
    borderRadius: 12,
    overflow: 'hidden',
    width: '80%',
  },
  confirmCustomButtonGradient: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmCustomButtonText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#000',
    letterSpacing: 0.3,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    padding: 8,
    backgroundColor: 'rgba(239, 68, 68, 0.08)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.2)',
  },
  errorText: {
    fontSize: 10,
    fontFamily: 'Inter-Medium',
    color: '#EF4444',
    marginLeft: 4,
    flex: 1,
    lineHeight: 14,
    letterSpacing: 0.2,
  },
  confirmationText: {
    fontSize: 10,
    fontFamily: 'Inter-Medium',
    color: '#FF6B35',
    textAlign: 'center',
    lineHeight: 14,
    letterSpacing: 0.3,
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