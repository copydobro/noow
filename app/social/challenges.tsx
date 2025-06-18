import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Target, Users, Calendar, Trophy, Clock, X, Plus, Zap } from 'lucide-react-native';
import { Button } from '@/components/ui';
import { Colors, Typography } from '@/constants';

interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'monthly';
  participants: number;
  reward: string;
  progress: number;
  maxProgress: number;
  timeLeft: string;
  isJoined: boolean;
  difficulty: 'easy' | 'medium' | 'hard';
}

const challenges: Challenge[] = [
  {
    id: '1',
    title: 'НЕДЕЛЬНЫЙ МАРАФОН',
    description: 'Завершите 35 циклов за неделю',
    type: 'weekly',
    participants: 1247,
    reward: '500 очков + бейдж',
    progress: 23,
    maxProgress: 35,
    timeLeft: '3 дня',
    isJoined: true,
    difficulty: 'medium',
  },
  {
    id: '2',
    title: 'ЕЖЕДНЕВНАЯ СЕРИЯ',
    description: 'Поддерживайте активность 7 дней подряд',
    type: 'daily',
    participants: 892,
    reward: '300 очков',
    progress: 5,
    maxProgress: 7,
    timeLeft: '2 дня',
    isJoined: true,
    difficulty: 'easy',
  },
  {
    id: '3',
    title: 'МАСТЕР КОНЦЕНТРАЦИИ',
    description: 'Завершите 100 циклов работы без пропусков',
    type: 'monthly',
    participants: 456,
    reward: '1000 очков + эксклюзивный бейдж',
    progress: 67,
    maxProgress: 100,
    timeLeft: '12 дней',
    isJoined: false,
    difficulty: 'hard',
  },
  {
    id: '4',
    title: 'ЭНЕРГЕТИЧЕСКИЙ ВОИН',
    description: 'Выполните 50 активаций за неделю',
    type: 'weekly',
    participants: 723,
    reward: '400 очков',
    progress: 0,
    maxProgress: 50,
    timeLeft: '6 дней',
    isJoined: false,
    difficulty: 'medium',
  },
];

export default function ChallengesScreen() {
  const [selectedType, setSelectedType] = useState<string>('all');

  const challengeTypes = [
    { key: 'all', label: 'ВСЕ' },
    { key: 'daily', label: 'ЕЖЕДНЕВНЫЕ' },
    { key: 'weekly', label: 'НЕДЕЛЬНЫЕ' },
    { key: 'monthly', label: 'МЕСЯЧНЫЕ' },
  ];

  const filteredChallenges = selectedType === 'all' 
    ? challenges 
    : challenges.filter(c => c.type === selectedType);

  const getDifficultyColor = (difficulty: Challenge['difficulty']) => {
    switch (difficulty) {
      case 'easy': return Colors.success[500];
      case 'medium': return Colors.warning[500];
      case 'hard': return Colors.error[500];
      default: return Colors.text.tertiary;
    }
  };

  const getTypeIcon = (type: Challenge['type']) => {
    switch (type) {
      case 'daily': return Calendar;
      case 'weekly': return Clock;
      case 'monthly': return Target;
      default: return Target;
    }
  };

  const handleJoinChallenge = (challengeId: string) => {
    Alert.alert(
      'Присоединиться к вызову?',
      'Вы уверены, что хотите принять участие в этом вызове?',
      [
        { text: 'Отмена', style: 'cancel' },
        { text: 'Присоединиться', onPress: () => Alert.alert('Успех!', 'Вы присоединились к вызову!') }
      ]
    );
  };

  const handleLeaveChallenge = (challengeId: string) => {
    Alert.alert(
      'Покинуть вызов?',
      'Ваш прогресс будет сохранен, но вы не сможете получить награду.',
      [
        { text: 'Отмена', style: 'cancel' },
        { text: 'Покинуть', style: 'destructive', onPress: () => Alert.alert('Вы покинули вызов') }
      ]
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
              <Text style={styles.title}>ВЫЗОВЫ</Text>
              <Text style={styles.subtitle}>КОМАНДНЫЕ ИСПЫТАНИЯ</Text>
            </View>
            
            <TouchableOpacity style={styles.createButton} onPress={() => Alert.alert('Создать вызов', 'Функция создания вызовов будет доступна в следующих версиях')}>
              <Plus size={20} color={Colors.accentColors.primary} strokeWidth={1.5} />
            </TouchableOpacity>
          </View>

          {/* Type Selector */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.typeSelectorContainer}
            contentContainerStyle={styles.typeSelector}
          >
            {challengeTypes.map((type) => (
              <TouchableOpacity
                key={type.key}
                style={[
                  styles.typeButton,
                  selectedType === type.key && styles.typeButtonActive
                ]}
                onPress={() => setSelectedType(type.key)}
              >
                <Text style={[
                  styles.typeText,
                  selectedType === type.key && styles.typeTextActive
                ]}>
                  {type.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Active Challenges Summary */}
          <View style={styles.summary}>
            <View style={styles.summaryItem}>
              <Zap size={16} color={Colors.accentColors.primary} strokeWidth={1.5} />
              <Text style={styles.summaryLabel}>АКТИВНЫХ ВЫЗОВОВ</Text>
              <Text style={styles.summaryValue}>2</Text>
            </View>
            <View style={styles.summaryItem}>
              <Trophy size={16} color={Colors.accentColors.primary} strokeWidth={1.5} />
              <Text style={styles.summaryLabel}>ОЧКОВ ЗАРАБОТАНО</Text>
              <Text style={styles.summaryValue}>1,250</Text>
            </View>
          </View>

          {/* Challenges List */}
          <ScrollView style={styles.challengesList} showsVerticalScrollIndicator={false}>
            {filteredChallenges.map((challenge) => {
              const TypeIcon = getTypeIcon(challenge.type);
              
              return (
                <View key={challenge.id} style={styles.challengeCard}>
                  <View style={styles.challengeHeader}>
                    <View style={styles.challengeTypeContainer}>
                      <TypeIcon size={16} color={Colors.accentColors.primary} strokeWidth={1.5} />
                      <Text style={styles.challengeType}>{challenge.type.toUpperCase()}</Text>
                    </View>
                    
                    <View style={[styles.difficultyBadge, { backgroundColor: `${getDifficultyColor(challenge.difficulty)}20` }]}>
                      <Text style={[styles.difficultyText, { color: getDifficultyColor(challenge.difficulty) }]}>
                        {challenge.difficulty.toUpperCase()}
                      </Text>
                    </View>
                  </View>
                  
                  <Text style={styles.challengeTitle}>{challenge.title}</Text>
                  <Text style={styles.challengeDescription}>{challenge.description}</Text>
                  
                  {challenge.isJoined && (
                    <View style={styles.progressContainer}>
                      <View style={styles.progressBar}>
                        <View 
                          style={[
                            styles.progressFill, 
                            { width: `${(challenge.progress / challenge.maxProgress) * 100}%` }
                          ]} 
                        />
                      </View>
                      <Text style={styles.progressText}>
                        {challenge.progress}/{challenge.maxProgress}
                      </Text>
                    </View>
                  )}
                  
                  <View style={styles.challengeInfo}>
                    <View style={styles.infoItem}>
                      <Users size={14} color={Colors.text.tertiary} strokeWidth={1.5} />
                      <Text style={styles.infoText}>{challenge.participants} участников</Text>
                    </View>
                    <View style={styles.infoItem}>
                      <Clock size={14} color={Colors.text.tertiary} strokeWidth={1.5} />
                      <Text style={styles.infoText}>{challenge.timeLeft} осталось</Text>
                    </View>
                  </View>
                  
                  <View style={styles.rewardContainer}>
                    <Trophy size={14} color={Colors.accentColors.primary} strokeWidth={1.5} />
                    <Text style={styles.rewardText}>{challenge.reward}</Text>
                  </View>
                  
                  <View style={styles.challengeActions}>
                    {challenge.isJoined ? (
                      <TouchableOpacity 
                        style={styles.leaveButton}
                        onPress={() => handleLeaveChallenge(challenge.id)}
                      >
                        <Text style={styles.leaveButtonText}>ПОКИНУТЬ</Text>
                      </TouchableOpacity>
                    ) : (
                      <Button
                        title="ПРИСОЕДИНИТЬСЯ"
                        onPress={() => handleJoinChallenge(challenge.id)}
                        size="small"
                        style={styles.joinButton}
                      />
                    )}
                  </View>
                </View>
              );
            })}
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
  createButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.accentColors.tertiary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  typeSelectorContainer: {
    marginBottom: 20,
  },
  typeSelector: {
    gap: 8,
    paddingHorizontal: 4,
  },
  typeButton: {
    backgroundColor: Colors.background.secondary,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: Colors.border.primary,
  },
  typeButtonActive: {
    backgroundColor: Colors.accentColors.primary,
    borderColor: Colors.accentColors.primary,
  },
  typeText: {
    ...Typography.sizes.caption,
    color: Colors.text.secondary,
  },
  typeTextActive: {
    color: '#000',
    fontFamily: Typography.weights.semiBold,
  },
  summary: {
    flexDirection: 'row',
    backgroundColor: Colors.background.secondary,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.border.primary,
    gap: 20,
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryLabel: {
    ...Typography.sizes.micro,
    color: Colors.text.tertiary,
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 4,
  },
  summaryValue: {
    ...Typography.sizes.button,
    color: Colors.accentColors.primary,
  },
  challengesList: {
    flex: 1,
  },
  challengeCard: {
    backgroundColor: Colors.background.secondary,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border.primary,
  },
  challengeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  challengeTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  challengeType: {
    ...Typography.sizes.caption,
    color: Colors.accentColors.primary,
  },
  difficultyBadge: {
    borderRadius: 8,
    paddingVertical: 2,
    paddingHorizontal: 8,
  },
  difficultyText: {
    ...Typography.sizes.micro,
    fontFamily: Typography.weights.semiBold,
  },
  challengeTitle: {
    ...Typography.sizes.button,
    color: Colors.text.primary,
    marginBottom: 4,
  },
  challengeDescription: {
    ...Typography.sizes.bodySmall,
    color: Colors.text.secondary,
    marginBottom: 12,
    lineHeight: 16,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
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
  challengeInfo: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  infoText: {
    ...Typography.sizes.caption,
    color: Colors.text.tertiary,
  },
  rewardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
  },
  rewardText: {
    ...Typography.sizes.bodySmall,
    color: Colors.accentColors.primary,
    fontFamily: Typography.weights.semiBold,
  },
  challengeActions: {
    alignItems: 'flex-end',
  },
  joinButton: {
    paddingHorizontal: 20,
  },
  leaveButton: {
    backgroundColor: Colors.background.tertiary,
    borderWidth: 1,
    borderColor: Colors.border.secondary,
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  leaveButtonText: {
    ...Typography.sizes.caption,
    color: Colors.text.tertiary,
  },
});