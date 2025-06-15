import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowRight, ArrowLeft, Mail, Eye, EyeOff, Brain } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email обязателен';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Некорректный email';
    }

    if (!formData.password) {
      newErrors.password = 'Пароль обязателен';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = () => {
    if (validateForm()) {
      // Здесь будет логика входа
      Alert.alert(
        'Добро пожаловать обратно!',
        'Вход выполнен успешно',
        [
          {
            text: 'Продолжить',
            onPress: () => {
              // Проверяем, завершен ли онбординг
              const onboardingCompleted = typeof window !== 'undefined' 
                ? localStorage.getItem('onboardingCompleted') === 'true'
                : false;
              
              if (onboardingCompleted) {
                router.replace('/(tabs)');
              } else {
                router.replace('/onboarding');
              }
            }
          }
        ]
      );
    }
  };

  const handleSocialLogin = (provider: 'google' | 'apple') => {
    Alert.alert(
      `Вход через ${provider === 'google' ? 'Google' : 'Apple'}`,
      'Функция будет доступна в следующих версиях приложения',
      [{ text: 'Понятно', style: 'default' }]
    );
  };

  const handleForgotPassword = () => {
    Alert.alert(
      'Восстановление пароля',
      'Введите ваш email для восстановления пароля',
      [
        { text: 'Отмена', style: 'cancel' },
        { text: 'Отправить', onPress: () => Alert.alert('Успешно!', 'Инструкции отправлены на ваш email') }
      ]
    );
  };

  const isFormValid = formData.email.trim() && formData.password && Object.keys(errors).length === 0;

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
              <ArrowLeft size={20} color="#FFFFFF" strokeWidth={1.5} />
            </TouchableOpacity>
            
            <View style={styles.logoContainer}>
              <Brain size={24} color="#FF6B35" strokeWidth={1.5} />
            </View>
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.title}>ДОБРО ПОЖАЛОВАТЬ{'\n'}ОБРАТНО</Text>
            <Text style={styles.subtitle}>
              ВОЙДИТЕ В СВОЙ АККАУНТ{'\n'}
              И ПРОДОЛЖИТЕ NOOWING
            </Text>

            {/* Form Fields */}
            <View style={styles.fieldsContainer}>
              {/* Email Field */}
              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>EMAIL</Text>
                <View style={[styles.inputContainer, errors.email && styles.inputError]}>
                  <Mail size={16} color="rgba(255, 255, 255, 0.4)" strokeWidth={1.5} />
                  <TextInput
                    style={styles.textInput}
                    value={formData.email}
                    onChangeText={(text) => {
                      setFormData(prev => ({ ...prev, email: text }));
                      if (errors.email) {
                        setErrors(prev => ({ ...prev, email: '' }));
                      }
                    }}
                    placeholder="example@noowing.com"
                    placeholderTextColor="rgba(255, 255, 255, 0.3)"
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
                {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
              </View>

              {/* Password Field */}
              <View style={styles.fieldContainer}>
                <View style={styles.passwordHeader}>
                  <Text style={styles.fieldLabel}>ПАРОЛЬ</Text>
                  <TouchableOpacity onPress={handleForgotPassword}>
                    <Text style={styles.forgotLink}>ЗАБЫЛИ?</Text>
                  </TouchableOpacity>
                </View>
                <View style={[styles.inputContainer, errors.password && styles.inputError]}>
                  <TextInput
                    style={[styles.textInput, { flex: 1 }]}
                    value={formData.password}
                    onChangeText={(text) => {
                      setFormData(prev => ({ ...prev, password: text }));
                      if (errors.password) {
                        setErrors(prev => ({ ...prev, password: '' }));
                      }
                    }}
                    placeholder="Введите пароль"
                    placeholderTextColor="rgba(255, 255, 255, 0.3)"
                    secureTextEntry={!showPassword}
                  />
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    {showPassword ? (
                      <EyeOff size={16} color="rgba(255, 255, 255, 0.4)" strokeWidth={1.5} />
                    ) : (
                      <Eye size={16} color="rgba(255, 255, 255, 0.4)" strokeWidth={1.5} />
                    )}
                  </TouchableOpacity>
                </View>
                {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
              </View>
            </View>

            {/* Login Button */}
            <TouchableOpacity 
              style={[styles.loginButton, !isFormValid && styles.loginButtonDisabled]}
              onPress={handleLogin}
              disabled={!isFormValid}
            >
              <LinearGradient
                colors={isFormValid ? ['#FF6B35', '#E55A2B'] : ['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.02)']}
                style={styles.buttonGradient}
              >
                <Text style={[
                  styles.loginButtonText,
                  !isFormValid && styles.loginButtonTextDisabled
                ]}>
                  ВОЙТИ
                </Text>
                <ArrowRight size={16} color={isFormValid ? "#000" : "rgba(255,255,255,0.3)"} strokeWidth={1.5} />
              </LinearGradient>
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>ИЛИ</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Social Buttons */}
            <View style={styles.socialButtons}>
              <TouchableOpacity 
                style={styles.socialButton}
                onPress={() => handleSocialLogin('google')}
              >
                <View style={styles.socialIcon}>
                  <Text style={styles.socialIconText}>G</Text>
                </View>
                <Text style={styles.socialButtonText}>GOOGLE</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.socialButton}
                onPress={() => handleSocialLogin('apple')}
              >
                <View style={styles.socialIcon}>
                  <Text style={styles.socialIconText}></Text>
                </View>
                <Text style={styles.socialButtonText}>APPLE</Text>
              </TouchableOpacity>
            </View>

            {/* Register Link */}
            <TouchableOpacity 
              style={styles.registerLink}
              onPress={() => router.push('/auth/register')}
            >
              <Text style={styles.registerLinkText}>
                НЕТ АККАУНТА? <Text style={styles.registerLinkHighlight}>СОЗДАТЬ</Text>
              </Text>
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
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  backButton: {
    padding: 8,
  },
  logoContainer: {
    padding: 8,
    backgroundColor: 'rgba(255, 107, 53, 0.08)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 53, 0.15)',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 40,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 24,
    letterSpacing: 1.5,
  },
  subtitle: {
    fontSize: 11,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    lineHeight: 15,
    marginBottom: 40,
    letterSpacing: 0.5,
  },
  fieldsContainer: {
    marginBottom: 32,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  fieldLabel: {
    fontSize: 10,
    fontFamily: 'Inter-SemiBold',
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 6,
    letterSpacing: 1,
  },
  passwordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  forgotLink: {
    fontSize: 9,
    fontFamily: 'Inter-SemiBold',
    color: '#FF6B35',
    letterSpacing: 0.5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    gap: 10,
  },
  inputError: {
    borderColor: '#EF4444',
    backgroundColor: 'rgba(239, 68, 68, 0.05)',
  },
  textInput: {
    flex: 1,
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
  errorText: {
    fontSize: 9,
    fontFamily: 'Inter-Regular',
    color: '#EF4444',
    marginTop: 4,
    letterSpacing: 0.2,
  },
  loginButton: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 24,
  },
  loginButtonDisabled: {
    opacity: 0.5,
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    gap: 8,
  },
  loginButtonText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#000',
    letterSpacing: 1,
  },
  loginButtonTextDisabled: {
    color: 'rgba(255, 255, 255, 0.3)',
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
    fontSize: 9,
    fontFamily: 'Inter-Medium',
    color: 'rgba(255, 255, 255, 0.4)',
    marginHorizontal: 12,
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
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialIconText: {
    fontSize: 10,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  socialButtonText: {
    fontSize: 10,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  registerLink: {
    alignItems: 'center',
  },
  registerLinkText: {
    fontSize: 11,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.6)',
    letterSpacing: 0.3,
  },
  registerLinkHighlight: {
    color: '#FF6B35',
    fontFamily: 'Inter-SemiBold',
  },
});