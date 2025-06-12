import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Settings, Clock, Bell, Moon, Globe, Activity, Brain, ChevronRight, CreditCard as Edit3, LogOut, CircleHelp as HelpCircle, Share2 } from 'lucide-react-native';

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
      subtitle: 'Напоминания о циклах',
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
      subtitle: 'Автоматически',
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
      id: 'help',
      title: 'ПОМОЩЬ И ПОДДЕРЖКА',
      subtitle: 'FAQ, контакты',
      icon: HelpCircle,
      type: 'navigation',
      onPress: () => Alert.alert('Помощь', 'Здесь вы найдете ответы на часто задаваемые вопросы и сможете связаться с поддержкой'),
    },
    {
      id: 'share',
      title: 'ПОДЕЛИТЬСЯ ПРИЛОЖЕНИЕМ',
      subtitle: 'Расскажи друзьям о Noowing',
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
        <setting.icon size={20} color="#FF6B35" strokeWidth={1.5} />
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
          trackColor={{ false: 'rgba(255,255,255,0.1)', true: '#FF6B35' }}
          thumbColor={setting.value ? '#FFFFFF' : '#FFFFFF'}
        />
      ) : (
        <ChevronRight size={20} color="rgba(255,255,255,0.3)" strokeWidth={1.5} />
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
                <Edit3 size={20} color="#FF6B35" strokeWidth={1.5} />
              </TouchableOpacity>
            </View>

            {/* User Card */}
            <TouchableOpacity style={styles.userCard} onPress={showUserStats}>
              <LinearGradient
                colors={['rgba(255, 107, 53, 0.08)', 'rgba(255, 107, 53, 0.03)']}
                style={styles.userCardGradient}
              >
                <View style={styles.userAvatar}>
                  <Brain size={32} color="#FF6B35" strokeWidth={1.5} />
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
              <LogOut size={20} color="#EF4444" strokeWidth={1.5} />
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
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 36,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    letterSpacing: 4,
  },
  editButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 107, 53, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 53, 0.2)',
  },
  userCard: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 24,
  },
  userCardGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 53, 0.15)',
    borderRadius: 20,
  },
  userAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255, 107, 53, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginBottom: 4,
    letterSpacing: 1,
  },
  userAge: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.6)',
    letterSpacing: 1,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 20,
    padding: 24,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#FF6B35',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 10,
    fontFamily: 'Inter-Medium',
    color: 'rgba(255, 255, 255, 0.5)',
    textAlign: 'center',
    letterSpacing: 1,
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    marginHorizontal: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    letterSpacing: 2,
    marginBottom: 16,
  },
  settingsList: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  settingIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 107, 53, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
    marginBottom: 2,
    letterSpacing: 0.5,
  },
  settingSubtitle: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.5)',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(239, 68, 68, 0.08)',
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.2)',
  },
  logoutText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#EF4444',
    marginLeft: 8,
    letterSpacing: 1,
  },
  versionText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.3)',
    textAlign: 'center',
    letterSpacing: 1,
  },
});