import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar, TrendingUp, Award, Clock, Brain, Activity, Coffee, Share2, ChartBar as BarChart3 } from 'lucide-react-native';

const { width } = Dimensions.get('window');

interface StatCard {
  title: string;
  value: string;
  subtitle: string;
  icon: any;
  color: string;
  gradient: string[];
  onPress?: () => void;
}

interface WeekData {
  day: string;
  cycles: number;
  maxCycles: number;
}

const weekData: WeekData[] = [
  { day: 'ПН', cycles: 8, maxCycles: 12 },
  { day: 'ВТ', cycles: 6, maxCycles: 12 },
  { day: 'СР', cycles: 10, maxCycles: 12 },
  { day: 'ЧТ', cycles: 12, maxCycles: 12 },
  { day: 'ПТ', cycles: 9, maxCycles: 12 },
  { day: 'СБ', cycles: 4, maxCycles: 12 },
  { day: 'ВС', cycles: 7, maxCycles: 12 },
];

const achievements = [
  { id: 1, title: 'Первый цикл', description: 'Завершил первый цикл Noowing', earned: true },
  { id: 2, title: 'Неделя силы', description: '7 дней подряд Noowing', earned: true },
  { id: 3, title: 'Месяц ритма', description: '30 дней Noowing', earned: false },
  { id: 4, title: 'Энергетический воин', description: '100 активаций', earned: true },
  { id: 5, title: 'Мастер концентрации', description: '500 циклов работы', earned: false },
];

export default function StatsTab() {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('week');

  const statCards: StatCard[] = [
    {
      title: 'Всего циклов',
      value: '156',
      subtitle: '+12 на этой неделе',
      icon: Brain,
      color: '#FF6B35',
      gradient: ['#FF6B35', '#E55A2B'],
      onPress: () => Alert.alert('Циклы работы', 'Вы завершили 156 циклов глубокой работы! Каждый цикл длится 45 минут.')
    },
    {
      title: 'Время активности',
      value: '5ч 12м',
      subtitle: 'Сегодня',
      icon: Clock,
      color: '#FF6B35',
      gradient: ['#FF6B35', '#E55A2B'],
      onPress: () => Alert.alert('Время активности', 'Сегодня вы потратили 5 часов 12 минут на активные упражнения!')
    },
    {
      title: 'Активаций',
      value: '312',
      subtitle: 'Всего выполнено',
      icon: Activity,
      color: '#FF6B35',
      gradient: ['#FF6B35', '#E55A2B'],
      onPress: () => Alert.alert('Физические активации', 'Вы выполнили 312 двухминутных активаций! Отличная работа!')
    },
    {
      title: 'Текущая серия',
      value: '7 дней',
      subtitle: 'Лучшая: 14 дней',
      icon: TrendingUp,
      color: '#FF6B35',
      gradient: ['#FF6B35', '#E55A2B'],
      onPress: () => Alert.alert('Серия', 'Ваша текущая серия: 7 дней подряд! Лучший результат: 14 дней.')
    },
  ];

  const periods = [
    { key: 'week', label: 'НЕДЕЛЯ' },
    { key: 'month', label: 'МЕСЯЦ' },
    { key: 'year', label: 'ГОД' },
  ];

  const shareStats = () => {
    Alert.alert(
      'Поделиться статистикой',
      'Хотите поделиться своими достижениями в Noowing?',
      [
        { text: 'Отмена', style: 'cancel' },
        { text: 'Поделиться', onPress: () => Alert.alert('Успех!', 'Статистика отправлена!') }
      ]
    );
  };

  const showWeeklyChart = () => {
    const totalCycles = weekData.reduce((sum, day) => sum + day.cycles, 0);
    const avgCycles = Math.round(totalCycles / weekData.length);
    Alert.alert(
      'Недельная статистика',
      `Всего циклов за неделю: ${totalCycles}\nСреднее в день: ${avgCycles}\nЛучший день: Четверг (12 циклов)`
    );
  };

  const showAchievement = (achievement: typeof achievements[0]) => {
    Alert.alert(
      achievement.title,
      achievement.description + (achievement.earned ? '\n\n🏆 Достижение получено!' : '\n\n🔒 Достижение заблокировано'),
      [{ text: 'Понятно', style: 'default' }]
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            {/* Header */}
            <View style={styles.header}>
              <View>
                <Text style={styles.title}>СТАТИСТИКА</Text>
                <Text style={styles.subtitle}>Твой прогресс в Noowing</Text>
              </View>
              <TouchableOpacity style={styles.shareButton} onPress={shareStats}>
                <Share2 size={20} color="#FF6B35" strokeWidth={2} />
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
                  onPress={() => setSelectedPeriod(period.key as any)}
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

            {/* Stats Cards */}
            <View style={styles.statsGrid}>
              {statCards.map((stat, index) => (
                <TouchableOpacity 
                  key={index} 
                  style={styles.statCard}
                  onPress={stat.onPress}
                >
                  <View style={styles.statCardContent}>
                    <View style={styles.statCardHeader}>
                      <stat.icon size={24} color="#FF6B35" strokeWidth={2} />
                      <Text style={styles.statCardTitle}>{stat.title}</Text>
                    </View>
                    <Text style={styles.statCardValue}>{stat.value}</Text>
                    <Text style={styles.statCardSubtitle}>{stat.subtitle}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            {/* Weekly Chart */}
            <TouchableOpacity style={styles.chartContainer} onPress={showWeeklyChart}>
              <View style={styles.chartHeader}>
                <Text style={styles.chartTitle}>АКТИВНОСТЬ ЗА НЕДЕЛЮ</Text>
                <BarChart3 size={20} color="#FF6B35" strokeWidth={2} />
              </View>
              <View style={styles.chart}>
                {weekData.map((day, index) => (
                  <TouchableOpacity 
                    key={index} 
                    style={styles.chartBar}
                    onPress={() => Alert.alert(day.day, `Циклов: ${day.cycles} из ${day.maxCycles}`)}
                  >
                    <View style={styles.barContainer}>
                      <View 
                        style={[
                          styles.bar,
                          { 
                            height: `${(day.cycles / day.maxCycles) * 100}%`,
                            backgroundColor: day.cycles === day.maxCycles ? '#FF6B35' : 'rgba(255, 107, 53, 0.6)'
                          }
                        ]} 
                      />
                    </View>
                    <Text style={styles.barLabel}>{day.day}</Text>
                    <Text style={styles.barValue}>{day.cycles}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </TouchableOpacity>

            {/* Phase Distribution */}
            <View style={styles.phaseContainer}>
              <Text style={styles.phaseTitle}>РАСПРЕДЕЛЕНИЕ ВРЕМЕНИ</Text>
              <View style={styles.phaseStats}>
                <TouchableOpacity 
                  style={styles.phaseStat}
                  onPress={() => Alert.alert('Работа', 'Вы потратили 117 часов на глубокую работу (75% времени)')}
                >
                  <View style={styles.phaseIcon}>
                    <Brain size={20} color="#FF6B35" strokeWidth={2} />
                  </View>
                  <View style={styles.phaseInfo}>
                    <Text style={styles.phaseLabel}>Работа</Text>
                    <Text style={styles.phaseValue}>117 часов</Text>
                  </View>
                  <Text style={styles.phasePercentage}>75%</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.phaseStat}
                  onPress={() => Alert.alert('Активация', 'Вы потратили 10.4 часа на физические активации (7% времени)')}
                >
                  <View style={styles.phaseIcon}>
                    <Activity size={20} color="#FF6B35" strokeWidth={2} />
                  </View>
                  <View style={styles.phaseInfo}>
                    <Text style={styles.phaseLabel}>Активация</Text>
                    <Text style={styles.phaseValue}>10.4 часа</Text>
                  </View>
                  <Text style={styles.phasePercentage}>7%</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.phaseStat}
                  onPress={() => Alert.alert('Отдых', 'Вы потратили 26 часов на восстановление (18% времени)')}
                >
                  <View style={styles.phaseIcon}>
                    <Coffee size={20} color="#FF6B35" strokeWidth={2} />
                  </View>
                  <View style={styles.phaseInfo}>
                    <Text style={styles.phaseLabel}>Отдых</Text>
                    <Text style={styles.phaseValue}>26 часов</Text>
                  </View>
                  <Text style={styles.phasePercentage}>18%</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Achievements */}
            <View style={styles.achievementsContainer}>
              <Text style={styles.achievementsTitle}>ДОСТИЖЕНИЯ</Text>
              <View style={styles.achievementsList}>
                {achievements.map((achievement) => (
                  <TouchableOpacity 
                    key={achievement.id} 
                    style={[
                      styles.achievementCard,
                      !achievement.earned && styles.achievementCardLocked
                    ]}
                    onPress={() => showAchievement(achievement)}
                  >
                    <View style={styles.achievementIcon}>
                      <Award 
                        size={24} 
                        color={achievement.earned ? '#FF6B35' : 'rgba(255,255,255,0.3)'} 
                        strokeWidth={2} 
                      />
                    </View>
                    <View style={styles.achievementInfo}>
                      <Text style={[
                        styles.achievementTitle,
                        !achievement.earned && styles.achievementTitleLocked
                      ]}>
                        {achievement.title}
                      </Text>
                      <Text style={[
                        styles.achievementDescription,
                        !achievement.earned && styles.achievementDescriptionLocked
                      ]}>
                        {achievement.description}
                      </Text>
                    </View>
                    {achievement.earned && (
                      <View style={styles.achievementBadge}>
                        <Text style={styles.achievementBadgeText}>✓</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </ScrollView>
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
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 100,
  },
  header: {
    marginBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    letterSpacing: 2,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.6)',
  },
  shareButton: {
    padding: 12,
    backgroundColor: 'rgba(255, 107, 53, 0.1)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 53, 0.3)',
  },
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 4,
    marginBottom: 24,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
  },
  periodButtonActive: {
    backgroundColor: '#FF6B35',
  },
  periodText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: 'rgba(255, 255, 255, 0.7)',
    letterSpacing: 1,
  },
  periodTextActive: {
    color: '#000',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    width: (width - 60) / 2,
    borderRadius: 16,
    overflow: 'hidden',
  },
  statCardContent: {
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
  },
  statCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  statCardTitle: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: 'rgba(255, 255, 255, 0.8)',
    marginLeft: 8,
    flex: 1,
    letterSpacing: 0.5,
  },
  statCardValue: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  statCardSubtitle: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.6)',
  },
  chartContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  chartTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  chart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 120,
  },
  chartBar: {
    alignItems: 'center',
    flex: 1,
  },
  barContainer: {
    height: 80,
    width: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
  bar: {
    width: '100%',
    borderRadius: 10,
    minHeight: 4,
  },
  barLabel: {
    fontSize: 10,
    fontFamily: 'Inter-SemiBold',
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  barValue: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  phaseContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  phaseTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    letterSpacing: 1,
    marginBottom: 16,
  },
  phaseStats: {
    gap: 16,
  },
  phaseStat: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  phaseIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 107, 53, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  phaseInfo: {
    flex: 1,
  },
  phaseLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 2,
  },
  phaseValue: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  phasePercentage: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#FF6B35',
  },
  achievementsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  achievementsTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    letterSpacing: 1,
    marginBottom: 16,
  },
  achievementsList: {
    gap: 12,
  },
  achievementCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  achievementCardLocked: {
    opacity: 0.5,
  },
  achievementIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 107, 53, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  achievementTitleLocked: {
    color: 'rgba(255, 255, 255, 0.5)',
  },
  achievementDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.7)',
  },
  achievementDescriptionLocked: {
    color: 'rgba(255, 255, 255, 0.3)',
  },
  achievementBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FF6B35',
    alignItems: 'center',
    justifyContent: 'center',
  },
  achievementBadgeText: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: '#000',
  },
});