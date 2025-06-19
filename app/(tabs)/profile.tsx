import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Settings, Clock, Bell, Moon, Globe, Activity, Brain, ChevronRight, CreditCard as Edit3, LogOut, CircleHelp as HelpCircle, Share2, TestTube, Award, Users, DollarSign } from 'lucide-react-native';
import { router } from 'expo-router';

interface ProfileSetting {
  id: string;
  title: string;
  subtitle?: string;
  icon: any;
  type: 'navigation' | 'toggle' | 'info';
  value?: boolean;
  onPress?: () => void;
  onToggle?: (value: boolean) => void;
}

export default function ProfileTab() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  const userStats = {
    name: 'ТЕХНОЛОГИЧЕСКИЙ ВОИН',
    ageRange: '26-35',
    level: 'СРЕДНИЙ',
    workHours: '09:00 - 17:00',
    timezone: 'UTC+3',
    totalCycles: 156,
    currentStreak: 7,
    bestStreak: 14,
  };

  const profileSettings: ProfileSetting[] = [
    {
      id: 'work-hours',
      title: 'РАБОЧИЕ ЧАСЫ',
      subtitle: userStats.workHours,
      icon: Clock,
      type: 'navigation',
      onPress: () => Alert.alert('Рабочие часы', 'Здесь вы можете изменить свои рабочие часы для оптимального планирования циклов Noowing'),
    },
    {
      id: 'activity-level',
      title: 'УРОВЕНЬ АКТИВНОСТИ',
      subtitle: userStats.level,
      icon: Activity,
      type: 'navigation',
      onPress: () => Alert.alert('Уровень активности', 'Настройте интенсивность физических упражнений под свой уровень подготовки'),
    },
    {
      id: 'timezone',
      title: 'ЧАСОВОЙ ПОЯС',
      subtitle: userStats.timezone,
      icon: Globe,
      type: 'navigation',
      onPress: () => Alert.alert('Часовой пояс', 'Установите правильный часовой пояс для синхронизации с вашим биологическим ритмом'),
    },
  ];

  const appSettings: ProfileSetting[] = [
    {
      id: 'notifications',
      title: 'УВЕДОМЛЕНИЯ',
      subtitle: 'НАПОМИНАНИЯ О ЦИКЛАХ',
      icon: Bell,
      type: 'toggle',
      value: notifications,
      onToggle: (value) => {
        setNotifications(value);
        Alert.alert('Уведомления', value ? 'Уведомления включены' : 'Уведомления отключены');
      },
    },
    {
      id: 'dark-mode',
      title: 'ТЕМНАЯ ТЕМА',
      subtitle: 'АВТОМАТИЧЕСКИ',
      icon: Moon,
      type: 'toggle',
      value: darkMode,
      onToggle: (value) => {
        setDarkMode(value);
        Alert.alert('Тема', value ? 'Темная тема включена' : 'Светлая тема включена');
      },
    },
  ];

  const otherSettings: ProfileSetting[] = [
    {
      id: 'cognitive-nback',
      title: 'КОГНИТИВНЫЙ ТЕСТ N-BACK',
      subtitle: 'ТЕСТИРОВАНИЕ РАБОЧЕЙ ПАМЯТИ',
      icon: Brain,
      type: 'navigation',
      onPress: () => router.push('/cognitive/nback' as any),
    },
    {
      id: 'cognitive-stroop',
      title: 'КОГНИТИВНЫЙ ТЕСТ STROOP',
      subtitle: 'ТЕСТИРОВАНИЕ ВНИМАНИЯ',
      icon: TestTube,
      type: 'navigation',
      onPress: () => router.push('/cognitive/stroop' as any),
    },
    {
      id: 'feedback',
      title: 'ОБРАТНАЯ СВЯЗЬ',
      subtitle: 'ПОДЕЛИТЬСЯ МНЕНИЕМ',
      icon: User,
      type: 'navigation',
      onPress: () => router.push('/feedback' as any),
    },
    {
      id: 'achievements',
      title: 'ДОСТИЖЕНИЯ',
      subtitle: 'ВАШИ НАГРАДЫ',
      icon: Award,
      type: 'navigation',
      onPress: () => router.push('/achievements' as any),
    },
    {
      id: 'social-leaderboard',
      title: 'СОЦИАЛЬНАЯ СЕТЬ - ЛИДЕРЫ',
      subtitle: 'СОРЕВНОВАНИЯ',
      icon: Users,
      type: 'navigation',
      onPress: () => router.push('/social/leaderboard' as any),
    },
    {
      id: 'donations',
      title: 'ПОДДЕРЖКА ПРОЕКТА',
      subtitle: 'ПОМОГИТЕ РАЗВИВАТЬ NOOW',
      icon: DollarSign,
      type: 'navigation',
      onPress: () => router.push('/donations' as any),
    },
    {
      id: 'help',
      title: 'ПОМОЩЬ И ПОДДЕРЖКА',
      subtitle: 'FAQ, КОНТАКТЫ',
      icon: HelpCircle,
      type: 'navigation',
      onPress: () => Alert.alert('Помощь', 'Здесь вы найдете ответы на часто задаваемые вопросы и сможете связаться с поддержкой'),
    },
    {
      id: 'share',
      title: 'ПОДЕЛИТЬСЯ ПРИЛОЖЕНИЕМ',
      subtitle: 'РАССКАЖИ ДРУЗЬЯМ О NOOWING',
      icon: Share2,
      type: 'navigation',
      onPress: () => Alert.alert('Поделиться', 'Расскажите друзьям о Noowing и помогите им улучшить свою продуктивность!'),
    },
  ];

  const showUserStats = () => {
    Alert.alert(
      'Статистика пользователя',
      `Всего циклов: ${userStats.totalCycles}\nТекущая серия: ${userStats.currentStreak} дней\nЛучшая серия: ${userStats.bestStreak} дней`
    );
  };

  const handleLogout = () => {
    Alert.alert(
      'Выйти из аккаунта',
      'Вы уверены, что хотите выйти? Ваш прогресс будет сохранен.',
      [
        { text: 'Отмена', style: 'cancel' },
        { text: 'Выйти', style: 'destructive', onPress: () => Alert.alert('Выход', 'Вы вышли из аккаунта') }
      ]
    );
  };

  const renderSetting = (setting: ProfileSetting) => (
    <TouchableOpacity
      key={setting.id}
      style={styles.settingItem}
      onPress={setting.onPress}
      disabled={setting.type === 'toggle'}
    >
      <View style={styles.settingIcon}>
        <setting.icon size={16} color="#FF6B35" strokeWidth={1.5} />
      </View>
      
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{setting.title}</Text>
        {setting.subtitle && (
          <Text style={styles.settingSubtitle}>{setting.subtitle}</Text>
        )}
      </View>
      
      {setting.type === 'toggle' ? (
        <Switch
          value={setting.value}
          onValueChange={setting.onToggle}
          trackColor={{ false: 'rgba(255,255,255,0.08)', true: '#FF6B35' }}
          thumbColor={setting.value ? '#FFFFFF' : '#FFFFFF'}
        />
      ) : (
        <ChevronRight size={16} color="rgba(255,255,255,0.3)" strokeWidth={1.5} />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>ПРОФИЛЬ</Text>
              <TouchableOpacity 
                style={styles.editButton}
                onPress={() => Alert.alert('Редактировать', 'Здесь вы можете изменить информацию профиля')}
              >
                <Edit3 size={16} color="#FF6B35" strokeWidth={1.5} />
              </TouchableOpacity>
            </View>

            {/* User Card */}
            <TouchableOpacity style={styles.userCard} onPress={showUserStats}>
              <LinearGradient
                colors={['rgba(255, 107, 53, 0.08)', 'rgba(255, 107, 53, 0.03)']}
                style={styles.userCardGradient}
              >
                <View style={styles.userAvatar}>
                  <Brain size={24} color="#FF6B35" strokeWidth={1.5} />
                </View>
                
                <View style={styles.userInfo}>
                  <Text style={styles.userName}>{userStats.name}</Text>
                  <Text style={styles.userAge}>ВОЗРАСТ: {userStats.ageRange}</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>

            {/* Stats */}
            <TouchableOpacity style={styles.statsContainer} onPress={showUserStats}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{userStats.totalCycles}</Text>
                <Text style={styles.statLabel}>ВСЕГО ЦИКЛОВ</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{userStats.currentStreak}</Text>
                <Text style={styles.statLabel}>ТЕКУЩАЯ СЕРИЯ</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{userStats.bestStreak}</Text>
                <Text style={styles.statLabel}>ЛУЧШАЯ СЕРИЯ</Text>
              </View>
            </TouchableOpacity>

            {/* Profile Settings */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>НАСТРОЙКИ ПРОФИЛЯ</Text>
              <View style={styles.settingsList}>
                {profileSettings.map(renderSetting)}
              </View>
            </View>

            {/* App Settings */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>НАСТРОЙКИ ПРИЛОЖЕНИЯ</Text>
              <View style={styles.settingsList}>
                {appSettings.map(renderSetting)}
              </View>
            </View>

            {/* Other Settings */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>ПРОЧЕЕ</Text>
              <View style={styles.settingsList}>
                {otherSettings.map(renderSetting)}
              </View>
            </View>

            {/* Logout Button */}
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <LogOut size={16} color="#EF4444" strokeWidth={1.5} />
              <Text style={styles.logoutText}>ВЫЙТИ ИЗ АККАУНТА</Text>
            </TouchableOpacity>

            {/* App Version */}
            <Text style={styles.versionText}>NOOWING V1.0.0</Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    letterSpacing: 3,
  },
  editButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 107, 53, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 53, 0.15)',
  },
  userCard: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
  },
  userCardGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 53, 0.1)',
    borderRadius: 16,
  },
  userAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 107, 53, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginBottom: 2,
    letterSpacing: 0.5,
  },
  userAge: {
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.5)',
    letterSpacing: 1.5,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#FF6B35',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 8,
    fontFamily: 'Inter-Medium',
    color: 'rgba(255, 255, 255, 0.4)',
    textAlign: 'center',
    letterSpacing: 1,
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    marginHorizontal: 12,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 10,
    fontFamily: 'Inter-SemiBold',
    color: 'rgba(255, 255, 255, 0.6)',
    letterSpacing: 1.5,
    marginBottom: 12,
  },
  settingsList: {
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.03)',
  },
  settingIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 107, 53, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
    marginBottom: 1,
    letterSpacing: 0.5,
  },
  settingSubtitle: {
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.4)',
    letterSpacing: 0.5,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(239, 68, 68, 0.08)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.15)',
  },
  logoutText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#EF4444',
    marginLeft: 8,
    letterSpacing: 1,
  },
  versionText: {
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.3)',
    textAlign: 'center',
    letterSpacing: 1.5,
  },
});