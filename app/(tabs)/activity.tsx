import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Play, Clock, Zap, Target, CircleCheck as CheckCircle } from 'lucide-react-native';

interface Exercise {
  id: string;
  name: string;
  duration: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  image: string;
  description: string;
  completed?: boolean;
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
  },
  {
    id: '2',
    name: 'Отжимания',
    duration: '2 мин',
    difficulty: 'medium',
    category: 'Грудь',
    image: 'https://images.pexels.com/photos/4162438/pexels-photo-4162438.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Отжимания от пола для укрепления верхней части тела',
  },
  {
    id: '3',
    name: 'Планка',
    duration: '2 мин',
    difficulty: 'medium',
    category: 'Кор',
    image: 'https://images.pexels.com/photos/4162451/pexels-photo-4162451.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Статическое упражнение для укрепления мышц кора',
  },
  {
    id: '4',
    name: 'Прыжки',
    duration: '2 мин',
    difficulty: 'hard',
    category: 'Кардио',
    image: 'https://images.pexels.com/photos/4162450/pexels-photo-4162450.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Прыжки на месте для кардио нагрузки',
  },
  {
    id: '5',
    name: 'Растяжка шеи',
    duration: '2 мин',
    difficulty: 'easy',
    category: 'Растяжка',
    image: 'https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Мягкая растяжка для снятия напряжения в шее',
  },
  {
    id: '6',
    name: 'Выпады',
    duration: '2 мин',
    difficulty: 'medium',
    category: 'Ноги',
    image: 'https://images.pexels.com/photos/4162452/pexels-photo-4162452.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Выпады для проработки мышц ног и ягодиц',
  },
];

const difficultyColors = {
  easy: '#4ADE80',
  medium: '#FBBF24',
  hard: '#EF4444',
};

const difficultyLabels = {
  easy: 'Легко',
  medium: 'Средне',
  hard: 'Сложно',
};

export default function ActivityTab() {
  const [selectedCategory, setSelectedCategory] = useState<string>('Все');
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set());

  const categories = ['Все', 'Ноги', 'Грудь', 'Кор', 'Кардио', 'Растяжка'];

  const filteredExercises = exercises.filter(exercise => 
    selectedCategory === 'Все' || exercise.category === selectedCategory
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

  return (
    <LinearGradient
      colors={['#0F0F23', '#1A1A3A', '#2D2D5F']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Физическая активация</Text>
            <Text style={styles.subtitle}>Выбери упражнения для 2-минутных активаций</Text>
          </View>

          {/* Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Zap size={24} color="#FBBF24" strokeWidth={2} />
              <Text style={styles.statNumber}>{completedExercises.size}</Text>
              <Text style={styles.statLabel}>Выполнено</Text>
            </View>
            <View style={styles.statCard}>
              <Target size={24} color="#4ADE80" strokeWidth={2} />
              <Text style={styles.statNumber}>{exercises.length}</Text>
              <Text style={styles.statLabel}>Доступно</Text>
            </View>
            <View style={styles.statCard}>
              <Clock size={24} color="#8B5CF6" strokeWidth={2} />
              <Text style={styles.statNumber}>{completedExercises.size * 2}</Text>
              <Text style={styles.statLabel}>Минут</Text>
            </View>
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
              <View key={exercise.id} style={styles.exerciseCard}>
                <Image source={{ uri: exercise.image }} style={styles.exerciseImage} />
                
                <View style={styles.exerciseContent}>
                  <View style={styles.exerciseHeader}>
                    <Text style={styles.exerciseName}>{exercise.name}</Text>
                    <TouchableOpacity
                      style={styles.completeButton}
                      onPress={() => toggleExerciseCompletion(exercise.id)}
                    >
                      {completedExercises.has(exercise.id) ? (
                        <CheckCircle size={24} color="#4ADE80" strokeWidth={2} />
                      ) : (
                        <View style={styles.incompleteCircle} />
                      )}
                    </TouchableOpacity>
                  </View>
                  
                  <Text style={styles.exerciseDescription}>{exercise.description}</Text>
                  
                  <View style={styles.exerciseFooter}>
                    <View style={styles.exerciseInfo}>
                      <View style={styles.exerciseTag}>
                        <Text style={styles.exerciseCategory}>{exercise.category}</Text>
                      </View>
                      <View style={[
                        styles.difficultyTag,
                        { backgroundColor: `${difficultyColors[exercise.difficulty]}20` }
                      ]}>
                        <Text style={[
                          styles.difficultyText,
                          { color: difficultyColors[exercise.difficulty] }
                        ]}>
                          {difficultyLabels[exercise.difficulty]}
                        </Text>
                      </View>
                    </View>
                    
                    <TouchableOpacity style={styles.startButton}>
                      <LinearGradient
                        colors={['#00D4FF', '#0099CC']}
                        style={styles.startButtonGradient}
                      >
                        <Play size={16} color="#000" strokeWidth={2} />
                        <Text style={styles.startButtonText}>{exercise.duration}</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
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
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.7)',
    lineHeight: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  statNumber: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.6)',
  },
  categoryScroll: {
    marginBottom: 24,
  },
  categoryContainer: {
    paddingRight: 24,
    gap: 12,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  categoryButtonActive: {
    backgroundColor: 'rgba(0, 212, 255, 0.2)',
    borderColor: '#00D4FF',
  },
  categoryText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: 'rgba(255, 255, 255, 0.7)',
  },
  categoryTextActive: {
    color: '#00D4FF',
  },
  exerciseList: {
    flex: 1,
  },
  exerciseCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  exerciseImage: {
    width: '100%',
    height: 120,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
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
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    flex: 1,
  },
  completeButton: {
    padding: 4,
  },
  incompleteCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  exerciseDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.7)',
    lineHeight: 20,
    marginBottom: 16,
  },
  exerciseFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  exerciseInfo: {
    flexDirection: 'row',
    gap: 8,
    flex: 1,
  },
  exerciseTag: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  exerciseCategory: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  difficultyTag: {
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  difficultyText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
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
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#000',
  },
});