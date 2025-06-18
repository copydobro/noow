import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Brain, X, SkipForward } from 'lucide-react-native';
import { Button } from '../../components/ui';
import { Colors, Typography } from '../../constants';

interface TestState {
  currentStimulus: number;
  totalStimuli: number;
  timeRemaining: number;
  isActive: boolean;
  accuracy: number;
  reactionTimes: number[];
  correctAnswers: number;
}

const colorWords = ['КРАСНЫЙ', 'СИНИЙ', 'ЗЕЛЕНЫЙ', 'ЖЕЛТЫЙ'];
const colors = ['#EF4444', '#3B82F6', '#22C55E', '#F59E0B'];

export default function StroopTest() {
  const [testState, setTestState] = useState<TestState>({
    currentStimulus: 0,
    totalStimuli: 20,
    timeRemaining: 60,
    isActive: false,
    accuracy: 0,
    reactionTimes: [],
    correctAnswers: 0,
  });

  const [currentWord, setCurrentWord] = useState('');
  const [currentColor, setCurrentColor] = useState('');
  const [isCongruent, setIsCongruent] = useState(false);
  const [stimulusStartTime, setStimulusStartTime] = useState(0);

  useEffect(() => {
    generateStimulus();
  }, []);

  useEffect(() => {
    if (testState.isActive && testState.timeRemaining > 0) {
      const timer = setInterval(() => {
        setTestState(prev => ({
          ...prev,
          timeRemaining: prev.timeRemaining - 1,
        }));
      }, 1000);

      return () => clearInterval(timer);
    } else if (testState.timeRemaining === 0) {
      finishTest();
    }
  }, [testState.isActive, testState.timeRemaining]);

  const generateStimulus = () => {
    const wordIndex = Math.floor(Math.random() * colorWords.length);
    const colorIndex = Math.floor(Math.random() * colors.length);
    
    setCurrentWord(colorWords[wordIndex]);
    setCurrentColor(colors[colorIndex]);
    setIsCongruent(wordIndex === colorIndex);
    setStimulusStartTime(Date.now());
  };

  const startTest = () => {
    setTestState(prev => ({ ...prev, isActive: true }));
    generateStimulus();
  };

  const handleResponse = (userSaysCongruent: boolean) => {
    const reactionTime = Date.now() - stimulusStartTime;
    const isCorrect = userSaysCongruent === isCongruent;
    
    setTestState(prev => ({
      ...prev,
      currentStimulus: prev.currentStimulus + 1,
      reactionTimes: [...prev.reactionTimes, reactionTime],
      correctAnswers: prev.correctAnswers + (isCorrect ? 1 : 0),
    }));

    if (testState.currentStimulus + 1 < testState.totalStimuli) {
      setTimeout(generateStimulus, 500);
    } else {
      finishTest();
    }
  };

  const finishTest = () => {
    const accuracy = (testState.correctAnswers / testState.totalStimuli) * 100;
    const avgReactionTime = testState.reactionTimes.reduce((a, b) => a + b, 0) / testState.reactionTimes.length;
    
    Alert.alert(
      'Тест завершен',
      `Точность: ${accuracy.toFixed(1)}%\nСреднее время реакции: ${avgReactionTime.toFixed(0)}мс`,
      [
        { text: 'OK', onPress: () => router.push('/feedback') }
      ]
    );
  };

  const skipTest = () => {
    Alert.alert(
      'Пропустить тест?',
      'Когнитивные тесты помогают отслеживать ваш прогресс',
      [
        { text: 'Отмена', style: 'cancel' },
        { text: 'Пропустить', onPress: () => router.push('/feedback') }
      ]
    );
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
              <X size={20} color={Colors.text.primary} strokeWidth={1.5} />
            </TouchableOpacity>
            
            <View style={styles.headerCenter}>
              <Text style={styles.title}>STROOP ТЕСТ</Text>
              <Text style={styles.subtitle}>ТЕСТ КОНЦЕНТРАЦИИ</Text>
            </View>
            
            <TouchableOpacity style={styles.skipButton} onPress={skipTest}>
              <SkipForward size={20} color={Colors.text.tertiary} strokeWidth={1.5} />
            </TouchableOpacity>
          </View>

          {/* Progress */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${((60 - testState.timeRemaining) / 60) * 100}%` }
                ]} 
              />
            </View>
            <Text style={styles.timeText}>{formatTime(testState.timeRemaining)}</Text>
          </View>

          {/* Instructions */}
          {!testState.isActive && (
            <View style={styles.instructions}>
              <View style={styles.instructionIcon}>
                <Brain size={32} color={Colors.accentColors.primary} strokeWidth={1.5} />
              </View>
              <Text style={styles.instructionTitle}>ИНСТРУКЦИИ</Text>
              <Text style={styles.instructionText}>
                Вам будут показаны слова-названия цветов, написанные разными цветами. 
                Нажимайте "СОВПАДАЕТ", если цвет текста совпадает со значением слова.
              </Text>
              <Text style={styles.instructionExample}>
                Пример: слово "КРАСНЫЙ" написано красным цветом = СОВПАДАЕТ
              </Text>
            </View>
          )}

          {/* Test Area */}
          <View style={styles.testArea}>
            {testState.isActive && (
              <View style={styles.stimulusContainer}>
                <Text style={[styles.stimulus, { color: currentColor }]}>
                  {currentWord}
                </Text>
                <Text style={styles.stimulusHint}>
                  ЦВЕТ {isCongruent ? 'СОВПАДАЕТ' : 'НЕ СОВПАДАЕТ'} СО СЛОВОМ
                </Text>
              </View>
            )}
          </View>

          {/* Controls */}
          <View style={styles.controls}>
            {!testState.isActive ? (
              <Button
                title="НАЧАТЬ ТЕСТ"
                onPress={startTest}
                style={styles.startButton}
              />
            ) : (
              <View style={styles.responseButtons}>
                <TouchableOpacity 
                  style={styles.responseButton}
                  onPress={() => handleResponse(false)}
                >
                  <Text style={styles.responseButtonText}>НЕ СОВПАДАЕТ</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.responseButton, styles.matchButton]}
                  onPress={() => handleResponse(true)}
                >
                  <Text style={styles.responseButtonText}>СОВПАДАЕТ</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Stats */}
          <View style={styles.stats}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{testState.currentStimulus}</Text>
              <Text style={styles.statLabel}>СТИМУЛ</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{testState.correctAnswers}</Text>
              <Text style={styles.statLabel}>ПРАВИЛЬНО</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>
                {testState.reactionTimes.length > 0 
                  ? Math.round(testState.reactionTimes[testState.reactionTimes.length - 1])
                  : 0}
              </Text>
              <Text style={styles.statLabel}>РЕАКЦИЯ (МС)</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.background.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCenter: {
    alignItems: 'center',
    flex: 1,
  },
  title: {
    ...Typography.sizes.subtitle,
    color: Colors.text.primary,
    marginBottom: 2,
  },
  subtitle: {
    ...Typography.sizes.micro,
    color: Colors.text.tertiary,
  },
  skipButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.background.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressContainer: {
    marginBottom: 32,
  },
  progressBar: {
    width: '100%',
    height: 4,
    backgroundColor: Colors.background.secondary,
    borderRadius: 2,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.accentColors.primary,
    borderRadius: 2,
  },
  timeText: {
    ...Typography.sizes.button,
    color: Colors.accentColors.primary,
    textAlign: 'center',
  },
  instructions: {
    alignItems: 'center',
    backgroundColor: Colors.background.secondary,
    borderRadius: 16,
    padding: 24,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: Colors.border.primary,
  },
  instructionIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.accentColors.tertiary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  instructionTitle: {
    ...Typography.sizes.subtitle,
    color: Colors.text.primary,
    marginBottom: 12,
  },
  instructionText: {
    ...Typography.sizes.body,
    color: Colors.text.secondary,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 12,
  },
  instructionExample: {
    ...Typography.sizes.bodySmall,
    color: Colors.accentColors.primary,
    textAlign: 'center',
    fontFamily: Typography.weights.semiBold,
  },
  testArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  stimulusContainer: {
    alignItems: 'center',
    backgroundColor: Colors.background.secondary,
    borderRadius: 16,
    padding: 32,
    borderWidth: 1,
    borderColor: Colors.border.primary,
  },
  stimulus: {
    fontSize: 36,
    fontFamily: Typography.weights.bold,
    marginBottom: 16,
    textAlign: 'center',
  },
  stimulusHint: {
    ...Typography.sizes.caption,
    color: Colors.text.muted,
    textAlign: 'center',
  },
  controls: {
    marginBottom: 24,
  },
  startButton: {
    // Uses default button styles
  },
  responseButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  responseButton: {
    flex: 1,
    backgroundColor: Colors.background.secondary,
    borderWidth: 1,
    borderColor: Colors.border.primary,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  matchButton: {
    borderColor: Colors.accentColors.primary,
    backgroundColor: Colors.accentColors.tertiary,
  },
  responseButtonText: {
    ...Typography.sizes.button,
    color: Colors.text.primary,
  },
  stats: {
    flexDirection: 'row',
    backgroundColor: Colors.background.secondary,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border.primary,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    ...Typography.sizes.accent,
    color: Colors.accentColors.primary,
    marginBottom: 4,
  },
  statLabel: {
    ...Typography.sizes.micro,
    color: Colors.text.tertiary,
    textAlign: 'center',
  },
});