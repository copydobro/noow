import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowRight, ArrowLeft, CircleCheck as CheckCircle, CreditCard as Edit3, Clock, Globe, Activity, User } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const getUserData = () => {
  if (typeof window !== 'undefined') {
    return {
      ageRange: localStorage.getItem('userAgeRange') || '26-35',
      ageRangeLabel: localStorage.getItem('userAgeRangeLabel') || 'Технологические воины',
      activityLevel: localStorage.getItem('userActivityLevel') || 'intermediate',
      activityLevelLabel: localStorage.getItem('userActivityLevelLabel') || 'Средний (11-20 приседаний)',
      workStartTime: localStorage.getItem('userWorkStartTime') || '09:00',
      workEndTime: localStorage.getItem('userWorkEndTime') || '17:00',
      timezone: localStorage.getItem('userTimezone') || 'Europe/Moscow (UTC+3)',
    };
  }
  
  return {
    ageRange: '26-35',
    ageRangeLabel: 'Технологические воины',
    activityLevel: 'intermediate',
    activityLevelLabel: 'Средний (11-20 приседаний)',
    workStartTime: '09:00',
    workEndTime: '17:00',
    timezone: 'Europe/Moscow (UTC+3)',
  };
};

export default function OnboardingStep6() {
  const [userData, setUserData] = useState(getUserData());

  const handleEditProfile = () => {
    Alert.alert(
      'Редактировать профиль',
      'Выберите что хотите изменить:',
      [
        { 
          text: 'Возраст', 
          onPress: () => {
            Alert.alert(
              'Изменить возраст',
              'Выберите новый возрастной диапазон:',
              [
                { text: '18-25', onPress: () => updateUserData('ageRange', '18-25', 'Цифровые аборигены') },
                { text: '26-35', onPress: () => updateUserData('ageRange', '26-35', 'Технологические воины') },
                { text: '36-45', onPress: () => updateUserData('ageRange', '36-45', 'Цифровые лидеры') },
                { text: '46+', onPress: () => updateUserData('ageRange', '46+', 'Технологические пионеры') },
                { text: 'Отмена', style: 'cancel' }
              ]
            );
          }
        },
        { 
          text: 'Активность', 
          onPress: () => {
            Alert.alert(
              'Изменить уровень активности',
              'Выберите новый уровень:',
              [
                { text: 'Начинающий', onPress: () => updateUserData('activityLevel', 'beginner', 'Начинающий (0-10 приседаний)') },
                { text: 'Средний', onPress: () => updateUserData('activityLevel', 'intermediate', 'Средний (11-20 приседаний)') },
                { text: 'Продвинутый', onPress: () => updateUserData('activityLevel', 'advanced', 'Продвинутый (21+ приседаний)') },
                { text: 'Отмена', style: 'cancel' }
              ]
            );
          }
        },
        { text: 'Отмена', style: 'cancel' }
      ]
    );
  };

  const handleEditSchedule = () => {
    Alert.alert(
      'Редактировать расписание',
      'Выберите что хотите изменить:',
      [
        { 
          text: 'Рабочие часы', 
          onPress: () => {
            Alert.alert(
              'Изменить рабочие часы',
              'Выберите новое время:',
              [
                { text: '08:00 - 16:00', onPress: () => updateWorkHours('08:00', '16:00') },
                { text: '09:00 - 17:00', onPress: () => updateWorkHours('09:00', '17:00') },
                { text: '10:00 - 18:00', onPress: () => updateWorkHours('10:00', '18:00') },
                { text: '11:00 - 19:00', onPress: () => updateWorkHours('11:00', '19:00') },
                { text: 'Отмена', style: 'cancel' }
              ]
            );
          }
        },
        { 
          text: 'Часовой пояс', 
          onPress: () => {
            Alert.alert(
              'Изменить часовой пояс',
              'Выберите новый часовой пояс:',
              [
                { text: 'UTC+3 (Москва)', onPress: () => updateUserData('timezone', 'Europe/Moscow (UTC+3)', null) },
                { text: 'UTC+2 (Киев)', onPress: () => updateUserData('timezone', 'Europe/Kiev (UTC+2)', null) },
                { text: 'UTC+1 (Берлин)', onPress: () => updateUserData('timezone', 'Europe/Berlin (UTC+1)', null) },
                { text: 'UTC+0 (Лондон)', onPress: () => updateUserData('timezone', 'Europe/London (UTC+0)', null) },
                { text: 'Отмена', style: 'cancel' }
              ]
            );
          }
        },
        { text: 'Отмена', style: 'cancel' }
      ]
    );
  };

  const updateUserData = (field: string, value: string, label: string | null) => {
    const newData = { ...userData };
    
    if (field === 'ageRange') {
      newData.ageRange = value;
      newData.ageRangeLabel = label || '';
    } else if (field === 'activityLevel') {
      newData.activityLevel = value;
      newData.activityLevelLabel = label || '';
    } else if (field === 'timezone') {
      newData.timezone = value;
    }
    
    setUserData(newData);
    
    if (typeof window !== 'undefined') {
      if (field === 'ageRange') {
        localStorage.setItem('userAgeRange', value);
        localStorage.setItem('userAgeRangeLabel', label || '');
      } else if (field === 'activityLevel') {
        localStorage.setItem('userActivityLevel', value);
        localStorage.setItem('userActivityLevelLabel', label || '');
      } else if (field === 'timezone') {
        localStorage.setItem('userTimezone', value);
      }
    }
    
    Alert.alert('Успешно!', 'Настройки обновлены');
  };

  const updateWorkHours = (startTime: string, endTime: string) => {
    const newData = { 
      ...userData, 
      workStartTime: startTime, 
      workEndTime: endTime 
    };
    setUserData(newData);
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('userWorkStartTime', startTime);
      localStorage.setItem('userWorkEndTime', endTime);
    }
    
    Alert.alert('Успешно!', `Рабочие часы изменены на ${startTime} - ${endTime}`);
  };

  const handleComplete = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('onboardingCompleted', 'true');
    }
    
    router.replace('/(tabs)');
  };

  const resetOnboarding = () => {
    Alert.alert(
      'Сбросить настройки',
      'Вы уверены, что хотите начать настройку заново?',
      [
        { text: 'Отмена', style: 'cancel' },
        { 
          text: 'Сбросить', 
          style: 'destructive',
          onPress: () => {
            if (typeof window !== 'undefined') {
              localStorage.clear();
            }
            router.replace('/onboarding');
          }
        }
      ]
    );
  };

  return (
    <LinearGradient
      colors={['#0A0A0A', '#1A1A1A', '#2A2A2A']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <ArrowLeft size={18} color="#FFFFFF" strokeWidth={1.5} />
            </TouchableOpacity>
            
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: '100%' }]} />
              </View>
              <Text style={styles.progressText}>ШАГ 6 ИЗ 6</Text>
            </View>

            <TouchableOpacity 
              style={styles.resetButton}
              onPress={resetOnboarding}
            >
              <Text style={styles.resetButtonText}>СБРОС</Text>
            </TouchableOpacity>
          </View>

          {/* Main content */}
          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            <View style={styles.mainContent}>
              <View style={styles.iconContainer}>
                <CheckCircle size={28} color="#FF6B35" strokeWidth={1.5} />
              </View>

              <Text style={styles.title}>НАСТРОЙКА NOOWING{'\n'}ЗАВЕРШЕНА</Text>

              {/* Profile Section */}
              <View style={styles.sectionContainer}>
                <View style={styles.sectionHeader}>
                  <View style={styles.sectionTitleContainer}>
                    <User size={14} color="#FF6B35" strokeWidth={1.5} />
                    <Text style={styles.sectionTitle}>ТВОЙ ПРОФИЛЬ</Text>
                  </View>
                  <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
                    <Edit3 size={10} color="#FF6B35" strokeWidth={1.5} />
                    <Text style={styles.editButtonText}>РЕДАКТИРОВАТЬ</Text>
                  </TouchableOpacity>
                </View>
                
                <View style={styles.profileItem}>
                  <Text style={styles.profileLabel}>ВОЗРАСТНОЙ ДИАПАЗОН:</Text>
                  <Text style={styles.profileValue}>{userData.ageRange} ({userData.ageRangeLabel})</Text>
                </View>
                
                <View style={styles.profileItem}>
                  <Text style={styles.profileLabel}>УРОВЕНЬ АКТИВНОСТИ:</Text>
                  <Text style={styles.profileValue}>{userData.activityLevelLabel}</Text>
                </View>
              </View>

              {/* Schedule Section */}
              <View style={styles.sectionContainer}>
                <View style={styles.sectionHeader}>
                  <View style={styles.sectionTitleContainer}>
                    <Clock size={14} color="#FF6B35" strokeWidth={1.5} />
                    <Text style={styles.sectionTitle}>РАСПИСАНИЕ</Text>
                  </View>
                  <TouchableOpacity style={styles.editButton} onPress={handleEditSchedule}>
                    <Edit3 size={10} color="#FF6B35" strokeWidth={1.5} />
                    <Text style={styles.editButtonText}>РЕДАКТИРОВАТЬ</Text>
                  </TouchableOpacity>
                </View>
                
                <View style={styles.profileItem}>
                  <Text style={styles.profileLabel}>РАБОЧИЕ ЧАСЫ:</Text>
                  <Text style={styles.profileValue}>{userData.workStartTime} - {userData.workEndTime}</Text>
                </View>
                
                <View style={styles.profileItem}>
                  <Text style={styles.profileLabel}>ЧАСОВОЙ ПОЯС:</Text>
                  <Text style={styles.profileValue}>{userData.timezone}</Text>
                </View>
              </View>

              {/* Cycle Explanation */}
              <View style={styles.cycleContainer}>
                <Text style={styles.cycleTitle}>ТВОЙ ПЕРСОНАЛЬНЫЙ{'\n'}ЦИКЛ 45-2-5:</Text>
                <View style={styles.cycleItem}>
                  <View style={[styles.cycleDot, { backgroundColor: '#FF6B35' }]} />
                  <Text style={styles.cycleText}>45 МИНУТ СОСРЕДОТОЧЕННОЙ РАБОТЫ</Text>
                </View>
                <View style={styles.cycleItem}>
                  <View style={[styles.cycleDot, { backgroundColor: '#FF6B35' }]} />
                  <Text style={styles.cycleText}>2 МИНУТЫ ФИЗИЧЕСКОЙ АКТИВАЦИИ ({userData.activityLevel.toUpperCase()})</Text>
                </View>
                <View style={styles.cycleItem}>
                  <View style={[styles.cycleDot, { backgroundColor: '#FF6B35' }]} />
                  <Text style={styles.cycleText}>5 МИНУТ ВОССТАНОВЛЕНИЯ</Text>
                </View>
              </View>

              <View style={styles.infoContainer}>
                <Text style={styles.infoTitle}>💡 ЧТО ДАЛЬШЕ?</Text>
                <Text style={styles.infoText}>
                  • ВСЕ НАСТРОЙКИ МОЖНО ИЗМЕНИТЬ В ПРОФИЛЕ{'\n'}
                  • ТАЙМЕР АВТОМАТИЧЕСКИ ПОДСТРОИТСЯ ПОД ВАШЕ РАСПИСАНИЕ{'\n'}
                  • УПРАЖНЕНИЯ АДАПТИРОВАНЫ ПОД ВАШ УРОВЕНЬ АКТИВНОСТИ{'\n'}
                  • НАЧНИТЕ С ОДНОГО ЦИКЛА И ПОСТЕПЕННО УВЕЛИЧИВАЙТЕ
                </Text>
              </View>

              <Text style={styles.editPrompt}>
                ГОТОВЫ НАЧАТЬ СВОЕ ПУТЕШЕСТВИЕ{'\n'}К ЛУЧШЕЙ ПРОДУКТИВНОСТИ? 🚀
              </Text>
            </View>
          </ScrollView>

          {/* Bottom section */}
          <View style={styles.bottomSection}>
            <TouchableOpacity 
              style={styles.continueButton}
              onPress={handleComplete}
            >
              <LinearGradient
                colors={['#FF6B35', '#E55A2B']}
                style={styles.buttonGradient}
              >
                <Text style={styles.buttonText}>НАЧАТЬ NOOWING</Text>
                <ArrowRight size={16} color="#000" strokeWidth={1.5} />
              </LinearGradient>
            </TouchableOpacity>
          </View>
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
    paddingTop: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  backButton: {
    padding: 8,
    marginRight: 16,
  },
  progressContainer: {
    flex: 1,
  },
  progressBar: {
    height: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 2,
    marginBottom: 6,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FF6B35',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.6)',
    fontFamily: 'Inter-Medium',
    letterSpacing: 1,
  },
  resetButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: 'rgba(239, 68, 68, 0.08)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.2)',
    marginLeft: 12,
  },
  resetButtonText: {
    fontSize: 8,
    fontFamily: 'Inter-Medium',
    color: '#EF4444',
    letterSpacing: 0.5,
  },
  scrollView: {
    flex: 1,
  },
  mainContent: {
    alignItems: 'center',
    paddingBottom: 16,
  },
  iconContainer: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: 'rgba(255, 107, 53, 0.08)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 53, 0.15)',
  },
  title: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
    letterSpacing: 1,
  },
  sectionContainer: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginLeft: 6,
    letterSpacing: 1,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: 'rgba(255, 107, 53, 0.08)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 53, 0.2)',
  },
  editButtonText: {
    fontSize: 6,
    fontFamily: 'Inter-Medium',
    color: '#FF6B35',
    marginLeft: 3,
    letterSpacing: 0.3,
  },
  profileItem: {
    marginBottom: 8,
  },
  profileLabel: {
    fontSize: 8,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.6)',
    marginBottom: 2,
    letterSpacing: 0.3,
  },
  profileValue: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    letterSpacing: 0.2,
  },
  cycleContainer: {
    width: '100%',
    backgroundColor: 'rgba(255, 107, 53, 0.05)',
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 53, 0.15)',
  },
  cycleTitle: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#FF6B35',
    marginBottom: 12,
    textAlign: 'center',
    letterSpacing: 1,
    lineHeight: 16,
  },
  cycleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  cycleDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginRight: 8,
  },
  cycleText: {
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 14,
    flex: 1,
    letterSpacing: 0.3,
  },
  infoContainer: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  infoTitle: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#FF6B35',
    marginBottom: 8,
    textAlign: 'center',
    letterSpacing: 1,
  },
  infoText: {
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.7)',
    lineHeight: 14,
    letterSpacing: 0.2,
  },
  editPrompt: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 16,
    letterSpacing: 0.3,
  },
  bottomSection: {
    paddingBottom: 16,
  },
  continueButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 24,
  },
  buttonText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#000',
    marginRight: 6,
    letterSpacing: 1,
  },
});