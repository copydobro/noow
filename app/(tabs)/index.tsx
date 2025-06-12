import React, { useState, useEffect } from 'react';
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
    title: 'Глубокая работа',
    subtitle: 'Время сосредоточиться',
    icon: Brain,
    color: '#4ADE80',
    gradient: ['#4ADE80', '#22C55E'],
    message: 'Сосредоточься на важной задаче. Никаких отвлечений!',
  },
  activation: {
    title: 'Физическая активация',
    subtitle: 'Время двигаться',
    icon: Activity,
    color: '#FBBF24',
    gradient: ['#FBBF24', '#F59E0B'],
    message: 'Встань и подвигайся! Сделай несколько упражнений.',
  },
  rest: {
    title: 'Восстановление',
    subtitle: 'Время отдохнуть',
    icon: Coffee,
    color: '#8B5CF6',
    gradient: ['#8B5CF6', '#7C3AED'],
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

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (cycleState.isActive && cycleState.timeRemaining > 0) {
      interval = setInterval(() => {
        setCycleState(prev => ({
          ...prev,
          timeRemaining: prev.timeRemaining - 1,
        }));
      }, 1000);
    } else if (cycleState.timeRemaining === 0 && cycleState.isActive) {
      // Переход к следующей фазе
      const nextPhase = getNextPhase(cycleState.phase);
      setCycleState(prev => ({
        ...prev,
        phase: nextPhase,
        timeRemaining: PHASE_DURATIONS[nextPhase],
        cycleCount: nextPhase === 'work' ? prev.cycleCount + 1 : prev.cycleCount,
        isActive: false, // Останавливаем таймер для подтверждения
      }));
      
      // Показываем уведомление о новой фазе
      showPhaseAlert(nextPhase);
    }

    return () => clearInterval(interval);
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
    const scale = interpolate(pulseAnimation.value, [0, 1], [1, 1.05]);
    const opacity = interpolate(pulseAnimation.value, [0, 1], [0.8, 1]);
    
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
    <LinearGradient
      colors={['#0F0F23', '#1A1A3A', '#2D2D5F']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.greeting}>Привет! 👋</Text>
            <Text style={styles.subtitle}>Готов к Noowing?</Text>
          </View>

          {/* Cycle Counter */}
          <View style={styles.cycleCounter}>
            <Text style={styles.cycleCountText}>Цикл {cycleState.cycleCount + 1}</Text>
            <Text style={styles.cycleSubtext}>Сегодня</Text>
          </View>

          {/* Main Timer Circle */}
          <View style={styles.timerContainer}>
            <Animated.View style={[styles.timerCircle, pulseStyle]}>
              <LinearGradient
                colors={currentConfig.gradient}
                style={styles.timerGradient}
              >
                <View style={styles.timerContent}>
                  <IconComponent size={48} color="#000" strokeWidth={2} />
                  <Text style={styles.timerTime}>{formatTime(cycleState.timeRemaining)}</Text>
                  <Text style={styles.timerPhase}>{currentConfig.title}</Text>
                  <Text style={styles.timerSubtitle}>{currentConfig.subtitle}</Text>
                </View>
              </LinearGradient>
            </Animated.View>
            
            {/* Progress Ring */}
            <Animated.View style={[styles.progressRing, progressStyle]}>
              <View style={styles.progressIndicator} />
            </Animated.View>
          </View>

          {/* Phase Indicators */}
          <View style={styles.phaseIndicators}>
            {Object.entries(PHASE_CONFIG).map(([phase, config]) => (
              <TouchableOpacity
                key={phase}
                style={[
                  styles.phaseIndicator,
                  cycleState.phase === phase && styles.phaseIndicatorActive,
                  { borderColor: config.color }
                ]}
                onPress={() => {
                  Alert.alert(config.title, config.message);
                }}
              >
                <config.icon 
                  size={20} 
                  color={cycleState.phase === phase ? config.color : 'rgba(255,255,255,0.4)'} 
                  strokeWidth={2} 
                />
              </TouchableOpacity>
            ))}
          </View>

          {/* Controls */}
          <View style={styles.controls}>
            <TouchableOpacity
              style={styles.controlButton}
              onPress={skipPhase}
            >
              <SkipForward size={24} color="#FFFFFF" strokeWidth={2} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.playButton}
              onPress={toggleTimer}
            >
              <LinearGradient
                colors={['#00D4FF', '#0099CC']}
                style={styles.playButtonGradient}
              >
                {cycleState.isActive ? (
                  <Pause size={32} color="#000" strokeWidth={2} />
                ) : (
                  <Play size={32} color="#000" strokeWidth={2} />
                )}
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.controlButton}
              onPress={resetTimer}
            >
              <RotateCcw size={24} color="#FFFFFF" strokeWidth={2} />
            </TouchableOpacity>
          </View>

          {/* Daily Progress */}
          <View style={styles.dailyProgress}>
            <Text style={styles.dailyProgressTitle}>Сегодняшний прогресс</Text>
            <View style={styles.progressStats}>
              <View style={styles.progressStat}>
                <Text style={styles.progressStatNumber}>{cycleState.cycleCount}</Text>
                <Text style={styles.progressStatLabel}>Циклов</Text>
              </View>
              <View style={styles.progressStat}>
                <Text style={styles.progressStatNumber}>
                  {Math.floor(cycleState.cycleCount * 52 / 60)}ч {(cycleState.cycleCount * 52) % 60}м
                </Text>
                <Text style={styles.progressStatLabel}>Время</Text>
              </View>
              <View style={styles.progressStat}>
                <Text style={styles.progressStatNumber}>{cycleState.cycleCount * 2}</Text>
                <Text style={styles.progressStatLabel}>Активаций</Text>
              </View>
            </View>
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
    alignItems: 'center',
    marginBottom: 20,
  },
  greeting: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.7)',
  },
  cycleCounter: {
    alignItems: 'center',
    marginBottom: 40,
  },
  cycleCountText: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#00D4FF',
    marginBottom: 4,
  },
  cycleSubtext: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.6)',
  },
  timerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
    position: 'relative',
  },
  timerCircle: {
    width: width * 0.7,
    height: width * 0.7,
    borderRadius: width * 0.35,
    overflow: 'hidden',
  },
  timerGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerContent: {
    alignItems: 'center',
  },
  timerTime: {
    fontSize: 36,
    fontFamily: 'Inter-Bold',
    color: '#000',
    marginTop: 12,
    marginBottom: 8,
  },
  timerPhase: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#000',
    marginBottom: 4,
  },
  timerSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: 'rgba(0, 0, 0, 0.7)',
  },
  progressRing: {
    position: 'absolute',
    width: width * 0.75,
    height: width * 0.75,
    borderRadius: width * 0.375,
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  progressIndicator: {
    position: 'absolute',
    top: -2,
    left: '50%',
    width: 8,
    height: 8,
    backgroundColor: '#00D4FF',
    borderRadius: 4,
    marginLeft: -4,
  },
  phaseIndicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 40,
  },
  phaseIndicator: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  phaseIndicatorActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 32,
    marginBottom: 40,
  },
  controlButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
  },
  playButtonGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dailyProgress: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  dailyProgressTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 16,
  },
  progressStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  progressStat: {
    alignItems: 'center',
  },
  progressStatNumber: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#00D4FF',
    marginBottom: 4,
  },
  progressStatLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.6)',
  },
});