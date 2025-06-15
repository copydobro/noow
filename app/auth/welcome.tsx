import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Brain, ArrowRight, Mail, User } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen() {
  return (
    <LinearGradient
      colors={['#0A0A0A', '#1A1A1A', '#2A2A2A']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          {/* Hero Section */}
          <View style={styles.heroSection}>
            <Text style={styles.title}>ДОБРО ПОЖАЛОВАТЬ{'\n'}В NOOWING</Text>
          </View>

          {/* Auth Buttons */}
          <View style={styles.authSection}>
            <Text style={styles.authTitle}>НАЧНИ СВОЕ ПУТЕШЕСТВИЕ</Text>
            
            <TouchableOpacity 
              style={styles.primaryButton}
              onPress={() => router.push('/auth/register')}
            >
              <LinearGradient
                colors={['#FF6B35', '#E55A2B']}
                style={styles.buttonGradient}
              >
                <User size={16} color="#000" strokeWidth={1.5} />
                <Text style={styles.primaryButtonText}>СОЗДАТЬ АККАУНТ</Text>
                <ArrowRight size={16} color="#000" strokeWidth={1.5} />
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.secondaryButton}
              onPress={() => router.push('/auth/login')}
            >
              <Mail size={16} color="#FFFFFF" strokeWidth={1.5} />
              <Text style={styles.secondaryButtonText}>УЖЕ ЕСТЬ АККАУНТ</Text>
            </TouchableOpacity>

            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>ИЛИ</Text>
              <View style={styles.dividerLine} />
            </View>

            <View style={styles.socialButtons}>
              <TouchableOpacity style={styles.socialButton}>
                <View style={styles.socialIcon}>
                  <Text style={styles.socialIconText}>G</Text>
                </View>
                <Text style={styles.socialButtonText}>GOOGLE</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.socialButton}>
                <View style={styles.socialIcon}>
                  <Text style={styles.socialIconText}></Text>
                </View>
                <Text style={styles.socialButtonText}>APPLE</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.termsText}>
              ПРОДОЛЖАЯ, ВЫ СОГЛАШАЕТЕСЬ С{'\n'}
              <Text style={styles.termsLink}>УСЛОВИЯМИ ИСПОЛЬЗОВАНИЯ</Text> И{' '}
              <Text style={styles.termsLink}>ПОЛИТИКОЙ КОНФИДЕНЦИАЛЬНОСТИ</Text>
            </Text>
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
    paddingBottom: 20,
    justifyContent: 'space-between',
  },
  heroSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 34,
    letterSpacing: 2,
  },
  authSection: {
    paddingTop: 40,
  },
  authTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 24,
    letterSpacing: 1.5,
  },
  primaryButton: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 12,
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    gap: 8,
  },
  primaryButtonText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#000',
    letterSpacing: 1,
    flex: 1,
    textAlign: 'center',
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    marginBottom: 24,
    gap: 8,
  },
  secondaryButtonText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  dividerText: {
    fontSize: 10,
    fontFamily: 'Inter-Medium',
    color: 'rgba(255, 255, 255, 0.4)',
    marginHorizontal: 16,
    letterSpacing: 1,
  },
  socialButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    gap: 8,
  },
  socialIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialIconText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  socialButtonText: {
    fontSize: 10,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  termsText: {
    fontSize: 9,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.5)',
    textAlign: 'center',
    lineHeight: 12,
    letterSpacing: 0.3,
  },
  termsLink: {
    color: '#FF6B35',
    fontFamily: 'Inter-Medium',
  },
});