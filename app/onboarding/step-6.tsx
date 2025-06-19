import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Alert, Modal, Pressable, TextInput } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, CheckCircle, User, Award, Clock, Share2, LogOut, XCircle, Settings, Brain, ChevronRight, CreditCard as Edit3, CircleHelp as HelpCircle } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Card } from '../../components';

const { width } = Dimensions.get('window');

export default function OnboardingStep6() {
  const [userData, setUserData] = useState({
    ageRange: 'Не указано',
    ageRangeLabel: '',
    activityLevel: 'Не указано',
    activityLevelLabel: '',
    timezone: 'Не указано',
    workStartTime: 'Не указано',
    workEndTime: 'Не указано',
  });

  const fetchUserData = () => {
    if (typeof window !== 'undefined') {
      setUserData({
        ageRange: localStorage.getItem('userAgeRange') || 'Не указано',
        ageRangeLabel: localStorage.getItem('userAgeRangeLabel') || '',
        activityLevel: localStorage.getItem('userActivityLevel') || 'Не указано',
        activityLevelLabel: localStorage.getItem('userActivityLevelLabel') || '',
        timezone: localStorage.getItem('userTimezone') || 'Не указано',
        workStartTime: localStorage.getItem('userWorkStartTime') || 'Не указано',
        workEndTime: localStorage.getItem('userWorkEndTime') || 'Не указано',
      });
    }
  };

  React.useEffect(() => {
    fetchUserData();
  }, []);

  const [showSkipModal, setShowSkipModal] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);

  const handleEditProfile = () => {
    setShowEditProfileModal(true);
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

  const handleSkip = () => {
    setShowSkipModal(true);
  };

  const confirmSkip = () => {
    setShowSkipModal(false);
    router.replace('/(tabs)'); // Переход на главный экран
  };

  const cancelSkip = () => {
    setShowSkipModal(false);
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
    <View className="flex-1 bg-[#0A0A0A]">
      <SafeAreaView className="flex-1 px-8 pt-6">
        {/* Header */}
        <View className="w-full flex-row items-center justify-between mb-5">
          <TouchableOpacity 
            className="p-2 rounded-full"
            onPress={() => router.back()}
          >
            <ArrowLeft size={18} color="#FFFFFF" strokeWidth={1.5} />
          </TouchableOpacity>
          
          <View className="flex-row items-center ml-auto">
            <Text className="text-white/60 text-xs font-medium uppercase tracking-widest mr-4">ШАГ 6 ИЗ 6</Text>
            <TouchableOpacity onPress={handleSkip} className="p-2 rounded-full">
              <Text className="text-white/60 text-xs font-semibold uppercase tracking-widest">Пропустить</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            className="p-2 rounded-full ml-4"
            onPress={resetOnboarding}
          >
            <Text className="text-white/60 text-xs font-semibold uppercase tracking-widest">СБРОС</Text>
          </TouchableOpacity>
        </View>

        <View className="w-full mb-5"> {/* Прогресс-бар */}
          <View className="h-1 bg-white/10 rounded-sm mb-1.5">
            <View className="h-full bg-primary-500 rounded-sm" style={{ width: '100%' }} />
          </View>
        </View>

        {/* Main content */}
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <View className="items-center">
            <View className="mb-4 p-2.5 bg-primary-500/10 rounded-xl border border-primary-500/20">
              <CheckCircle size={28} color="#f97316" strokeWidth={1.5} />
            </View>

            <Text className="text-white text-lg font-bold text-center mb-6 leading-tight tracking-wide">НАСТРОЙКА NOOWING{'\n'}ЗАВЕРШЕНА</Text>

            {/* Profile Section */}
            <View className="w-full bg-secondary-900 rounded-3xl p-5 mb-5 border border-secondary-700 shadow-strong">
              <View className="flex-row items-center justify-between mb-4">
                <View className="flex-row items-center">
                  <User size={14} color="#f97316" strokeWidth={1.5} className="mr-2" />
                  <Text className="text-white text-sm font-semibold tracking-wider">ТВОЙ ПРОФИЛЬ</Text>
                </View>
                <TouchableOpacity className="flex-row items-center p-1 rounded-full" onPress={handleEditProfile}>
                  <Edit3 size={10} color="#f97316" strokeWidth={1.5} className="mr-1" />
                  <Text className="text-primary-500 text-xs font-semibold uppercase tracking-wider">РЕДАКТИРОВАТЬ</Text>
                </TouchableOpacity>
              </View>
              
              <View className="flex-row justify-between items-center mb-3">
                <Text className="text-secondary-300 text-xs font-semibold uppercase tracking-wider">ВОЗРАСТНОЙ ДИАПАЗОН:</Text>
                <Text className="text-white text-sm font-medium">{userData.ageRange} ({userData.ageRangeLabel})</Text>
              </View>
              <View className="flex-row justify-between items-center mb-3">
                <Text className="text-secondary-300 text-xs font-semibold uppercase tracking-wider">УРОВЕНЬ АКТИВНОСТИ:</Text>
                <Text className="text-white text-sm font-medium">{userData.activityLevel} ({userData.activityLevelLabel})</Text>
              </View>
              <View className="flex-row justify-between items-center mb-3">
                <Text className="text-secondary-300 text-xs font-semibold uppercase tracking-wider">ЧАСОВОЙ ПОЯС:</Text>
                <Text className="text-white text-sm font-medium">{userData.timezone}</Text>
              </View>
              <View className="flex-row justify-between items-center">
                <Text className="text-secondary-300 text-xs font-semibold uppercase tracking-wider">РАБОЧИЕ ЧАСЫ:</Text>
                <Text className="text-white text-sm font-medium">{userData.workStartTime} - {userData.workEndTime}</Text>
              </View>
            </View>

            {/* Actions Section */}
            <View className="w-full bg-secondary-900 rounded-3xl p-5 mb-6 border border-secondary-700 shadow-strong">
              <Text className="text-primary-500 text-sm font-semibold text-center mb-4 leading-tight tracking-wide">💡 ЧТО ДАЛЬШЕ?</Text>
              <Text className="text-white/70 text-xs leading-snug tracking-tight mb-4">
                • ВСЕ НАСТРОЙКИ МОЖНО ИЗМЕНИТЬ В ПРОФИЛЕ{'\n'}
                • ТАЙМЕР АВТОМАТИЧЕСКИ ПОДСТРОИТСЯ ПОД ВАШЕ РАСПИСАНИЕ{'\n'}
                • УПРАЖНЕНИЯ АДАПТИРОВАНЫ ПОД ВАШ УРОВЕНЬ АКТИВНОСТИ{'\n'}
                • НАЧНИТЕ С ОДНОГО ЦИКЛА И ПОСТЕПЕННО УВЕЛИЧИВАЙТЕ
              </Text>
              <Text className="text-white text-base font-semibold text-center leading-snug tracking-wide">
                ГОТОВЫ НАЧАТЬ СВОЕ ПУТЕШЕСТВИЕ{'\n'}К ЛУЧШЕЙ ПРОДУКТИВНОСТИ? 🚀
              </Text>
            </View>
          </View>
        </ScrollView>

        {/* Bottom section */}
        <View className="pb-4">
          <Button 
            title="НАЧАТЬ NOOWING"
            onPress={handleComplete}
            fullWidth
            size="lg"
            className="shadow-medium"
          />
        </View>
      </SafeAreaView>

      {/* Модальное окно Пропустить */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showSkipModal}
        onRequestClose={cancelSkip}
      >
        <Pressable className="flex-1 justify-center items-center bg-black/70 p-6" onPress={cancelSkip}>
          <Card variant="default" className="w-full max-w-sm p-6 bg-secondary-900 border border-secondary-700 rounded-3xl shadow-strong">
            <TouchableOpacity onPress={cancelSkip} className="absolute top-4 right-4 p-2">
              <XCircle size={24} color="#cbd5e1" />
            </TouchableOpacity>
            <Text className="text-white text-2xl font-bold mb-4 text-center">Пропустить онбординг?</Text>
            <Text className="text-secondary-300 text-base text-center mb-6">
              Пропуск онбординга может привести к непониманию основных функций приложения и потере ценных данных для персонализации.
            </Text>
            <Button
              title="Продолжить онбординг"
              onPress={cancelSkip}
              fullWidth
              className="mb-3"
            />
            <Button
              title="Пропустить все равно"
              onPress={confirmSkip}
              variant="ghost"
              fullWidth
            />
          </Card>
        </Pressable>
      </Modal>

      {/* Модальное окно для редактирования профиля */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showEditProfileModal}
        onRequestClose={() => setShowEditProfileModal(false)}
      >
        <Pressable className="flex-1 justify-center items-center bg-black/70 p-6" onPress={() => setShowEditProfileModal(false)}>
          <Card variant="default" className="w-full max-w-sm p-6 bg-secondary-900 border border-secondary-700 rounded-3xl shadow-strong">
            <TouchableOpacity onPress={() => setShowEditProfileModal(false)} className="absolute top-4 right-4 p-2">
              <XCircle size={24} color="#cbd5e1" />
            </TouchableOpacity>
            <Text className="text-white text-2xl font-bold mb-4 text-center">Редактировать Профиль</Text>
            
            <View className="mb-4">
              <Text className="text-secondary-300 text-base font-semibold mb-2">Возрастной Диапазон</Text>
              <TextInput
                className="w-full p-4 rounded-xl bg-secondary-800 text-white border border-secondary-700 focus:border-primary-500"
                placeholder="Например, 18-25"
                placeholderTextColor="#64748b"
                value={userData.ageRange}
                onChangeText={(text) => updateUserData('ageRange', text, null)}
              />
            </View>

            <View className="mb-4">
              <Text className="text-secondary-300 text-base font-semibold mb-2">Уровень Активности</Text>
              <TextInput
                className="w-full p-4 rounded-xl bg-secondary-800 text-white border border-secondary-700 focus:border-primary-500"
                placeholder="Например, Низкий"
                placeholderTextColor="#64748b"
                value={userData.activityLevel}
                onChangeText={(text) => updateUserData('activityLevel', text, null)}
              />
            </View>

            <View className="mb-4">
              <Text className="text-secondary-300 text-base font-semibold mb-2">Часовой Пояс</Text>
              <TextInput
                className="w-full p-4 rounded-xl bg-secondary-800 text-white border border-secondary-700 focus:border-primary-500"
                placeholder="Например, Europe/Moscow"
                placeholderTextColor="#64748b"
                value={userData.timezone}
                onChangeText={(text) => updateUserData('timezone', text, null)}
              />
            </View>

            <View className="mb-4">
              <Text className="text-secondary-300 text-base font-semibold mb-2">Начало Рабочих Часов</Text>
              <TextInput
                className="w-full p-4 rounded-xl bg-secondary-800 text-white border border-secondary-700 focus:border-primary-500"
                placeholder="Например, 09:00"
                placeholderTextColor="#64748b"
                value={userData.workStartTime}
                onChangeText={(text) => updateWorkHours(text, userData.workEndTime)}
              />
            </View>

            <View className="mb-6">
              <Text className="text-secondary-300 text-base font-semibold mb-2">Конец Рабочих Часов</Text>
              <TextInput
                className="w-full p-4 rounded-xl bg-secondary-800 text-white border border-secondary-700 focus:border-primary-500"
                placeholder="Например, 17:00"
                placeholderTextColor="#64748b"
                value={userData.workEndTime}
                onChangeText={(text) => updateWorkHours(userData.workStartTime, text)}
              />
            </View>
            
            <Button title="Сохранить" onPress={() => setShowEditProfileModal(false)} fullWidth />
          </Card>
        </Pressable>
      </Modal>
    </View>
  );
}