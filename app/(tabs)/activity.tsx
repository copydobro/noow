import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Play, Clock, Zap, Target, CircleCheck as CheckCircle, Star } from 'lucide-react-native';

interface Exercise {
  id: string;
  name: string;
  duration: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  image: string;
  description: string;
  completed?: boolean;
  instructions: string[];
}

const exercises: Exercise[] = [
  {
    id: '1',
    name: 'Приседания',
    duration: '2 мин',
    difficulty: 'easy',
    category: 'Ноги',
    image: 'https://images.pexels.com/photos/4162449/pexels-photo-4162449.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Классические приседания для активации мышц ног',
    instructions: [
      'Встаньте прямо, ноги на ширине плеч',
      'Медленно опуститесь, как будто садитесь на стул',
      'Держите спину прямо, колени не выходят за носки',
      'Поднимитесь в исходное положение',
      'Повторите 10-15 раз'
    ]
  },
  {
    id: '2',
    name: 'Отжимания',
    duration: '2 мин',
    difficulty: 'medium',
    category: 'Грудь',
    image: 'https://images.pexels.com/photos/4162438/pexels-photo-4162438.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Отжимания от пола для укрепления верхней части тела',
    instructions: [
      'Примите упор лежа, руки на ширине плеч',
      'Тело должно быть прямой линией',
      'Медленно опуститесь к полу',
      'Оттолкнитесь в исходное положение',
      'Повторите 8-12 раз'
    ]
  },
  {
    id: '3',
    name: 'Планка',
    duration: '2 мин',
    difficulty: 'medium',
    category: 'Кор',
    image: 'https://images.pexels.com/photos/4162451/pexels-photo-4162451.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Статическое упражнение для укрепления мышц кора',
    instructions: [
      'Примите упор лежа на предплечьях',
      'Тело должно быть прямой линией',
      'Напрягите мышцы живота',
      'Держите позицию 30-60 секунд',
      'Дышите равномерно'
    ]
  },
  {
    id: '4',
    name: 'Прыжки',
    duration: '2 мин',
    difficulty: 'hard',
    category: 'Кардио',
    image: 'https://images.pexels.com/photos/4162450/pexels-photo-4162450.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Прыжки на месте для кардио нагрузки',
    instructions: [
      'Встаньте прямо, ноги вместе',
      'Прыгните, разводя ноги в стороны',
      'Одновременно поднимите руки над головой',
      'Вернитесь в исходное положение',
      'Повторите 15-20 раз'
    ]
  },
  {
    id: '5',
    name: 'Растяжка шеи',
    duration: '2 мин',
    difficulty: 'easy',
    category: 'Растяжка',
    image: 'https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Мягкая растяжка для снятия напряжения в шее',
    instructions: [
      'Сядьте или встаньте прямо',
      'Медленно наклоните голову вправо',
      'Задержитесь на 15 секунд',
      'Повторите в другую сторону',
      'Выполните круговые движения головой'
    ]
  },
  {
    id: '6',
    name: 'Выпады',
    duration: '2 мин',
    difficulty: 'medium',
    category: 'Ноги',
    image: 'https://images.pexels.com/photos/4162452/pexels-photo-4162452.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Выпады для проработки мышц ног и ягодиц',
    instructions: [
      'Встаньте прямо, ноги на ширине плеч',
      'Сделайте шаг вперед одной ногой',
      'Опуститесь, сгибая оба колена под 90°',
      'Вернитесь в исходное положение',
      'Повторите 8-10 раз на каждую ногу'
    ]
  },
];

const difficultyColors = {
  easy: '#4ADE80',
  medium: '#FF6B35',
  hard: '#EF4444',
};

const difficultyLabels = {
  easy: 'ЛЕГКО',
  medium: 'СРЕДНЕ',
  hard: 'СЛОЖНО',
};

export default function ActivityTab() {
  const [selectedCategory, setSelectedCategory] = useState<string>('ВСЕ');
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set());

  const categories = ['ВСЕ', 'НОГИ', 'ГРУДЬ', 'КОР', 'КАРДИО', 'РАСТЯЖКА'];

  const filteredExercises = exercises.filter(exercise => 
    selectedCategory === 'ВСЕ' || exercise.category.toUpperCase() === selectedCategory
  );

  const toggleExerciseCompletion = (exerciseId: string) => {
    const newCompleted = new Set(completedExercises);
    if (newCompleted.has(exerciseId)) {
      newCompleted.delete(exerciseId);
    } else {
      newCompleted.add(exerciseId);
    }
    setCompletedExercises(newCompleted);
  };

  const startExercise = (exercise: Exercise) => {
    Alert.alert(
      exercise.name,
      `Готов начать ${exercise.name}?\n\nИнструкции:\n${exercise.instructions.join('\n')}`,
      [
        { text: 'Отмена', style: 'cancel' },
        { 
          text: 'Начать', 
          onPress: () => {
            Alert.alert(
              'Упражнение началось!',
              `Выполняй ${exercise.name} в течение ${exercise.duration}`,
              [
                { 
                  text: 'Завершить', 
                  onPress: () => {
                    toggleExerciseCompletion(exercise.id);
                    Alert.alert('Отлично!', 'Упражнение завершено! 🎉');
                  }
                }
              ]
            );
          }
        }
      ]
    );
  };

  const showExerciseDetails = (exercise: Exercise) => {
    Alert.alert(
      exercise.name,
      `${exercise.description}\n\nИнструкции:\n${exercise.instructions.join('\n')}`,
      [{ text: 'Понятно', style: 'default' }]
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>АКТИВАЦИЯ</Text>
            <Text style={styles.subtitle}>ФИЗИЧЕСКИЕ УПРАЖНЕНИЯ ДЛЯ 2-МИНУТНЫХ АКТИВАЦИЙ</Text>
          </View>

          {/* Stats */}
          <View style={styles.statsContainer}>
            <TouchableOpacity style={styles.statCard} onPress={() => {
              Alert.alert('Статистика', `Вы выполнили ${completedExercises.size} упражнений сегодня!`);
            }}>
              <Zap size={18} color="#FF6B35" strokeWidth={1.5} />
              <Text style={styles.statNumber}>{completedExercises.size}</Text>
              <Text style={styles.statLabel}>ВЫПОЛНЕНО</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.statCard} onPress={() => {
              Alert.alert('Доступно', `${exercises.length} упражнений готовы к выполнению`);
            }}>
              <Target size={18} color="#FF6B35" strokeWidth={1.5} />
              <Text style={styles.statNumber}>{exercises.length}</Text>
              <Text style={styles.statLabel}>ДОСТУПНО</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.statCard} onPress={() => {
              Alert.alert('Время активности', `Вы потратили ${completedExercises.size * 2} минут на упражнения`);
            }}>
              <Clock size={18} color="#FF6B35" strokeWidth={1.5} />
              <Text style={styles.statNumber}>{completedExercises.size * 2}</Text>
              <Text style={styles.statLabel}>МИНУТ</Text>
            </TouchableOpacity>
          </View>

          {/* Category Filter */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.categoryScroll}
            contentContainerStyle={styles.categoryContainer}
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryButton,
                  selectedCategory === category && styles.categoryButtonActive
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text style={[
                  styles.categoryText,
                  selectedCategory === category && styles.categoryTextActive
                ]}>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Exercise List */}
          <ScrollView 
            style={styles.exerciseList}
            showsVerticalScrollIndicator={false}
          >
            {filteredExercises.map((exercise) => (
              <TouchableOpacity 
                key={exercise.id} 
                style={styles.exerciseCard}
                onPress={() => showExerciseDetails(exercise)}
              >
                <Image source={{ uri: exercise.image }} style={styles.exerciseImage} />
                
                <View style={styles.exerciseContent}>
                  <View style={styles.exerciseHeader}>
                    <Text style={styles.exerciseName}>{exercise.name.toUpperCase()}</Text>
                    <TouchableOpacity
                      style={styles.completeButton}
                      onPress={(e) => {
                        e.stopPropagation();
                        toggleExerciseCompletion(exercise.id);
                      }}
                    >
                      {completedExercises.has(exercise.id) ? (
                        <CheckCircle size={20} color="#FF6B35" strokeWidth={1.5} />
                      ) : (
                        <View style={styles.incompleteCircle} />
                      )}
                    </TouchableOpacity>
                  </View>
                  
                  <Text style={styles.exerciseDescription}>{exercise.description}</Text>
                  
                  <View style={styles.exerciseFooter}>
                    <View style={styles.exerciseInfo}>
                      <View style={styles.exerciseTag}>
                        <Text style={styles.exerciseCategory}>{exercise.category.toUpperCase()}</Text>
                      </View>
                      <View style={[
                        styles.difficultyTag,
                        { backgroundColor: `${difficultyColors[exercise.difficulty]}15` }
                      ]}>
                        <Text style={[
                          styles.difficultyText,
                          { color: difficultyColors[exercise.difficulty] }
                        ]}>
                          {difficultyLabels[exercise.difficulty]}
                        </Text>
                      </View>
                    </View>
                    
                    <TouchableOpacity 
                      style={styles.startButton}
                      onPress={(e) => {
                        e.stopPropagation();
                        startExercise(exercise);
                      }}
                    >
                      <LinearGradient
                        colors={['#FF6B35', '#E55A2B']}
                        style={styles.startButtonGradient}
                      >
                        <Play size={14} color="#000" strokeWidth={1.5} />
                        <Text style={styles.startButtonText}>{exercise.duration}</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
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
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 36,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    letterSpacing: 4,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.5)',
    lineHeight: 16,
    letterSpacing: 1,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  statNumber: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 9,
    fontFamily: 'Inter-Medium',
    color: 'rgba(255, 255, 255, 0.5)',
    letterSpacing: 1.5,
  },
  categoryScroll: {
    marginBottom: 20,
    maxHeight: 50,
  },
  categoryContainer: {
    paddingRight: 20,
    gap: 8,
    alignItems: 'center',
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    minWidth: 60,
    alignItems: 'center',
  },
  categoryButtonActive: {
    backgroundColor: '#FF6B35',
    borderColor: '#FF6B35',
  },
  categoryText: {
    fontSize: 10,
    fontFamily: 'Inter-Medium',
    color: 'rgba(255, 255, 255, 0.6)',
    letterSpacing: 1,
  },
  categoryTextActive: {
    color: '#000',
  },
  exerciseList: {
    flex: 1,
  },
  exerciseCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 20,
    marginBottom: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  exerciseImage: {
    width: '100%',
    height: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  exerciseContent: {
    padding: 16,
  },
  exerciseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  exerciseName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    flex: 1,
    letterSpacing: 1,
  },
  completeButton: {
    padding: 4,
  },
  incompleteCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  exerciseDescription: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.6)',
    lineHeight: 16,
    marginBottom: 12,
  },
  exerciseFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  exerciseInfo: {
    flexDirection: 'row',
    gap: 6,
    flex: 1,
  },
  exerciseTag: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  exerciseCategory: {
    fontSize: 9,
    fontFamily: 'Inter-Medium',
    color: 'rgba(255, 255, 255, 0.7)',
    letterSpacing: 1,
  },
  difficultyTag: {
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  difficultyText: {
    fontSize: 9,
    fontFamily: 'Inter-Medium',
    letterSpacing: 1,
  },
  startButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  startButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    gap: 4,
  },
  startButtonText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#000',
    letterSpacing: 0.5,
  },
});