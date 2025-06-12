import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowRight, ArrowLeft, CircleCheck as CheckCircle, CreditCard as Edit3, Clock, Globe, Activity, User } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Реальные данные пользователя (в реальном приложении это будет из AsyncStorage или контекста)
const getUserData = () => {
  // Здесь должны быть данные из предыдущих шагов
  // Пока используем localStorage для веб-версии
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
  
  // Fallback для мобильных платформ
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
    
    // Сохраняем в localStorage для веб-версии
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
    
    // Сохраняем в localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('userWorkStartTime', startTime);
      localStorage.setItem('userWorkEndTime', endTime);
    }
    
    Alert.alert('Успешно!', `Рабочие часы изменены на ${startTime} - ${endTime}`);
  };

  const handleComplete = () => {
    Alert.alert(
      'Добро пожаловать в Noowing! 🎉',
      'Ваш профиль настроен и готов к использованию. Начнем повышать продуктивность!',
      [
        { 
          text: 'Начать Noowing', 
          onPress: () => {
            // Сохраняем флаг завершения онбординга
            if (typeof window !== 'undefined') {
              localStorage.setItem('onboardingCompleted', 'true');
            }
            router.push('/(tabs)');
          }
        }
      ]
    );
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
            // Очищаем сохраненные данные
            if (typeof window !== 'undefined') {
              localStorage.clear();
            }
            router.push('/onboarding');
          }
        }
      ]
    );
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
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <ArrowLeft size={24} color="#FFFFFF" strokeWidth={2} />
            </TouchableOpacity>
            
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: '100%' }]} />
              </View>
              <Text style={styles.progressText}>Шаг 6 из 6</Text>
            </View>

            <TouchableOpacity 
              style={styles.resetButton}
              onPress={resetOnboarding}
            >
              <Text style={styles.resetButtonText}>Сброс</Text>
            </TouchableOpacity>
          </View>

          {/* Main content */}
          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            <View style={styles.mainContent}>
              <View style={styles.iconContainer}>
                <CheckCircle size={48} color="#4ADE80" strokeWidth={1.5} />
              </View>

              <Text style={styles.title}>Вот твоя настройка Noowing:</Text>

              {/* Profile Section */}
              <View style={styles.sectionContainer}>
                <View style={styles.sectionHeader}>
                  <View style={styles.sectionTitleContainer}>
                    <User size={20} color="#00D4FF" strokeWidth={2} />
                    <Text style={styles.sectionTitle}>Твой профиль</Text>
                  </View>
                  <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
                    <Edit3 size={16} color="#00D4FF" strokeWidth={2} />
                    <Text style={styles.editButtonText}>Редактировать</Text>
                  </TouchableOpacity>
                </View>
                
                <View style={styles.profileItem}>
                  <Text style={styles.profileLabel}>Возрастной диапазон:</Text>
                  <Text style={styles.profileValue}>{userData.ageRange} ({userData.ageRangeLabel})</Text>
                </View>
                
                <View style={styles.profileItem}>
                  <Text style={styles.profileLabel}>Уровень активности:</Text>
                  <Text style={styles.profileValue}>{userData.activityLevelLabel}</Text>
                </View>
              </View>

              {/* Schedule Section */}
              <View style={styles.sectionContainer}>
                <View style={styles.sectionHeader}>
                  <View style={styles.sectionTitleContainer}>
                    <Clock size={20} color="#00D4FF" strokeWidth={2} />
                    <Text style={styles.sectionTitle}>Расписание</Text>
                  </View>
                  <TouchableOpacity style={styles.editButton} onPress={handleEditSchedule}>
                    <Edit3 size={16} color="#00D4FF" strokeWidth={2} />
                    <Text style={styles.editButtonText}>Редактировать</Text>
                  </TouchableOpacity>
                </View>
                
                <View style={styles.profileItem}>
                  <Text style={styles.profileLabel}>Рабочие часы:</Text>
                  <Text style={styles.profileValue}>{userData.workStartTime} - {userData.workEndTime}</Text>
                </View>
                
                <View style={styles.profileItem}>
                  <Text style={styles.profileLabel}>Часовой пояс:</Text>
                  <Text style={styles.profileValue}>{userData.timezone}</Text>
                </View>
              </View>

              {/* Cycle Explanation */}
              <View style={styles.cycleContainer}>
                <Text style={styles.cycleTitle}>Твой персональный цикл 45-2-5:</Text>
                <View style={styles.cycleItem}>
                  <View style={[styles.cycleDot, { backgroundColor: '#4ADE80' }]} />
                  <Text style={styles.cycleText}>45 минут сосредоточенной работы</Text>
                </View>
                <View style={styles.cycleItem}>
                  <View style={[styles.cycleDot, { backgroundColor: '#FBBF24' }]} />
                  <Text style={styles.cycleText}>2 минуты физической активации ({userData.activityLevel})</Text>
                </View>
                <View style={styles.cycleItem}>
                  <View style={[styles.cycleDot, { backgroundColor: '#8B5CF6' }]} />
                  <Text style={styles.cycleText}>5 минут восстановления</Text>
                </View>
              </View>

              <View style={styles.infoContainer}>
                <Text style={styles.infoTitle}>💡 Что дальше?</Text>
                <Text style={styles.infoText}>
                  • Все настройки можно изменить в профиле{'\n'}
                  • Таймер автоматически подстроится под ваше расписание{'\n'}
                  • Упражнения адаптированы под ваш уровень активности{'\n'}
                  • Начните с одного цикла и постепенно увеличивайте
                </Text>
              </View>

              <Text style={styles.editPrompt}>
                Готовы начать свое путешествие к лучшей продуктивности? 🚀
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
                colors={['#4ADE80', '#22C55E']}
                style={styles.buttonGradient}
              >
                <Text style={styles.buttonText}>Начать Noowing</Text>
                <ArrowRight size={20} color="#000" strokeWidth={2} />
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
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  backButton: {
    padding: 8,
    marginRight: 16,
  },
  progressContainer: {
    flex: 1,
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 2,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4ADE80',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    fontFamily: 'Inter-Medium',
  },
  resetButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.3)',
    marginLeft: 16,
  },
  resetButtonText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#EF4444',
  },
  scrollView: {
    flex: 1,
  },
  mainContent: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  iconContainer: {
    marginBottom: 24,
    padding: 16,
    backgroundColor: 'rgba(74, 222, 128, 0.1)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(74, 222, 128, 0.2)',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 32,
  },
  sectionContainer: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(0, 212, 255, 0.1)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(0, 212, 255, 0.3)',
  },
  editButtonText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#00D4FF',
    marginLeft: 4,
  },
  profileItem: {
    marginBottom: 12,
  },
  profileLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 4,
  },
  profileValue: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  cycleContainer: {
    width: '100%',
    backgroundColor: 'rgba(0, 212, 255, 0.05)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(0, 212, 255, 0.2)',
  },
  cycleTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#00D4FF',
    marginBottom: 16,
    textAlign: 'center',
  },
  cycleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cycleDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
  },
  cycleText: {
    fontSize: 15,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 22,
    flex: 1,
  },
  infoContainer: {
    width: '100%',
    backgroundColor: 'rgba(74, 222, 128, 0.05)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(74, 222, 128, 0.2)',
  },
  infoTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#4ADE80',
    marginBottom: 12,
    textAlign: 'center',
  },
  infoText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 20,
  },
  editPrompt: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 24,
  },
  bottomSection: {
    paddingBottom: 20,
  },
  continueButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 32,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#000',
    marginRight: 8,
  },
});