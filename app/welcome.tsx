import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Brain, ArrowRight } from 'lucide-react-native';
import { Button } from '../components/ui';
import { Colors, Typography } from '../constants';

export default function WelcomeScreen() {
  const handleGetStarted = () => {
    router.push('/auth/sign-up');
  };

  const handleSignIn = () => {
    router.push('/auth/sign-in');
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Brain size={48} color={Colors.accentColors.primary} strokeWidth={1.5} />
            </View>
            <Text style={styles.title}>NOOWING</Text>
            <Text style={styles.subtitle}>РЕВОЛЮЦИОННАЯ СИСТЕМА ПРОДУКТИВНОСТИ</Text>
          </View>

          {/* Hero Section */}
          <View style={styles.hero}>
            <Text style={styles.heroTitle}>КОНЦЕПЦИЯ 45-2-5</Text>
            <Text style={styles.heroDescription}>
              Уникальная методика, сочетающая глубокую концентрацию с физической активацией 
              для максимальной продуктивности и здоровья мозга.
            </Text>
            
            <View style={styles.cycleVisualization}>
              <View style={styles.cycleStep}>
                <Text style={styles.cycleTime}>45</Text>
                <Text style={styles.cycleLabel}>РАБОТА</Text>
              </View>
              <ArrowRight size={16} color={Colors.text.tertiary} strokeWidth={1.5} />
              <View style={styles.cycleStep}>
                <Text style={styles.cycleTime}>2</Text>
                <Text style={styles.cycleLabel}>АКТИВАЦИЯ</Text>
              </View>
              <ArrowRight size={16} color={Colors.text.tertiary} strokeWidth={1.5} />
              <View style={styles.cycleStep}>
                <Text style={styles.cycleTime}>5</Text>
                <Text style={styles.cycleLabel}>ОТДЫХ</Text>
              </View>
            </View>
          </View>

          {/* Benefits */}
          <View style={styles.benefits}>
            <View style={styles.benefit}>
              <Text style={styles.benefitIcon}>🧠</Text>
              <Text style={styles.benefitText}>УЛУЧШЕНИЕ КОГНИТИВНЫХ ФУНКЦИЙ</Text>
            </View>
            <View style={styles.benefit}>
              <Text style={styles.benefitIcon}>⚡</Text>
              <Text style={styles.benefitText}>ПОВЫШЕНИЕ ЭНЕРГИИ</Text>
            </View>
            <View style={styles.benefit}>
              <Text style={styles.benefitIcon}>🎯</Text>
              <Text style={styles.benefitText}>МАКСИМАЛЬНАЯ КОНЦЕНТРАЦИЯ</Text>
            </View>
          </View>

          {/* Actions */}
          <View style={styles.actions}>
            <Button
              title="НАЧАТЬ ПУТЕШЕСТВИЕ"
              onPress={handleGetStarted}
              style={styles.primaryButton}
            />
            
            <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
              <Text style={styles.signInText}>УЖЕ ЕСТЬ АККАУНТ? ВОЙТИ</Text>
            </TouchableOpacity>
          </View>
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
    paddingTop: 40,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.accentColors.tertiary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    ...Typography.sizes.h1,
    color: Colors.accentColors.primary,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    ...Typography.sizes.caption,
    color: Colors.text.tertiary,
    textAlign: 'center',
  },
  hero: {
    alignItems: 'center',
    marginBottom: 40,
  },
  heroTitle: {
    ...Typography.sizes.subtitle,
    color: Colors.text.primary,
    textAlign: 'center',
    marginBottom: 12,
  },
  heroDescription: {
    ...Typography.sizes.body,
    color: Colors.text.secondary,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 24,
  },
  cycleVisualization: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  cycleStep: {
    alignItems: 'center',
    backgroundColor: Colors.background.secondary,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border.primary,
    minWidth: 60,
  },
  cycleTime: {
    ...Typography.sizes.accent,
    color: Colors.accentColors.primary,
    marginBottom: 4,
  },
  cycleLabel: {
    ...Typography.sizes.micro,
    color: Colors.text.tertiary,
    textAlign: 'center',
  },
  benefits: {
    gap: 16,
    marginBottom: 40,
  },
  benefit: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background.secondary,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border.primary,
  },
  benefitIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  benefitText: {
    ...Typography.sizes.bodySmall,
    color: Colors.text.primary,
    flex: 1,
  },
  actions: {
    marginTop: 'auto',
    gap: 16,
  },
  primaryButton: {
    // Uses default button styles
  },
  signInButton: {
    alignItems: 'center',
    padding: 16,
  },
  signInText: {
    ...Typography.sizes.caption,
    color: Colors.text.accent,
  },
});