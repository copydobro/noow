import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Play, Pause, SkipForward, Brain, Activity, Coffee, RotateCcw } from 'lucide-react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withRepeat,
  interpolate
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

type CyclePhase = 'work' | 'activation' | 'rest';

interface CycleState {
  phase: CyclePhase;
  timeRemaining: number;
  isActive: boolean;
  cycleCount: number;
}

const PHASE_DURATIONS = {
  work: 45 * 60, // 45 minutes in seconds
  activation: 2 * 60, // 2 minutes in seconds
  rest: 5 * 60, // 5 minutes in seconds
};

const PHASE_CONFIG = {
  work: {
    title: 'ГЛУБОКАЯ РАБОТА',
    subtitle: 'ВРЕМЯ СОСРЕДОТОЧИТЬСЯ',
    icon: Brain,
    color: '#FF6B35',
    gradient: ['#FF6B35', '#E55A2B'],
    message: 'Сосредоточься на важной задаче. Никаких отвлечений!',
  },
  activation: {
    title: 'ФИЗИЧЕСКАЯ АКТИВАЦИЯ',
    subtitle: 'ВРЕМЯ ДВИГАТЬСЯ',
    icon: Activity,
    color: '#FF6B35',
    gradient: ['#FF6B35', '#E55A2B'],
    message: 'Встань и подвигайся! Сделай несколько упражнений.',
  },
  rest: {
    title: 'ВОССТАНОВЛЕНИЕ',
    subtitle: 'ВРЕМЯ ОТДОХНУТЬ',
    icon: Coffee,
    color: '#FF6B35',
    gradient: ['#FF6B35', '#E55A2B'],
    message: 'Расслабься и восстанови силы перед следующим циклом.',
  },
};

export default function HomeTab() {
  const [cycleState, setCycleState] = useState<CycleState>({
    phase: 'work',
    timeRemaining: PHASE_DURATIONS.work,
    isActive: false,
    cycleCount: 0,
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const pulseAnimation = useSharedValue(0);
  const progressAnimation = useSharedValue(0);

  // Функция для показа уведомлений
  const showPhaseAlert = (phase: CyclePhase) => {
    const config = PHASE_CONFIG[phase];
    Alert.alert(
      config.title,
      config.message,
      [
        { 
          text: 'Начать', 
          onPress: () => {
            setCycleState(prev => ({ ...prev, isActive: true }));
          }
        }
      ]
    );
  };

  // Анимации
  useEffect(() => {
    if (cycleState.isActive) {
      pulseAnimation.value = withRepeat(
        withTiming(1, { duration: 1000 }),
        -1,
        true
      );
    } else {
      pulseAnimation.value = withTiming(0, { duration: 300 });
    }
  }, [cycleState.isActive]);

  useEffect(() => {
    const totalDuration = PHASE_DURATIONS[cycleState.phase];
    const progress = (totalDuration - cycleState.timeRemaining) / totalDuration;
    progressAnimation.value = withTiming(progress, { duration: 300 });
  }, [cycleState.timeRemaining, cycleState.phase]);

  // Основной таймер
  useEffect(() => {
    if (cycleState.isActive && cycleState.timeRemaining > 0) {
      intervalRef.current = setInterval(() => {
        setCycleState(prev => {
          const newTimeRemaining = prev.timeRemaining - 1;
          
          // Если время истекло
          if (newTimeRemaining <= 0) {
            const nextPhase = getNextPhase(prev.phase);
            
            // Очищаем интервал
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
              intervalRef.current = null;
            }
            
            // Показываем уведомление о новой фазе
            setTimeout(() => {
              showPhaseAlert(nextPhase);
            }, 100);
            
            return {
              ...prev,
              phase: nextPhase,
              timeRemaining: PHASE_DURATIONS[nextPhase],
              cycleCount: nextPhase === 'work' ? prev.cycleCount + 1 : prev.cycleCount,
              isActive: false, // Останавливаем таймер для подтверждения
            };
          }
          
          return {
            ...prev,
            timeRemaining: newTimeRemaining,
          };
        });
      }, 1000);
    } else {
      // Очищаем интервал если таймер не активен
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    // Cleanup функция
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [cycleState.isActive, cycleState.timeRemaining]);

  const getNextPhase = (currentPhase: CyclePhase): CyclePhase => {
    switch (currentPhase) {
      case 'work': return 'activation';
      case 'activation': return 'rest';
      case 'rest': return 'work';
    }
  };

  const toggleTimer = () => {
    setCycleState(prev => ({
      ...prev,
      isActive: !prev.isActive,
    }));
  };

  const skipPhase = () => {
    const nextPhase = getNextPhase(cycleState.phase);
    setCycleState(prev => ({
      ...prev,
      phase: nextPhase,
      timeRemaining: PHASE_DURATIONS[nextPhase],
      cycleCount: nextPhase === 'work' ? prev.cycleCount + 1 : prev.cycleCount,
      isActive: false,
    }));
    
    showPhaseAlert(nextPhase);
  };

  const resetTimer = () => {
    Alert.alert(
      'Сбросить таймер?',
      'Это сбросит текущий цикл и статистику',
      [
        { text: 'Отмена', style: 'cancel' },
        { 
          text: 'Сбросить', 
          style: 'destructive',
          onPress: () => {
            setCycleState({
              phase: 'work',
              timeRemaining: PHASE_DURATIONS.work,
              isActive: false,
              cycleCount: 0,
            });
          }
        }
      ]
    );
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currentConfig = PHASE_CONFIG[cycleState.phase];
  const IconComponent = currentConfig.icon;

  const pulseStyle = useAnimatedStyle(() => {
    const scale = interpolate(pulseAnimation.value, [0, 1], [1, 1.02]);
    const opacity = interpolate(pulseAnimation.value, [0, 1], [0.9, 1]);
    
    return {
      transform: [{ scale }],
      opacity,
    };
  });

  const progressStyle = useAnimatedStyle(() => {
    const rotation = interpolate(progressAnimation.value, [0, 1], [0, 360]);
    
    return {
      transform: [{ rotate: `${rotation}deg` }],
    };
  });

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.greeting}>NOOWING</Text>
            <Text style={styles.subtitle}>ЦИКЛ {cycleState.cycleCount + 1}</Text>
          </View>

          {/* Stats Cards */}
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{cycleState.cycleCount}</Text>
              <Text style={styles.statLabel}>ЦИКЛОВ</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>
                {formatTime(cycleState.cycleCount * 52 * 60)}
              </Text>
              <Text style={styles.statLabel}>ВРЕМЯ</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{cycleState.cycleCount * 2}</Text>
              <Text style={styles.statLabel}>АКТИВАЦИЙ</Text>
            </View>
          </View>

          {/* Main Timer Circle */}
          <View style={styles.timerContainer}>
            <Animated.View style={[styles.timerCircle, pulseStyle]}>
              <View style={styles.timerContent}>
                <IconComponent size={32} color="#FF6B35" strokeWidth={1.5} />
                <Text style={styles.timerTime}>{formatTime(cycleState.timeRemaining)}</Text>
                <Text style={styles.timerPhase}>{currentConfig.title}</Text>
                <Text style={styles.timerSubtitle}>{currentConfig.subtitle}</Text>
              </View>
            </Animated.View>
            
            {/* Progress Ring */}
            <Animated.View style={[styles.progressRing, progressStyle]}>
              <View style={styles.progressIndicator} />
            </Animated.View>
          </View>

          {/* Controls */}
          <View style={styles.controls}>
            <TouchableOpacity
              style={styles.controlButton}
              onPress={skipPhase}
            >
              <SkipForward size={18} color="#FFFFFF" strokeWidth={1.5} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.playButton}
              onPress={toggleTimer}
            >
              <LinearGradient
                colors={['#FF6B35', '#E55A2B']}
                style={styles.playButtonGradient}
              >
                {cycleState.isActive ? (
                  <Pause size={20} color="#000" strokeWidth={1.5} />
                ) : (
                  <Play size={20} color="#000" strokeWidth={1.5} />
                )}
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.controlButton}
              onPress={resetTimer}
            >
              <RotateCcw size={18} color="#FFFFFF" strokeWidth={1.5} />
            </TouchableOpacity>
          </View>

          {/* Current Phase Info */}
          <View style={styles.phaseInfo}>
            <Text style={styles.phaseInfoTitle}>ТЕКУЩАЯ ФАЗА</Text>
            <Text style={styles.phaseInfoText}>{currentConfig.message}</Text>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  header: {
    alignItems: 'center',
    marginBottom: 16,
  },
  greeting: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    letterSpacing: 3,
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 10,
    fontFamily: 'Inter-Medium',
    color: 'rgba(255, 255, 255, 0.5)',
    letterSpacing: 1.5,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderRadius: 16,
    padding: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  statNumber: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#FF6B35',
    marginBottom: 1,
  },
  statLabel: {
    fontSize: 8,
    fontFamily: 'Inter-Medium',
    color: 'rgba(255, 255, 255, 0.4)',
    letterSpacing: 1,
  },
  timerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    position: 'relative',
    flex: 1,
  },
  timerCircle: {
    width: width * 0.6,
    height: width * 0.6,
    borderRadius: width * 0.3,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerContent: {
    alignItems: 'center',
  },
  timerTime: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginTop: 6,
    marginBottom: 3,
    letterSpacing: 1,
  },
  timerPhase: {
    fontSize: 10,
    fontFamily: 'Inter-SemiBold',
    color: '#FF6B35',
    marginBottom: 1,
    letterSpacing: 1,
    textAlign: 'center',
  },
  timerSubtitle: {
    fontSize: 8,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.4)',
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  progressRing: {
    position: 'absolute',
    width: width * 0.65,
    height: width * 0.65,
    borderRadius: width * 0.325,
    borderWidth: 2,
    borderColor: 'rgba(255, 107, 53, 0.1)',
  },
  progressIndicator: {
    position: 'absolute',
    top: -3,
    left: '50%',
    width: 4,
    height: 4,
    backgroundColor: '#FF6B35',
    borderRadius: 2,
    marginLeft: -2,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 16,
  },
  controlButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    overflow: 'hidden',
  },
  playButtonGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  phaseInfo: {
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  phaseInfoTitle: {
    fontSize: 9,
    fontFamily: 'Inter-SemiBold',
    color: '#FF6B35',
    letterSpacing: 1.5,
    marginBottom: 6,
  },
  phaseInfoText: {
    fontSize: 11,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.6)',
    lineHeight: 14,
    letterSpacing: 0.3,
  },
});