import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Heart, Coffee, Zap, Crown, X, CircleCheck as CheckCircle } from 'lucide-react-native';
import { Button } from '@/components/ui';
import { Colors, Typography } from '@/constants';

interface DonationTier {
  id: string;
  amount: number;
  title: string;
  description: string;
  icon: any;
  color: string;
  benefits: string[];
  impact: string;
}

const donationTiers: DonationTier[] = [
  {
    id: 'coffee',
    amount: 10,
    title: 'КОФЕ РАЗРАБОТЧИКУ',
    description: 'Поддержите нас чашкой кофе',
    icon: Coffee,
    color: '#8B4513',
    benefits: [
      'Благодарность в приложении',
      'Эксклюзивный бейдж "Поддержка"',
      'Доступ к бета-функциям'
    ],
    impact: 'Помогает покрыть расходы на хостинг на 1 день'
  },
  {
    id: 'supporter',
    amount: 100,
    title: 'АКТИВНЫЙ СТОРОННИК',
    description: 'Серьезная поддержка развития',
    icon: Zap,
    color: '#FF6B35',
    benefits: [
      'Все преимущества предыдущего уровня',
      'Персональная благодарность',
      'Приоритетная поддержка',
      'Влияние на roadmap проекта'
    ],
    impact: 'Покрывает расходы на разработку новой функции'
  },
  {
    id: 'patron',
    amount: 1000,
    title: 'МЕЦЕНАТ ПРОЕКТА',
    description: 'Максимальная поддержка миссии',
    icon: Crown,
    color: '#FFD700',
    benefits: [
      'Все преимущества предыдущих уровней',
      'Упоминание в разделе "Благодарности"',
      'Прямая связь с командой разработки',
      'Эксклюзивные обновления о развитии',
      'Возможность предложить функцию'
    ],
    impact: 'Обеспечивает развитие проекта на месяц вперед'
  }
];

export default function DonationsScreen() {
  const [selectedTier, setSelectedTier] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDonate = async (tier: DonationTier) => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      Alert.alert(
        'Спасибо за поддержку! 🙏',
        `Ваш донат в размере $${tier.amount} очень важен для нас. Вы получите благодарственное письмо на email.`,
        [
          { text: 'Отлично!', onPress: () => router.back() }
        ]
      );
    }, 2000);
  };

  const showImpactDetails = () => {
    Alert.alert(
      'Влияние ваших донатов',
      'Каждый донат напрямую влияет на развитие NOOW:\n\n• Разработка новых функций\n• Улучшение производительности\n• Поддержка серверов\n• Исследования в области продуктивности\n• Создание образовательного контента'
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
              <Text style={styles.title}>ПОДДЕРЖКА ПРОЕКТА</Text>
              <Text style={styles.subtitle}>ПОМОГИТЕ РАЗВИВАТЬ NOOW</Text>
            </View>
          </View>

          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            {/* Mission Statement */}
            <View style={styles.mission}>
              <View style={styles.missionIcon}>
                <Heart size={32} color={Colors.accentColors.primary} strokeWidth={1.5} />
              </View>
              <Text style={styles.missionTitle}>НАША МИССИЯ</Text>
              <Text style={styles.missionText}>
                NOOW создается для того, чтобы помочь людям достичь максимальной продуктивности 
                через научно обоснованные методы. Ваша поддержка помогает нам развивать 
                инновационные решения для улучшения качества жизни.
              </Text>
            </View>

            {/* Donation Tiers */}
            <View style={styles.tiersContainer}>
              <Text style={styles.tiersTitle}>ВЫБЕРИТЕ УРОВЕНЬ ПОДДЕРЖКИ</Text>
              
              {donationTiers.map((tier) => (
                <TouchableOpacity
                  key={tier.id}
                  style={[
                    styles.tierCard,
                    selectedTier === tier.id && styles.tierCardSelected
                  ]}
                  onPress={() => setSelectedTier(tier.id)}
                >
                  <View style={styles.tierHeader}>
                    <View style={[styles.tierIcon, { backgroundColor: `${tier.color}20` }]}>
                      <tier.icon size={24} color={tier.color} strokeWidth={1.5} />
                    </View>
                    <View style={styles.tierInfo}>
                      <Text style={styles.tierAmount}>${tier.amount}</Text>
                      <Text style={styles.tierTitle}>{tier.title}</Text>
                    </View>
                    {selectedTier === tier.id && (
                      <CheckCircle size={20} color={Colors.accentColors.primary} strokeWidth={1.5} />
                    )}
                  </View>
                  
                  <Text style={styles.tierDescription}>{tier.description}</Text>
                  
                  <View style={styles.benefits}>
                    <Text style={styles.benefitsTitle}>ЧТО ВЫ ПОЛУЧИТЕ:</Text>
                    {tier.benefits.map((benefit, index) => (
                      <Text key={index} style={styles.benefitItem}>• {benefit}</Text>
                    ))}
                  </View>
                  
                  <View style={styles.impact}>
                    <Text style={styles.impactTitle}>ВЛИЯНИЕ:</Text>
                    <Text style={styles.impactText}>{tier.impact}</Text>
                  </View>
                  
                  {selectedTier === tier.id && (
                    <Button
                      title={isProcessing ? "ОБРАБОТКА..." : `ПОДДЕРЖАТЬ $${tier.amount}`}
                      onPress={() => handleDonate(tier)}
                      disabled={isProcessing}
                      style={styles.donateButton}
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>

            {/* Impact Section */}
            <View style={styles.impactSection}>
              <Text style={styles.impactSectionTitle}>ПРОЗРАЧНОСТЬ ИСПОЛЬЗОВАНИЯ</Text>
              <TouchableOpacity style={styles.impactCard} onPress={showImpactDetails}>
                <View style={styles.impactStats}>
                  <View style={styles.impactStat}>
                    <Text style={styles.impactStatValue}>75%</Text>
                    <Text style={styles.impactStatLabel}>РАЗРАБОТКА</Text>
                  </View>
                  <View style={styles.impactStat}>
                    <Text style={styles.impactStatValue}>15%</Text>
                    <Text style={styles.impactStatLabel}>ИНФРАСТРУКТУРА</Text>
                  </View>
                  <View style={styles.impactStat}>
                    <Text style={styles.impactStatValue}>10%</Text>
                    <Text style={styles.impactStatLabel}>ИССЛЕДОВАНИЯ</Text>
                  </View>
                </View>
                <Text style={styles.impactCardText}>
                  Нажмите для подробной информации о том, как используются средства
                </Text>
              </TouchableOpacity>
            </View>
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
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    marginBottom: 20,
  },
  backButton: {
    padding: 8,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
    marginRight: 40,
  },
  title: {
    ...Typography.sizes.h2,
    color: Colors.text.primary,
    textAlign: 'center',
  },
  subtitle: {
    ...Typography.sizes.body,
    color: Colors.text.secondary,
    textAlign: 'center',
    marginTop: 4,
  },
  scrollView: {
    flex: 1,
  },
  mission: {
    alignItems: 'center',
    paddingVertical: 30,
    marginBottom: 30,
  },
  missionIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: `${Colors.accentColors.primary}20`,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  missionTitle: {
    ...Typography.sizes.h3,
    color: Colors.text.primary,
    marginBottom: 12,
  },
  missionText: {
    ...Typography.sizes.body,
    color: Colors.text.secondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  tiersContainer: {
    marginBottom: 30,
  },
  tiersTitle: {
    ...Typography.sizes.h3,
    color: Colors.text.primary,
    marginBottom: 20,
    textAlign: 'center',
  },
  tierCard: {
    backgroundColor: Colors.background.secondary,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border.primary,
  },
  tierCardSelected: {
    borderColor: Colors.accentColors.primary,
    backgroundColor: `${Colors.accentColors.primary}08`,
  },
  tierHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  tierIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  tierInfo: {
    flex: 1,
  },
  tierAmount: {
    ...Typography.sizes.h2,
    color: Colors.text.primary,
  },
  tierTitle: {
    ...Typography.sizes.body,
    color: Colors.text.secondary,
    marginTop: 2,
  },
  tierDescription: {
    ...Typography.sizes.body,
    color: Colors.text.secondary,
    marginBottom: 16,
  },
  benefits: {
    marginBottom: 16,
  },
  benefitsTitle: {
    ...Typography.sizes.bodySmall,
    color: Colors.text.primary,
    fontWeight: '600',
    marginBottom: 8,
  },
  benefitItem: {
    ...Typography.sizes.bodySmall,
    color: Colors.text.secondary,
    marginBottom: 4,
  },
  impact: {
    marginBottom: 16,
  },
  impactTitle: {
    ...Typography.sizes.bodySmall,
    color: Colors.text.primary,
    fontWeight: '600',
    marginBottom: 4,
  },
  impactText: {
    ...Typography.sizes.bodySmall,
    color: Colors.text.secondary,
  },
  donateButton: {
    marginTop: 8,
  },
  impactSection: {
    marginBottom: 30,
  },
  impactSectionTitle: {
    ...Typography.sizes.h3,
    color: Colors.text.primary,
    marginBottom: 16,
    textAlign: 'center',
  },
  impactCard: {
    backgroundColor: Colors.background.secondary,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.border.primary,
  },
  impactStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  impactStat: {
    alignItems: 'center',
  },
  impactStatValue: {
    ...Typography.sizes.h2,
    color: Colors.accentColors.primary,
  },
  impactStatLabel: {
    ...Typography.sizes.bodySmall,
    color: Colors.text.secondary,
    textAlign: 'center',
    marginTop: 4,
  },
  impactCardText: {
    ...Typography.sizes.bodySmall,
    color: Colors.text.secondary,
    textAlign: 'center',
  },
}); 