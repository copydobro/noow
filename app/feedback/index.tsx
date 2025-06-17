import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Heart, Zap, Brain, CircleCheck as CheckCircle, X } from 'lucide-react-native';
import { Button } from '@/components/ui';
import { Colors, Typography } from '@/constants';

interface FeedbackState {
  mood: number;
  energy: number;
  focus: number;
  notes: string;
}

const moodLabels = ['😞', '😐', '🙂', '😊', '😄'];
const energyLabels = ['🔋', '🔋', '🔋', '🔋', '🔋'];
const focusLabels = ['🧠', '🧠', '🧠', '🧠', '🧠'];

export default function FeedbackScreen() {
  const [feedback, setFeedback] = useState<FeedbackState>({
    mood: 0,
    energy: 0,
    focus: 0,
    notes: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleRatingChange = (category: keyof FeedbackState, value: number) => {
    setFeedback(prev => ({ ...prev, [category]: value }));
  };

  const submitFeedback = () => {
    if (feedback.mood === 0 || feedback.energy === 0 || feedback.focus === 0) {
      Alert.alert('Ошибка', 'Пожалуйста, оцените все параметры');
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
      setTimeout(() => {
        router.back();
      }, 2000);
    }, 500);
  };

  const RatingComponent = ({ 
    title, 
    icon: Icon, 
    value, 
    onChange, 
    labels 
  }: {
    title: string;
    icon: any;
    value: number;
    onChange: (value: number) => void;
    labels: string[];
  }) => (
    <View style={styles.ratingContainer}>
      <View style={styles.ratingHeader}>
        <Icon size={20} color={Colors.accentColors.primary} strokeWidth={1.5} />
        <Text style={styles.ratingTitle}>{title}</Text>
      </View>
      
      <View style={styles.ratingScale}>
        {[1, 2, 3, 4, 5].map((rating) => (
          <TouchableOpacity
            key={rating}
            style={[
              styles.ratingButton,
              value === rating && styles.ratingButtonActive
            ]}
            onPress={() => onChange(rating)}
          >
            <Text style={[
              styles.ratingEmoji,
              value === rating && styles.ratingEmojiActive
            ]}>
              {labels[rating - 1]}
            </Text>
            <Text style={[
              styles.ratingNumber,
              value === rating && styles.ratingNumberActive
            ]}>
              {rating}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  if (isSubmitted) {
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.successContainer}>
            <View style={styles.successIcon}>
              <CheckCircle size={64} color={Colors.success[500]} strokeWidth={1.5} />
            </View>
            <Text style={styles.successTitle}>✓ СЕТ ЗАСЧИТАН</Text>
            <Text style={styles.successSubtitle}>ОТЛИЧНАЯ РАБОТА!</Text>
            
            <View style={styles.cycleStats}>
              <View style={styles.cycleStat}>
                <Text style={styles.cycleStatValue}>45:00</Text>
                <Text style={styles.cycleStatLabel}>РАБОТА</Text>
              </View>
              <View style={styles.cycleStat}>
                <Text style={styles.cycleStatValue}>2:00</Text>
                <Text style={styles.cycleStatLabel}>АКТИВАЦИЯ</Text>
              </View>
              <View style={styles.cycleStat}>
                <Text style={styles.cycleStatValue}>5:00</Text>
                <Text style={styles.cycleStatLabel}>ОТДЫХ</Text>
              </View>
            </View>

            <View style={styles.healthData}>
              <Text style={styles.healthDataTitle}>ДАННЫЕ ЗДОРОВЬЯ</Text>
              <View style={styles.healthMetrics}>
                <View style={styles.healthMetric}>
                  <Text style={styles.healthMetricValue}>72</Text>
                  <Text style={styles.healthMetricLabel}>ПУЛЬС</Text>
                </View>
                <View style={styles.healthMetric}>
                  <Text style={styles.healthMetricValue}>45</Text>
                  <Text style={styles.healthMetricLabel}>HRV</Text>
                </View>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </View>
    );
  }

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
              <Text style={styles.title}>ОБРАТНАЯ СВЯЗЬ</Text>
              <Text style={styles.subtitle}>КАК ВЫ СЕБЯ ЧУВСТВУЕТЕ?</Text>
            </View>
          </View>

          {/* Ratings */}
          <View style={styles.ratingsContainer}>
            <RatingComponent
              title="НАСТРОЕНИЕ"
              icon={Heart}
              value={feedback.mood}
              onChange={(value) => handleRatingChange('mood', value)}
              labels={moodLabels}
            />

            <RatingComponent
              title="УРОВЕНЬ ЭНЕРГИИ"
              icon={Zap}
              value={feedback.energy}
              onChange={(value) => handleRatingChange('energy', value)}
              labels={energyLabels}
            />

            <RatingComponent
              title="КОНЦЕНТРАЦИЯ"
              icon={Brain}
              value={feedback.focus}
              onChange={(value) => handleRatingChange('focus', value)}
              labels={focusLabels}
            />
          </View>

          {/* Summary */}
          <View style={styles.summary}>
            <Text style={styles.summaryTitle}>КРАТКАЯ СТАТИСТИКА ЦИКЛА</Text>
            <View style={styles.summaryStats}>
              <View style={styles.summaryStat}>
                <Text style={styles.summaryStatValue}>52:00</Text>
                <Text style={styles.summaryStatLabel}>ОБЩЕЕ ВРЕМЯ</Text>
              </View>
              <View style={styles.summaryStat}>
                <Text style={styles.summaryStatValue}>100%</Text>
                <Text style={styles.summaryStatLabel}>ЗАВЕРШЕНО</Text>
              </View>
              <View style={styles.summaryStat}>
                <Text style={styles.summaryStatValue}>7</Text>
                <Text style={styles.summaryStatLabel}>СЕРИЯ ДНЕЙ</Text>
              </View>
            </View>
          </View>

          {/* Submit Button */}
          <Button
            title="ОТПРАВИТЬ ОТЗЫВ"
            onPress={submitFeedback}
            style={styles.submitButton}
          />
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
    marginBottom: 32,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.background.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  headerCenter: {
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
  ratingsContainer: {
    gap: 24,
    marginBottom: 32,
  },
  ratingContainer: {
    backgroundColor: Colors.background.secondary,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.border.primary,
  },
  ratingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  ratingTitle: {
    ...Typography.sizes.button,
    color: Colors.text.primary,
    marginLeft: 8,
  },
  ratingScale: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ratingButton: {
    alignItems: 'center',
    padding: 8,
    borderRadius: 12,
    minWidth: 48,
  },
  ratingButtonActive: {
    backgroundColor: Colors.accentColors.tertiary,
  },
  ratingEmoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  ratingEmojiActive: {
    transform: [{ scale: 1.2 }],
  },
  ratingNumber: {
    ...Typography.sizes.caption,
    color: Colors.text.tertiary,
  },
  ratingNumberActive: {
    color: Colors.accentColors.primary,
    fontFamily: Typography.weights.semiBold,
  },
  summary: {
    backgroundColor: Colors.background.secondary,
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: Colors.border.primary,
  },
  summaryTitle: {
    ...Typography.sizes.button,
    color: Colors.text.primary,
    marginBottom: 16,
    textAlign: 'center',
  },
  summaryStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  summaryStat: {
    alignItems: 'center',
  },
  summaryStatValue: {
    ...Typography.sizes.accent,
    color: Colors.accentColors.primary,
    marginBottom: 4,
  },
  summaryStatLabel: {
    ...Typography.sizes.micro,
    color: Colors.text.tertiary,
    textAlign: 'center',
  },
  submitButton: {
    marginTop: 'auto',
  },
  
  // Success screen styles
  successContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  successIcon: {
    marginBottom: 24,
  },
  successTitle: {
    ...Typography.sizes.h2,
    color: Colors.success[500],
    textAlign: 'center',
    marginBottom: 8,
  },
  successSubtitle: {
    ...Typography.sizes.subtitle,
    color: Colors.text.secondary,
    textAlign: 'center',
    marginBottom: 32,
  },
  cycleStats: {
    flexDirection: 'row',
    backgroundColor: Colors.background.secondary,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.border.primary,
    gap: 20,
  },
  cycleStat: {
    flex: 1,
    alignItems: 'center',
  },
  cycleStatValue: {
    ...Typography.sizes.accent,
    color: Colors.accentColors.primary,
    marginBottom: 4,
  },
  cycleStatLabel: {
    ...Typography.sizes.micro,
    color: Colors.text.tertiary,
    textAlign: 'center',
  },
  healthData: {
    backgroundColor: Colors.background.secondary,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.border.primary,
    width: '100%',
  },
  healthDataTitle: {
    ...Typography.sizes.button,
    color: Colors.text.primary,
    textAlign: 'center',
    marginBottom: 16,
  },
  healthMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  healthMetric: {
    alignItems: 'center',
  },
  healthMetricValue: {
    ...Typography.sizes.accent,
    color: Colors.success[500],
    marginBottom: 4,
  },
  healthMetricLabel: {
    ...Typography.sizes.micro,
    color: Colors.text.tertiary,
  },
});