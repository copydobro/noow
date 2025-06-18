import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, router } from 'expo-router';
import { Mail, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react-native';
import { Button, Input } from '../../components/ui';
import { Colors, Typography } from '../../constants';

export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Check if user has completed onboarding (simulate with localStorage or state)
      // For now, always go to onboarding first
      router.replace('/onboarding');
    }, 1500);
  };

  const handleSocialAuth = (provider: string) => {
    Alert.alert('Социальная авторизация', `Вход через ${provider} будет доступен в следующих версиях`);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
              <ArrowLeft size={20} color={Colors.text.primary} strokeWidth={1.5} />
            </TouchableOpacity>
            <View style={styles.headerCenter}>
              <Text style={styles.title}>ДОБРО ПОЖАЛОВАТЬ</Text>
              <Text style={styles.subtitle}>ВОЙДИТЕ В СВОЙ АККАУНТ NOOWING</Text>
            </View>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <View style={styles.inputIcon}>
                <Mail size={16} color={Colors.text.tertiary} strokeWidth={1.5} />
              </View>
              <Input
                placeholder="EMAIL"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.input}
              />
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.inputIcon}>
                <Lock size={16} color={Colors.text.tertiary} strokeWidth={1.5} />
              </View>
              <Input
                placeholder="ПАРОЛЬ"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                style={styles.input}
              />
              <TouchableOpacity 
                style={styles.eyeIcon}
                onPress={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff size={16} color={Colors.text.tertiary} strokeWidth={1.5} />
                ) : (
                  <Eye size={16} color={Colors.text.tertiary} strokeWidth={1.5} />
                )}
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>ЗАБЫЛИ ПАРОЛЬ?</Text>
            </TouchableOpacity>

            <Button
              title={isLoading ? "ВХОД..." : "ВОЙТИ"}
              onPress={handleSignIn}
              disabled={isLoading}
              style={styles.signInButton}
            />
          </View>

          {/* Divider */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>ИЛИ</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Social Auth */}
          <View style={styles.socialAuth}>
            <TouchableOpacity 
              style={styles.socialButton}
              onPress={() => handleSocialAuth('Google')}
            >
              <Text style={styles.socialButtonText}>ВОЙТИ ЧЕРЕЗ GOOGLE</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.socialButton}
              onPress={() => handleSocialAuth('Apple')}
            >
              <Text style={styles.socialButtonText}>ВОЙТИ ЧЕРЕЗ APPLE</Text>
            </TouchableOpacity>
          </View>

          {/* Sign Up Link */}
          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>НЕТ АККАУНТА? </Text>
            <Link href="/auth/sign-up" asChild>
              <TouchableOpacity>
                <Text style={styles.signUpLink}>ЗАРЕГИСТРИРОВАТЬСЯ</Text>
              </TouchableOpacity>
            </Link>
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
    paddingTop: 20,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.background.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  headerCenter: {
    flex: 1,
  },
  title: {
    ...Typography.sizes.h2,
    color: Colors.text.primary,
    marginBottom: 4,
  },
  subtitle: {
    ...Typography.sizes.subtitle,
    color: Colors.text.secondary,
  },
  form: {
    marginBottom: 32,
  },
  inputContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  inputIcon: {
    position: 'absolute',
    left: 16,
    top: 16,
    zIndex: 1,
  },
  input: {
    paddingLeft: 48,
    paddingRight: 48,
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
    top: 16,
    zIndex: 1,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    ...Typography.sizes.caption,
    color: Colors.text.accent,
  },
  signInButton: {
    marginTop: 8,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border.primary,
  },
  dividerText: {
    ...Typography.sizes.caption,
    color: Colors.text.muted,
    marginHorizontal: 16,
  },
  socialAuth: {
    gap: 12,
    marginBottom: 32,
  },
  socialButton: {
    backgroundColor: Colors.background.secondary,
    borderWidth: 1,
    borderColor: Colors.border.primary,
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
  },
  socialButtonText: {
    ...Typography.sizes.button,
    color: Colors.text.primary,
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpText: {
    ...Typography.sizes.body,
    color: Colors.text.secondary,
  },
  signUpLink: {
    ...Typography.sizes.body,
    color: Colors.text.accent,
    fontFamily: Typography.weights.semiBold,
  },
});