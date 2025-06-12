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
  { id: 1, title: 'ПЕРВЫЙ ЦИКЛ', description: 'Завершил первый цикл Noowing', earned: true },
  { id: 2, title: 'НЕДЕЛЯ СИЛЫ', description: '7 дней подряд Noowing', earned: true },
  { id: 3, title: 'МЕСЯЦ РИТМА', description: '30 дней Noowing', earned: false },
  { id: 4, title: 'ЭНЕРГЕТИЧЕСКИЙ ВОИН', description: '100 активаций', earned: true },
  { id: 5, title: 'МАСТЕР КОНЦЕНТРАЦИИ', description: '500 циклов работы', earned: false },
];

export default function StatsTab() {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('week');

  const statCards: StatCard[] = [
    {
      title: 'ВСЕГО ЦИКЛОВ',
      value: '156',
      subtitle: '+12 НА ЭТОЙ НЕДЕЛЕ',
      icon: Brain,
      color: '#FF6B35',
      gradient: ['#FF6B35', '#E55A2B'],
      onPress: () => Alert.alert('Циклы работы', 'Вы завершили 156 циклов глубокой работы! Каждый цикл длится 45 минут.')
    },
    {
      title: 'ВРЕМЯ АКТИВНОСТИ',
      value: '5Ч 12М',
      subtitle: 'СЕГОДНЯ',
      icon: Clock,
      color: '#FF6B35',
      gradient: ['#FF6B35', '#E55A2B'],
      onPress: () => Alert.alert('Время активности', 'Сегодня вы потратили 5 часов 12 минут на активные упражнения!')
    },
    {
      title: 'АКТИВАЦИЙ',
      value: '312',
      subtitle: 'ВСЕГО ВЫПОЛНЕНО',
      icon: Activity,
      color: '#FF6B35',
      gradient: ['#FF6B35', '#E55A2B'],
      onPress: () => Alert.alert('Физические активации', 'Вы выполнили 312 двухминутных активаций! Отличная работа!')
    },
    {
      title: 'ТЕКУЩАЯ СЕРИЯ',
      value: '7 ДНЕЙ',
      subtitle: 'ЛУЧШАЯ: 14 ДНЕЙ',
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
                <Text style={styles.subtitle}>ТВОЙ ПРОГРЕСС В NOOWING</Text>
              </View>
              <TouchableOpacity style={styles.shareButton} onPress={shareStats}>
                <Share2 size={16} color="#FF6B35" strokeWidth={1.5} />
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
                      <stat.icon size={16} color="#FF6B35" strokeWidth={1.5} />
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
                <BarChart3 size={16} color="#FF6B35" strokeWidth={1.5} />
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
                    <Brain size={16} color="#FF6B35" strokeWidth={1.5} />
                  </View>
                  <View style={styles.phaseInfo}>
                    <Text style={styles.phaseLabel}>РАБОТА</Text>
                    <Text style={styles.phaseValue}>117 ЧАСОВ</Text>
                  </View>
                  <Text style={styles.phasePercentage}>75%</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.phaseStat}
                  onPress={() => Alert.alert('Активация', 'Вы потратили 10.4 часа на физические активации (7% времени)')}
                >
                  <View style={styles.phaseIcon}>
                    <Activity size={16} color="#FF6B35" strokeWidth={1.5} />
                  </View>
                  <View style={styles.phaseInfo}>
                    <Text style={styles.phaseLabel}>АКТИВАЦИЯ</Text>
                    <Text style={styles.phaseValue}>10.4 ЧАСА</Text>
                  </View>
                  <Text style={styles.phasePercentage}>7%</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.phaseStat}
                  onPress={() => Alert.alert('Отдых', 'Вы потратили 26 часов на восстановление (18% времени)')}
                >
                  <View style={styles.phaseIcon}>
                    <Coffee size={16} color="#FF6B35" strokeWidth={1.5} />
                  </View>
                  <View style={styles.phaseInfo}>
                    <Text style={styles.phaseLabel}>ОТДЫХ</Text>
                    <Text style={styles.phaseValue}>26 ЧАСОВ</Text>
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
                        size={16} 
                        color={achievement.earned ? '#FF6B35' : 'rgba(255,255,255,0.2)'} 
                        strokeWidth={1.5} 
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
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 100,
  },
  header: {
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    letterSpacing: 3,
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 10,
    fontFamily: 'Inter-Medium',
    color: 'rgba(255, 255, 255, 0.5)',
    letterSpacing: 1.5,
  },
  shareButton: {
    padding: 12,
    backgroundColor: 'rgba(255, 107, 53, 0.08)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 53, 0.15)',
  },
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderRadius: 20,
    padding: 3,
    marginBottom: 16,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 16,
  },
  periodButtonActive: {
    backgroundColor: '#FF6B35',
  },
  periodText: {
    fontSize: 9,
    fontFamily: 'Inter-SemiBold',
    color: 'rgba(255, 255, 255, 0.6)',
    letterSpacing: 1.5,
  },
  periodTextActive: {
    color: '#000',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 16,
  },
  statCard: {
    width: (width - 46) / 2,
    borderRadius: 16,
    overflow: 'hidden',
  },
  statCardContent: {
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
  },
  statCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statCardTitle: {
    fontSize: 8,
    fontFamily: 'Inter-Medium',
    color: 'rgba(255, 255, 255, 0.6)',
    marginLeft: 6,
    flex: 1,
    letterSpacing: 1,
  },
  statCardValue: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 2,
    letterSpacing: 0.5,
  },
  statCardSubtitle: {
    fontSize: 8,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.4)',
    letterSpacing: 0.5,
  },
  chartContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  chartTitle: {
    fontSize: 11,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    letterSpacing: 1.5,
  },
  chart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 80,
  },
  chartBar: {
    alignItems: 'center',
    flex: 1,
  },
  barContainer: {
    height: 60,
    width: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 8,
    justifyContent: 'flex-end',
    marginBottom: 6,
  },
  bar: {
    width: '100%',
    borderRadius: 8,
    minHeight: 3,
  },
  barLabel: {
    fontSize: 8,
    fontFamily: 'Inter-SemiBold',
    color: 'rgba(255, 255, 255, 0.6)',
    marginBottom: 2,
    letterSpacing: 0.5,
  },
  barValue: {
    fontSize: 11,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  phaseContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  phaseTitle: {
    fontSize: 11,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    letterSpacing: 1.5,
    marginBottom: 12,
  },
  phaseStats: {
    gap: 12,
  },
  phaseStat: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  phaseIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 107, 53, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  phaseInfo: {
    flex: 1,
  },
  phaseLabel: {
    fontSize: 9,
    fontFamily: 'Inter-Medium',
    color: 'rgba(255, 255, 255, 0.6)',
    marginBottom: 1,
    letterSpacing: 1,
  },
  phaseValue: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  phasePercentage: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: '#FF6B35',
  },
  achievementsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  achievementsTitle: {
    fontSize: 11,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    letterSpacing: 1.5,
    marginBottom: 12,
  },
  achievementsList: {
    gap: 8,
  },
  achievementCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  achievementCardLocked: {
    opacity: 0.4,
  },
  achievementIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 107, 53, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 11,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginBottom: 2,
    letterSpacing: 1,
  },
  achievementTitleLocked: {
    color: 'rgba(255, 255, 255, 0.4)',
  },
  achievementDescription: {
    fontSize: 9,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.6)',
  },
  achievementDescriptionLocked: {
    color: 'rgba(255, 255, 255, 0.3)',
  },
  achievementBadge: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#FF6B35',
    alignItems: 'center',
    justifyContent: 'center',
  },
  achievementBadgeText: {
    fontSize: 10,
    fontFamily: 'Inter-Bold',
    color: '#000',
  },
});