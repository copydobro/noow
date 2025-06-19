import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, Brain } from 'lucide-react-native';
import { Colors, Typography } from '@/constants';

const { width } = Dimensions.get('window');

export default function NBackTest() {
  const [currentNumber, setCurrentNumber] = useState<number | null>(null);
  const [sequence, setSequence] = useState<number[]>([]);
  const [userResponses, setUserResponses] = useState<boolean[]>([]);
  const [correctResponses, setCorrectResponses] = useState<boolean[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTestActive, setIsTestActive] = useState(false);
  const [testResults, setTestResults] = useState<{
    accuracy: number;
    avgReactionTime: number;
    totalResponses: number;
  } | null>(null);
  const [reactionTimes, setReactionTimes] = useState<number[]>([]);
  const startTimeRef = useRef<number>(0);

  const generateSequence = () => {
    const newSequence = [];
    for (let i = 0; i < 30; i++) {
      newSequence.push(Math.floor(Math.random() * 9) + 1);
    }
    setSequence(newSequence);
  };

  const startTest = () => {
    generateSequence();
    setCurrentIndex(0);
    setUserResponses([]);
    setCorrectResponses([]);
    setReactionTimes([]);
    setIsTestActive(true);
    setTestResults(null);
  };

  const handleResponse = (response: boolean) => {
    if (!isTestActive) return;

    const endTime = Date.now();
    const reactionTime = endTime - startTimeRef.current;
    setReactionTimes(prev => [...prev, reactionTime]);

    const correct = currentIndex >= 2 && sequence[currentIndex] === sequence[currentIndex - 2];
    setCorrectResponses(prev => [...prev, correct]);
    setUserResponses(prev => [...prev, response]);

    if (currentIndex < sequence.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      finishTest();
    }
  };

  const finishTest = () => {
    setIsTestActive(false);
    
    const correctMatches = userResponses.filter((response, index) => response === correctResponses[index]).length;
    const accuracy = (correctMatches / userResponses.length) * 100;
    const avgReactionTime = reactionTimes.reduce((sum, time) => sum + time, 0) / reactionTimes.length;

    setTestResults({
      accuracy,
      avgReactionTime,
      totalResponses: userResponses.length
    });

    Alert.alert(
      'Тест завершен!',
      `Точность: ${accuracy.toFixed(1)}%\nСреднее время реакции: ${avgReactionTime.toFixed(0)}мс`,
      [
        { text: 'OK', onPress: () => router.push('/cognitive/stroop' as any) }
      ]
    );
  };

  const skipTest = () => {
    Alert.alert(
      'Пропустить тест?',
      'Вы уверены, что хотите пропустить этот когнитивный тест?',
      [
        { text: 'Отмена', style: 'cancel' },
        { text: 'Пропустить', onPress: () => router.push('/cognitive/stroop' as any) }
      ]
    );
  };

  useEffect(() => {
    if (isTestActive && currentIndex < sequence.length) {
      setCurrentNumber(sequence[currentIndex]);
      startTimeRef.current = Date.now();
    }
  }, [currentIndex, isTestActive, sequence]);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
              <ArrowLeft size={20} color={Colors.text.primary} strokeWidth={1.5} />
            </TouchableOpacity>
            <View style={styles.headerCenter}>
              <Text style={styles.title}>N-BACK ТЕСТ</Text>
              <Text style={styles.subtitle}>ТЕСТИРОВАНИЕ РАБОЧЕЙ ПАМЯТИ</Text>
            </View>
            <TouchableOpacity style={styles.skipButton} onPress={skipTest}>
              <Text style={styles.skipText}>ПРОПУСТИТЬ</Text>
            </TouchableOpacity>
          </View>

          {!isTestActive && !testResults && (
            <View style={styles.instructions}>
              <View style={styles.instructionIcon}>
                <Brain size={48} color={Colors.accentColors.primary} strokeWidth={1.5} />
              </View>
              <Text style={styles.instructionTitle}>ИНСТРУКЦИЯ</Text>
              <Text style={styles.instructionText}>
                Вам будут показаны цифры одна за другой. Нажимайте "СОВПАДЕНИЕ", 
                если текущая цифра совпадает с цифрой, показанной 2 позициями назад.
              </Text>
              <Text style={styles.instructionExample}>
                Пример: 3, 7, 3 → нажимайте "СОВПАДЕНИЕ" на третьей цифре
              </Text>
              <TouchableOpacity style={styles.startButton} onPress={startTest}>
                <Text style={styles.startButtonText}>НАЧАТЬ ТЕСТ</Text>
              </TouchableOpacity>
            </View>
          )}

          {isTestActive && currentNumber !== null && (
            <View style={styles.testArea}>
              <Text style={styles.progressText}>
                {currentIndex + 1} / {sequence.length}
              </Text>
              <View style={styles.numberDisplay}>
                <Text style={styles.currentNumber}>{currentNumber}</Text>
              </View>
              <View style={styles.responseButtons}>
                <TouchableOpacity 
                  style={styles.responseButton}
                  onPress={() => handleResponse(true)}
                >
                  <Text style={styles.responseButtonText}>СОВПАДЕНИЕ</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.responseButton}
                  onPress={() => handleResponse(false)}
                >
                  <Text style={styles.responseButtonText}>НЕ СОВПАДАЕТ</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {testResults && (
            <View style={styles.results}>
              <Text style={styles.resultsTitle}>РЕЗУЛЬТАТЫ ТЕСТА</Text>
              <View style={styles.resultItem}>
                <Text style={styles.resultLabel}>Точность:</Text>
                <Text style={styles.resultValue}>{testResults.accuracy.toFixed(1)}%</Text>
              </View>
              <View style={styles.resultItem}>
                <Text style={styles.resultLabel}>Среднее время реакции:</Text>
                <Text style={styles.resultValue}>{testResults.avgReactionTime.toFixed(0)}мс</Text>
              </View>
              <View style={styles.resultItem}>
                <Text style={styles.resultLabel}>Всего ответов:</Text>
                <Text style={styles.resultValue}>{testResults.totalResponses}</Text>
              </View>
            </View>
          )}
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
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    marginBottom: 20,
  },
  backButton: {
    padding: 8,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    ...Typography.sizes.h2,
    color: Colors.text.primary,
    textAlign: 'center',
  },
  subtitle: {
    ...Typography.sizes.body,
    color: Colors.text.secondary,
    textAlign: 'center',
    marginTop: 4,
  },
  skipButton: {
    padding: 8,
  },
  skipText: {
    ...Typography.sizes.button,
    color: Colors.text.secondary,
  },
  instructions: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  instructionIcon: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: `${Colors.accentColors.primary}20`,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  instructionTitle: {
    ...Typography.sizes.h3,
    color: Colors.text.primary,
    marginBottom: 16,
  },
  instructionText: {
    ...Typography.sizes.body,
    color: Colors.text.secondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 16,
  },
  instructionExample: {
    ...Typography.sizes.bodySmall,
    color: Colors.text.tertiary,
    textAlign: 'center',
    marginBottom: 32,
  },
  startButton: {
    backgroundColor: Colors.accentColors.primary,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 16,
  },
  startButtonText: {
    ...Typography.sizes.button,
    color: '#000000',
  },
  testArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressText: {
    ...Typography.sizes.body,
    color: Colors.text.secondary,
    marginBottom: 40,
  },
  numberDisplay: {
    width: width * 0.6,
    height: width * 0.6,
    borderRadius: (width * 0.6) / 2,
    backgroundColor: Colors.background.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 60,
    borderWidth: 2,
    borderColor: Colors.border.accent,
  },
  currentNumber: {
    ...Typography.sizes.h1,
    color: Colors.text.primary,
    fontSize: 72,
  },
  responseButtons: {
    flexDirection: 'row',
    gap: 20,
  },
  responseButton: {
    backgroundColor: Colors.background.secondary,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border.primary,
    minWidth: 120,
    alignItems: 'center',
  },
  responseButtonText: {
    ...Typography.sizes.button,
    color: Colors.text.primary,
  },
  results: {
    flex: 1,
    paddingVertical: 40,
  },
  resultsTitle: {
    ...Typography.sizes.h3,
    color: Colors.text.primary,
    textAlign: 'center',
    marginBottom: 32,
  },
  resultItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.primary,
  },
  resultLabel: {
    ...Typography.sizes.body,
    color: Colors.text.secondary,
  },
  resultValue: {
    ...Typography.sizes.body,
    color: Colors.text.primary,
    fontWeight: '600',
  },
}); 