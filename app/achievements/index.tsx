import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Award, Trophy, Star, Target, Zap, Brain, Activity, Clock, Share2, X } from 'lucide-react-native';
import { Colors, Typography } from '@/constants';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: any;
  category: 'cycles' | 'streak' | 'time' | 'cognitive' | 'special';
  earned: boolean;
  progress: number;
  maxProgress: number;
  earnedAt?: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

const achievements: Achievement[] = [
  {
    id: '1',
    title: 'ПЕРВЫЙ ШАГ',
    description: 'Завершите свой первый цикл NOOW',
    icon: Star,
    category: 'cycles',
    earned: true,
    progress: 1,
    maxProgress: 1,
    earnedAt: '2024-01-15',
    rarity: 'common',
  },
  {
    id: '2',
    title: 'НЕДЕЛЯ СИЛЫ',
    description: 'Поддерживайте активность 7 дней подряд',
    icon: Trophy,
    category: 'streak',
    earned: true,
    progress: 7,
    maxProgress: 7,
    earnedAt: '2024-01-22',
    rarity: 'rare',
  },
  {
    id: '3',
    title: 'МАРАФОНЕЦ',
    description: 'Накопите 100 часов глубокой работы',
    icon: Clock,
    category: 'time',
    earned: false,
    progress: 67,
    maxProgress: 100,
    rarity: 'epic',
  },
  {
    id: '4',
    title: 'ЭНЕРГЕТИЧЕСКИЙ ВОИН',
    description: 'Выполните 100 активаций',
    icon: Zap,
    category: 'cycles',
    earned: true,
    progress: 100,
    maxProgress: 100,
    earnedAt: '2024-01-28',
    rarity: 'rare',
  },
  {
    id: '5',
    title: 'МАСТЕР КОНЦЕНТРАЦИИ',
    description: 'Завершите 500 циклов работы',
    icon: Brain,
    category: 'cycles',
    earned: false,
    progress: 156,
    maxProgress: 500,
    rarity: 'legendary',
  },
  {
    id: '6',
    title: 'ЖЕЛЕЗНАЯ ВОЛЯ',
    description: 'Поддерживайте активность 30 дней подряд',
    icon: Target,
    category: 'streak',
    earned: false,
    progress: 7,
    maxProgress: 30,
    rarity: 'epic',
  },
];

const categories = [
  { key: 'all', label: 'ВСЕ', icon: Award },
  { key: 'cycles', label: 'ЦИКЛЫ', icon: Brain },
  { key: 'streak', label: 'СЕРИИ', icon: Trophy },
  { key: 'time', label: 'ВРЕМЯ', icon: Clock },
  { key: 'cognitive', label: 'КОГНИТИВНЫЕ', icon: Activity },
];

export default function AchievementsScreen() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredAchievements = selectedCategory === 'all' 
    ? achievements 
    : achievements.filter(a => a.category === selectedCategory);

  const earnedCount = achievements.filter(a => a.earned).length;
  const totalCount = achievements.length;

  const getRarityColor = (rarity: Achievement['rarity']) => {
    switch (rarity) {
      case 'common': return Colors.text.secondary;
      case 'rare': return Colors.primary[400];
      case 'epic': return Colors.accent[400];
      case 'legendary': return Colors.warning[400];
      default: return Colors.text.secondary;
    }
  };

  const shareAchievement = (achievement: Achievement) => {
    Alert.alert(
      'Поделиться достижением',
      `Хотите поделиться достижением "${achievement.title}"?`,
      [
        { text: 'Отмена', style: 'cancel' },
        { text: 'Поделиться', onPress: () => Alert.alert('Успех!', 'Достижение отправлено!') }
      ]
    );
  };

  const showAchievementDetails = (achievement: Achievement) => {
    const progressText = achievement.earned 
      ? `✅ Получено ${achievement.earnedAt}`
      : `Прогресс: ${achievement.progress}/${achievement.maxProgress}`;
    
    Alert.alert(
      achievement.title,
      `${achievement.description}\n\n${progressText}`,
      achievement.earned 
        ? [
            { text: 'Закрыть', style: 'cancel' },
            { text: 'Поделиться', onPress: () => shareAchievement(achievement) }
          ]
        : [{ text: 'Понятно', style: 'default' }]
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
              <X size={20} color={Colors.text.primary} strokeWidth={1.5} />
            </TouchableOpacity>
            
            <View style={styles.headerCenter}>
              <Text style={styles.title}>ДОСТИЖЕНИЯ</Text>
              <Text style={styles.subtitle}>{earnedCount} ИЗ {totalCount} ПОЛУЧЕНО</Text>
            </View>
            
            <TouchableOpacity style={styles.shareButton} onPress={() => Alert.alert('Поделиться', 'Поделитесь своими достижениями!')}>
              <Share2 size={20} color={Colors.accentColors.primary} strokeWidth={1.5} />
            </TouchableOpacity>
          </View>

          {/* Progress Overview */}
          <View style={styles.progressOverview}>
            <View style={styles.progressCircle}>
              <Text style={styles.progressPercentage}>
                {Math.round((earnedCount / totalCount) * 100)}%
              </Text>
              <Text style={styles.progressLabel}>ЗАВЕРШЕНО</Text>
            </View>
            
            <View style={styles.progressStats}>
              <View style={styles.progressStat}>
                <Text style={styles.progressStatNumber}>{earnedCount}</Text>
                <Text style={styles.progressStatLabel}>ПОЛУЧЕНО</Text>
              </View>
              <View style={styles.progressStat}>
                <Text style={styles.progressStatNumber}>{totalCount - earnedCount}</Text>
                <Text style={styles.progressStatLabel}>ОСТАЛОСЬ</Text>
              </View>
            </View>
          </View>

          {/* Categories */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesContainer}
            contentContainerStyle={styles.categories}
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category.key}
                style={[
                  styles.categoryButton,
                  selectedCategory === category.key && styles.categoryButtonActive
                ]}
                onPress={() => setSelectedCategory(category.key)}
              >
                <category.icon 
                  size={16} 
                  color={selectedCategory === category.key ? '#000' : Colors.text.secondary} 
                  strokeWidth={1.5} 
                />
                <Text style={[
                  styles.categoryText,
                  selectedCategory === category.key && styles.categoryTextActive
                ]}>
                  {category.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Achievements List */}
          <ScrollView style={styles.achievementsList} showsVerticalScrollIndicator={false}>
            {filteredAchievements.map((achievement) => (
              <TouchableOpacity
                key={achievement.id}
                style={[
                  styles.achievementCard,
                  !achievement.earned && styles.achievementCardLocked
                ]}
                onPress={() => showAchievementDetails(achievement)}
              >
                <View style={styles.achievementIcon}>
                  <achievement.icon 
                    size={24} 
                    color={achievement.earned ? Colors.accentColors.primary : Colors.text.muted} 
                    strokeWidth={1.5} 
                  />
                </View>
                
                <View style={styles.achievementContent}>
                  <View style={styles.achievementHeader}>
                    <Text style={[
                      styles.achievementTitle,
                      !achievement.earned && styles.achievementTitleLocked
                    ]}>
                      {achievement.title}
                    </Text>
                    <Text style={[
                      styles.achievementRarity,
                      { color: getRarityColor(achievement.rarity) }
                    ]}>
                      {achievement.rarity.toUpperCase()}
                    </Text>
                  </View>
                  
                  <Text style={[
                    styles.achievementDescription,
                    !achievement.earned && styles.achievementDescriptionLocked
                  ]}>
                    {achievement.description}
                  </Text>
                  
                  {!achievement.earned && (
                    <View style={styles.progressContainer}>
                      <View style={styles.progressBar}>
                        <View 
                          style={[
                            styles.progressFill, 
                            { width: `${(achievement.progress / achievement.maxProgress) * 100}%` }
                          ]} 
                        />
                      </View>
                      <Text style={styles.progressText}>
                        {achievement.progress}/{achievement.maxProgress}
                      </Text>
                    </View>
                  )}
                  
                  {achievement.earned && achievement.earnedAt && (
                    <Text style={styles.earnedDate}>
                      Получено {achievement.earnedAt}
                    </Text>
                  )}
                </View>
                
                {achievement.earned && (
                  <View style={styles.achievementBadge}>
                    <Trophy size={16} color="#000" strokeWidth={1.5} />
                  </View>
                )}
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
    backgroundColor: Colors.background.primary,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  backButton: {
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
  shareButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.accentColors.tertiary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressOverview: {
    flexDirection: 'row',
    backgroundColor: Colors.background.secondary,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.border.primary,
  },
  progressCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.accentColors.tertiary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },
  progressPercentage: {
    ...Typography.sizes.subtitle,
    color: Colors.accentColors.primary,
    marginBottom: 2,
  },
  progressLabel: {
    ...Typography.sizes.micro,
    color: Colors.text.tertiary,
  },
  progressStats: {
    flex: 1,
    justifyContent: 'center',
    gap: 12,
  },
  progressStat: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  progressStatNumber: {
    ...Typography.sizes.accent,
    color: Colors.text.primary,
  },
  progressStatLabel: {
    ...Typography.sizes.bodySmall,
    color: Colors.text.secondary,
  },
  categoriesContainer: {
    marginBottom: 20,
  },
  categories: {
    gap: 8,
    paddingHorizontal: 4,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background.secondary,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: Colors.border.primary,
  },
  categoryButtonActive: {
    backgroundColor: Colors.accentColors.primary,
    borderColor: Colors.accentColors.primary,
  },
  categoryText: {
    ...Typography.sizes.caption,
    color: Colors.text.secondary,
    marginLeft: 6,
  },
  categoryTextActive: {
    color: '#000',
    fontFamily: Typography.weights.semiBold,
  },
  achievementsList: {
    flex: 1,
  },
  achievementCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background.secondary,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border.primary,
  },
  achievementCardLocked: {
    opacity: 0.6,
  },
  achievementIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.accentColors.tertiary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  achievementContent: {
    flex: 1,
  },
  achievementHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  achievementTitle: {
    ...Typography.sizes.button,
    color: Colors.text.primary,
    flex: 1,
  },
  achievementTitleLocked: {
    color: Colors.text.tertiary,
  },
  achievementRarity: {
    ...Typography.sizes.micro,
    fontFamily: Typography.weights.semiBold,
  },
  achievementDescription: {
    ...Typography.sizes.bodySmall,
    color: Colors.text.secondary,
    marginBottom: 8,
  },
  achievementDescriptionLocked: {
    color: Colors.text.muted,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: Colors.background.tertiary,
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.accentColors.primary,
    borderRadius: 2,
  },
  progressText: {
    ...Typography.sizes.micro,
    color: Colors.text.tertiary,
    minWidth: 40,
  },
  earnedDate: {
    ...Typography.sizes.micro,
    color: Colors.text.muted,
  },
  achievementBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.accentColors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
});