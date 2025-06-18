import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, router } from 'expo-router';
import { Mail, Lock, Eye, EyeOff, User, ArrowLeft } from 'lucide-react-native';
import { Button, Input } from '@/components/ui';
import { Colors, Typography } from '@/constants';

export default function SignUpScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      router.push('/onboarding');
    }, 1500);
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
              <Text style={styles.title}>СОЗДАТЬ АККАУНТ</Text>
              <Text style={styles.subtitle}>ПРИСОЕДИНЯЙТЕСЬ К NOOW</Text>
            </View>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <View style={styles.inputIcon}>
                <User size={16} color={Colors.text.tertiary} strokeWidth={1.5} />
              </View>
              <Input
                placeholder="ПОЛНОЕ ИМЯ"
                value={name}
                onChangeText={setName}
                style={styles.input}
              />
            </View>

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

            <View style={styles.inputContainer}>
              <View style={styles.inputIcon}>
                <Lock size={16} color={Colors.text.tertiary} strokeWidth={1.5} />
              </View>
              <Input
                placeholder="ПОДТВЕРДИТЕ ПАРОЛЬ"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
                style={styles.input}
              />
              <TouchableOpacity 
                style={styles.eyeIcon}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff size={16} color={Colors.text.tertiary} strokeWidth={1.5} />
                ) : (
                  <Eye size={16} color={Colors.text.tertiary} strokeWidth={1.5} />
                )}
              </TouchableOpacity>
            </View>

            <Button
              title={isLoading ? "СОЗДАНИЕ..." : "СОЗДАТЬ АККАУНТ"}
              onPress={handleSignUp}
              disabled={isLoading}
              style={styles.signUpButton}
            />
          </View>

          {/* Terms */}
          <View style={styles.terms}>
            <Text style={styles.termsText}>
              СОЗДАВАЯ АККАУНТ, ВЫ СОГЛАШАЕТЕСЬ С{' '}
              <Text style={styles.termsLink}>УСЛОВИЯМИ ИСПОЛЬЗОВАНИЯ</Text>
              {' '}И{' '}
              <Text style={styles.termsLink}>ПОЛИТИКОЙ КОНФИДЕНЦИАЛЬНОСТИ</Text>
            </Text>
          </View>

          {/* Sign In Link */}
          <View style={styles.signInContainer}>
            <Text style={styles.signInText}>УЖЕ ЕСТЬ АККАУНТ? </Text>
            <Link href="/auth/sign-in" asChild>
              <TouchableOpacity>
                <Text style={styles.signInLink}>ВОЙТИ</Text>
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
    marginBottom: 24,
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
  signUpButton: {
    marginTop: 8,
  },
  terms: {
    marginBottom: 24,
  },
  termsText: {
    ...Typography.sizes.caption,
    color: Colors.text.tertiary,
    textAlign: 'center',
    lineHeight: 14,
  },
  termsLink: {
    color: Colors.text.accent,
    fontFamily: Typography.weights.semiBold,
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInText: {
    ...Typography.sizes.body,
    color: Colors.text.secondary,
  },
  signInLink: {
    ...Typography.sizes.body,
    color: Colors.text.accent,
    fontFamily: Typography.weights.semiBold,
  },
});