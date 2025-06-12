import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
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
    
    if (diffMinutes < 240) { // Less than 4 hours
      setError('Пожалуйста, выбери минимум 4 часа между началом и концом');
      return false;
    }
    
    return true;
  };

  const handleContinue = () => {
    if (startTime && endTime) {
      // Сохраняем выбранные данные
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
        title: 'Теперь выбери время окончания работы:',
        quickTimes: quickEndTimes,
        selectedTime: endTime,
      };
    }
  };

  const stepData = getCurrentStepData();

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
              <ArrowLeft size={24} color="#FFFFFF" strokeWidth={2} />
            </TouchableOpacity>
            
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: '66.67%' }]} />
              </View>
              <Text style={styles.progressText}>Шаг 4 из 6</Text>
            </View>
          </View>

          {/* Main content */}
          <View style={styles.mainContent}>
            <View style={styles.iconContainer}>
              <Clock size={48} color="#00D4FF" strokeWidth={1.5} />
            </View>

            <Text style={styles.title}>Когда ты обычно работаешь или учишься?</Text>
            
            <Text style={styles.description}>
              Помни: Твой мозг работает наиболее эффективно, когда тело активно.
              {'\n'}Если у тебя Ошибка 404: Энергия не найдена. Давай Noowing для подзарядки.
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
                  <Text style={styles.customButtonText}>Своё</Text>
                </TouchableOpacity>

                {error && (
                  <View style={styles.errorContainer}>
                    <AlertCircle size={16} color="#EF4444" strokeWidth={2} />
                    <Text style={styles.errorText}>{error}</Text>
                  </View>
                )}

                {stepData.selectedTime && !error && (
                  <Text style={styles.confirmationText}>
                    {step === 'start' 
                      ? `Отлично! Твой рабочий день начинается в ${stepData.selectedTime}`
                      : `Идеально! Твои рабочие часы установлены: ${startTime} - ${stepData.selectedTime}`
                    }
                  </Text>
                )}
              </>
            ) : (
              <View style={styles.customPickerContainer}>
                <Text style={styles.stepTitle}>Выбери время:</Text>
                
                <View style={styles.timePickerContainer}>
                  <View style={styles.timePickerSection}>
                    <Text style={styles.timePickerLabel}>Час</Text>
                    <ScrollView 
                      style={styles.timePickerScroll}
                      showsVerticalScrollIndicator={false}
                    >
                      <View style={styles.timePickerGrid}>
                        {hours.map((hour) => (
                          <TouchableOpacity
                            key={hour}
                            style={[
                              styles.timePickerButton,
                              selectedHour === hour && styles.timePickerButtonSelected
                            ]}
                            onPress={() => setSelectedHour(hour)}
                          >
                            <Text style={[
                              styles.timePickerButtonText,
                              selectedHour === hour && styles.timePickerButtonTextSelected
                            ]}>
                              {hour}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    </ScrollView>
                  </View>

                  <View style={styles.timePickerSection}>
                    <Text style={styles.timePickerLabel}>Минуты</Text>
                    <View style={styles.minutesContainer}>
                      {minutes.map((minute) => (
                        <TouchableOpacity
                          key={minute}
                          style={[
                            styles.timePickerButton,
                            selectedMinute === minute && styles.timePickerButtonSelected
                          ]}
                          onPress={() => setSelectedMinute(minute)}
                        >
                          <Text style={[
                            styles.timePickerButtonText,
                            selectedMinute === minute && styles.timePickerButtonTextSelected
                          ]}>
                            {minute}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.confirmCustomButton}
                  onPress={handleCustomTimeSelect}
                >
                  <Text style={styles.confirmCustomButtonText}>
                    Выбрать {selectedHour}:{selectedMinute}
                  </Text>
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
                colors={(startTime && endTime && !error) ? ['#00D4FF', '#0099CC'] : ['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)']}
                style={styles.buttonGradient}
              >
                <Text style={[
                  styles.buttonText,
                  (!startTime || !endTime || error) && styles.buttonTextDisabled
                ]}>
                  Продолжить
                </Text>
                <ArrowRight size={20} color={(startTime && endTime && !error) ? "#000" : "rgba(255,255,255,0.3)"} strokeWidth={2} />
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
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.6)',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 32,
  },
  stepTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 24,
  },
  selectedTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    padding: 12,
    backgroundColor: 'rgba(0, 212, 255, 0.1)',
    borderRadius: 12,
  },
  selectedTimeLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.7)',
    marginRight: 8,
  },
  selectedTime: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#00D4FF',
  },
  quickTimesContainer: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
  },
  quickTimeButton: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  quickTimeButtonSelected: {
    backgroundColor: 'rgba(0, 212, 255, 0.1)',
    borderColor: '#00D4FF',
  },
  quickTimeText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  quickTimeTextSelected: {
    color: '#00D4FF',
  },
  customButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    marginBottom: 24,
  },
  customButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  customPickerContainer: {
    width: '100%',
    alignItems: 'center',
  },
  timePickerContainer: {
    flexDirection: 'row',
    gap: 24,
    marginBottom: 32,
  },
  timePickerSection: {
    flex: 1,
    alignItems: 'center',
  },
  timePickerLabel: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  timePickerScroll: {
    maxHeight: 200,
  },
  timePickerGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
  },
  minutesContainer: {
    gap: 8,
  },
  timePickerButton: {
    width: 48,
    height: 48,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  timePickerButtonSelected: {
    backgroundColor: 'rgba(0, 212, 255, 0.2)',
    borderColor: '#00D4FF',
  },
  timePickerButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
  },
  timePickerButtonTextSelected: {
    color: '#00D4FF',
  },
  confirmCustomButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: 'rgba(0, 212, 255, 0.2)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#00D4FF',
  },
  confirmCustomButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#00D4FF',
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    padding: 12,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.3)',
  },
  errorText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#EF4444',
    marginLeft: 8,
    flex: 1,
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