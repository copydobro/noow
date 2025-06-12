import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowRight, ArrowLeft, CircleCheck as CheckCircle, CreditCard as Edit3, Clock, Globe } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Mock data - in real app this would come from state/storage
const mockUserData = {
  ageRange: '26-35',
  ageRangeLabel: 'Технологические воины',
  activityLevel: 'intermediate',
  activityLevelLabel: 'Средний (11-20 приседаний)',
  workHours: '09:00 - 17:00',
  timezone: 'Europe/Moscow (UTC+3)',
};

export default function OnboardingStep6() {
  const handleComplete = () => {
    router.push('/(tabs)');
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
                  <Text style={styles.sectionTitle}>🧠 Твой профиль:</Text>
                  <TouchableOpacity style={styles.editButton}>
                    <Edit3 size={16} color="#00D4FF" strokeWidth={2} />
                    <Text style={styles.editButtonText}>Редактировать</Text>
                  </TouchableOpacity>
                </View>
                
                <View style={styles.profileItem}>
                  <Text style={styles.profileLabel}>Возрастной диапазон:</Text>
                  <Text style={styles.profileValue}>{mockUserData.ageRange} ({mockUserData.ageRangeLabel})</Text>
                </View>
                
                <View style={styles.profileItem}>
                  <Text style={styles.profileLabel}>Активность:</Text>
                  <Text style={styles.profileValue}>{mockUserData.activityLevelLabel}</Text>
                </View>
              </View>

              {/* Schedule Section */}
              <View style={styles.sectionContainer}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>⏰ Расписание:</Text>
                  <TouchableOpacity style={styles.editButton}>
                    <Clock size={16} color="#00D4FF" strokeWidth={2} />
                    <Text style={styles.editButtonText}>Редактировать</Text>
                  </TouchableOpacity>
                </View>
                
                <View style={styles.profileItem}>
                  <Text style={styles.profileLabel}>Рабочие часы:</Text>
                  <Text style={styles.profileValue}>{mockUserData.workHours}</Text>
                </View>
                
                <View style={styles.profileItem}>
                  <Text style={styles.profileLabel}>Часовой пояс:</Text>
                  <Text style={styles.profileValue}>{mockUserData.timezone}</Text>
                </View>
              </View>

              {/* Cycle Explanation */}
              <View style={styles.cycleContainer}>
                <Text style={styles.cycleTitle}>Твой цикл 45-2-5:</Text>
                <View style={styles.cycleItem}>
                  <View style={[styles.cycleDot, { backgroundColor: '#4ADE80' }]} />
                  <Text style={styles.cycleText}>45 минут сосредоточенной работы</Text>
                </View>
                <View style={styles.cycleItem}>
                  <View style={[styles.cycleDot, { backgroundColor: '#FBBF24' }]} />
                  <Text style={styles.cycleText}>2 минуты физической активации</Text>
                </View>
                <View style={styles.cycleItem}>
                  <View style={[styles.cycleDot, { backgroundColor: '#8B5CF6' }]} />
                  <Text style={styles.cycleText}>5 минут восстановления</Text>
                </View>
              </View>

              <Text style={styles.editPrompt}>
                Хочешь что-то изменить? Ты сможешь настроить это позже в профиле.
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
                <Text style={styles.buttonText}>Давай Noowing</Text>
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
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
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
  editPrompt: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.6)',
    textAlign: 'center',
    lineHeight: 20,
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