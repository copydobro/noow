import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Trophy, Medal, Award, Crown, Users, X, Calendar, TrendingUp } from 'lucide-react-native';
import { Colors, Typography } from '@/constants';

interface LeaderboardUser {
  id: string;
  name: string;
  avatar: string;
  score: number;
  cycles: number;
  streak: number;
  rank: number;
}

const leaderboardData: LeaderboardUser[] = [
  { id: '1', name: 'ТЕХНОЛОГИЧЕСКИЙ ВОИН', avatar: '🧠', score: 2450, cycles: 156, streak: 14, rank: 1 },
  { id: '2', name: 'МАСТЕР КОНЦЕНТРАЦИИ', avatar: '🎯', score: 2380, cycles: 142, streak: 12, rank: 2 },
  { id: '3', name: 'ЭНЕРГЕТИЧЕСКИЙ ГУРУ', avatar: '⚡', score: 2290, cycles: 138, streak: 10, rank: 3 },
  { id: '4', name: 'ФОКУС МАШИНА', avatar: '🔥', score: 2150, cycles: 129, streak: 8, rank: 4 },
  { id: '5', name: 'ПРОДУКТИВНЫЙ НИНДЗЯ', avatar: '🥷', score: 2080, cycles: 125, streak: 7, rank: 5 },
  { id: '6', name: 'КОГНИТИВНЫЙ АТЛЕТ', avatar: '🏃', score: 1950, cycles: 118, streak: 6, rank: 6 },
  { id: '7', name: 'МЕНТАЛЬНЫЙ ВОИН', avatar: '⚔️', score: 1890, cycles: 112, streak: 5, rank: 7 },
  { id: '8', name: 'МОЗГОВОЙ ШТУРМ', avatar: '🌪️', score: 1820, cycles: 108, streak: 4, rank: 8 },
];

const periods = [
  { key: 'week', label: 'НЕДЕЛЯ' },
  { key: 'month', label: 'МЕСЯЦ' },
  { key: 'all', label: 'ВСЕ ВРЕМЯ' },
];

export default function LeaderboardScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState<string>('week');

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown size={20} color="#FFD700" strokeWidth={1.5} />;
      case 2: return <Medal size={20} color="#C0C0C0" strokeWidth={1.5} />;
      case 3: return <Award size={20} color="#CD7F32" strokeWidth={1.5} />;
      default: return <Text style={styles.rankNumber}>{rank}</Text>;
    }
  };

  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 1: return styles.firstPlace;
      case 2: return styles.secondPlace;
      case 3: return styles.thirdPlace;
      default: return styles.defaultPlace;
    }
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
              <Text style={styles.title}>ЛИДЕРБОРД</Text>
              <Text style={styles.subtitle}>РЕЙТИНГ ПОЛЬЗОВАТЕЛЕЙ</Text>
            </View>
            
            <TouchableOpacity style={styles.challengesButton} onPress={() => router.push('/social/challenges' as any)}>
              <Users size={20} color={Colors.accentColors.primary} strokeWidth={1.5} />
            </TouchableOpacity>
          </View>

          {/* Period Selector */}
          <View style={styles.periodSelector}>
            {periods.map((period) => (
              <TouchableOpacity
                key={period.key}
                style={[
                  styles.periodButton,
                  selectedPeriod === period.key && styles.periodButtonActive
                ]}
                onPress={() => setSelectedPeriod(period.key)}
              >
                <Text style={[
                  styles.periodText,
                  selectedPeriod === period.key && styles.periodTextActive
                ]}>
                  {period.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Top 3 Podium */}
          <View style={styles.podium}>
            <View style={styles.podiumContainer}>
              {/* Second Place */}
              <View style={[styles.podiumPlace, styles.secondPodium]}>
                <Text style={styles.podiumAvatar}>{leaderboardData[1].avatar}</Text>
                <Text style={styles.podiumName}>{leaderboardData[1].name}</Text>
                <Text style={styles.podiumScore}>{leaderboardData[1].score}</Text>
                <View style={styles.podiumRank}>
                  <Medal size={16} color="#C0C0C0" strokeWidth={1.5} />
                </View>
              </View>

              {/* First Place */}
              <View style={[styles.podiumPlace, styles.firstPodium]}>
                <Text style={styles.podiumAvatar}>{leaderboardData[0].avatar}</Text>
                <Text style={styles.podiumName}>{leaderboardData[0].name}</Text>
                <Text style={styles.podiumScore}>{leaderboardData[0].score}</Text>
                <View style={styles.podiumRank}>
                  <Crown size={16} color="#FFD700" strokeWidth={1.5} />
                </View>
              </View>

              {/* Third Place */}
              <View style={[styles.podiumPlace, styles.thirdPodium]}>
                <Text style={styles.podiumAvatar}>{leaderboardData[2].avatar}</Text>
                <Text style={styles.podiumName}>{leaderboardData[2].name}</Text>
                <Text style={styles.podiumScore}>{leaderboardData[2].score}</Text>
                <View style={styles.podiumRank}>
                  <Award size={16} color="#CD7F32" strokeWidth={1.5} />
                </View>
              </View>
            </View>
          </View>

          {/* Stats Overview */}
          <View style={styles.statsOverview}>
            <View style={styles.statItem}>
              <Calendar size={16} color={Colors.accentColors.primary} strokeWidth={1.5} />
              <Text style={styles.statLabel}>АКТИВНЫХ ПОЛЬЗОВАТЕЛЕЙ</Text>
              <Text style={styles.statValue}>1,247</Text>
            </View>
            <View style={styles.statItem}>
              <TrendingUp size={16} color={Colors.accentColors.primary} strokeWidth={1.5} />
              <Text style={styles.statLabel}>СРЕДНИЙ РОСТ</Text>
              <Text style={styles.statValue}>+15%</Text>
            </View>
          </View>

          {/* Leaderboard List */}
          <ScrollView style={styles.leaderboardList} showsVerticalScrollIndicator={false}>
            {leaderboardData.map((user) => (
              <View key={user.id} style={[styles.leaderboardItem, getRankStyle(user.rank)]}>
                <View style={styles.rankContainer}>
                  {getRankIcon(user.rank)}
                </View>
                
                <Text style={styles.userAvatar}>{user.avatar}</Text>
                
                <View style={styles.userInfo}>
                  <Text style={styles.userName}>{user.name}</Text>
                  <View style={styles.userStats}>
                    <Text style={styles.userStat}>{user.cycles} циклов</Text>
                    <Text style={styles.userStat}>•</Text>
                    <Text style={styles.userStat}>{user.streak} дней</Text>
                  </View>
                </View>
                
                <Text style={styles.userScore}>{user.score}</Text>
              </View>
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
  challengesButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.accentColors.tertiary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: Colors.background.secondary,
    borderRadius: 20,
    padding: 3,
    marginBottom: 24,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 16,
  },
  periodButtonActive: {
    backgroundColor: Colors.accentColors.primary,
  },
  periodText: {
    ...Typography.sizes.caption,
    color: Colors.text.tertiary,
  },
  periodTextActive: {
    color: '#000',
    fontFamily: Typography.weights.semiBold,
  },
  podium: {
    marginBottom: 24,
  },
  podiumContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: 8,
  },
  podiumPlace: {
    alignItems: 'center',
    backgroundColor: Colors.background.secondary,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.border.primary,
    minWidth: 100,
  },
  firstPodium: {
    borderColor: '#FFD700',
    backgroundColor: 'rgba(255, 215, 0, 0.08)',
    marginBottom: 0,
  },
  secondPodium: {
    borderColor: '#C0C0C0',
    backgroundColor: 'rgba(192, 192, 192, 0.08)',
    marginBottom: 12,
  },
  thirdPodium: {
    borderColor: '#CD7F32',
    backgroundColor: 'rgba(205, 127, 50, 0.08)',
    marginBottom: 24,
  },
  podiumAvatar: {
    fontSize: 24,
    marginBottom: 8,
  },
  podiumName: {
    ...Typography.sizes.caption,
    color: Colors.text.primary,
    textAlign: 'center',
    marginBottom: 4,
  },
  podiumScore: {
    ...Typography.sizes.button,
    color: Colors.accentColors.primary,
    marginBottom: 8,
  },
  podiumRank: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.background.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsOverview: {
    flexDirection: 'row',
    backgroundColor: Colors.background.secondary,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.border.primary,
    gap: 20,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statLabel: {
    ...Typography.sizes.micro,
    color: Colors.text.tertiary,
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 4,
  },
  statValue: {
    ...Typography.sizes.button,
    color: Colors.accentColors.primary,
  },
  leaderboardList: {
    flex: 1,
  },
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background.secondary,
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Colors.border.primary,
  },
  firstPlace: {
    borderColor: '#FFD700',
    backgroundColor: 'rgba(255, 215, 0, 0.05)',
  },
  secondPlace: {
    borderColor: '#C0C0C0',
    backgroundColor: 'rgba(192, 192, 192, 0.05)',
  },
  thirdPlace: {
    borderColor: '#CD7F32',
    backgroundColor: 'rgba(205, 127, 50, 0.05)',
  },
  defaultPlace: {
    // Uses default styles
  },
  rankContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.background.tertiary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  rankNumber: {
    ...Typography.sizes.button,
    color: Colors.text.primary,
  },
  userAvatar: {
    fontSize: 20,
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    ...Typography.sizes.bodySmall,
    color: Colors.text.primary,
    marginBottom: 2,
  },
  userStats: {
    flexDirection: 'row',
    gap: 4,
  },
  userStat: {
    ...Typography.sizes.micro,
    color: Colors.text.tertiary,
  },
  userScore: {
    ...Typography.sizes.button,
    color: Colors.accentColors.primary,
  },
}); 