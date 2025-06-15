import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowRight, ArrowLeft, User, Mail, Eye, EyeOff, Brain } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RegisterScreen() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Имя обязательно';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Имя должно содержать минимум 2 символа';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email обязателен';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Некорректный email';
    }

    if (!formData.password) {
      newErrors.password = 'Пароль обязателен';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Пароль должен содержать минимум 6 символов';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Пароли не совпадают';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = () => {
    if (validateForm()) {
      // Здесь будет логика регистрации
      Alert.alert(
        'Регистрация успешна!',
        `Добро пожаловать, ${formData.name}! Теперь настроим ваш профиль.`,
        [
          {
            text: 'Продолжить',
            onPress: () => {
              // Сохраняем данные пользователя
              if (typeof window !== 'undefined') {
                localStorage.setItem('userName', formData.name);
                localStorage.setItem('userEmail', formData.email);
                localStorage.setItem('isRegistered', 'true');
              }
              router.replace('/onboarding');
            }
          }
        ]
      );
    }
  };

  const handleSocialRegister = (provider: 'google' | 'apple') => {
    Alert.alert(
      `Регистрация через ${provider === 'google' ? 'Google' : 'Apple'}`,
      'Функция будет доступна в следующих версиях приложения',
      [{ text: 'Понятно', style: 'default' }]
    );
  };

  const isFormValid = formData.name.trim() && formData.email.trim() && 
                     formData.password && formData.confirmPassword &&
                     Object.keys(errors).length === 0;

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

          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            <View style={styles.formContainer}>
              <Text style={styles.title}>СОЗДАТЬ АККАУНТ</Text>
              <Text style={styles.subtitle}>
                ПРИСОЕДИНЯЙСЯ К СООБЩЕСТВУ{'\n'}ЦИФРОВЫХ ВОИНОВ NOOWING
              </Text>

              {/* Form Fields */}
              <View style={styles.fieldsContainer}>
                {/* Name Field */}
                <View style={styles.fieldContainer}>
                  <Text style={styles.fieldLabel}>ИМЯ</Text>
                  <View style={[styles.inputContainer, errors.name && styles.inputError]}>
                    <User size={16} color="rgba(255, 255, 255, 0.4)" strokeWidth={1.5} />
                    <TextInput
                      style={styles.textInput}
                      value={formData.name}
                      onChangeText={(text) => {
                        setFormData(prev => ({ ...prev, name: text }));
                        if (errors.name) {
                          setErrors(prev => ({ ...prev, name: '' }));
                        }
                      }}
                      placeholder="Введите ваше имя"
                      placeholderTextColor="rgba(255, 255, 255, 0.3)"
                      autoCapitalize="words"
                    />
                  </View>
                  {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
                </View>

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
                  <Text style={styles.fieldLabel}>ПАРОЛЬ</Text>
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
                      placeholder="Минимум 6 символов"
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

                {/* Confirm Password Field */}
                <View style={styles.fieldContainer}>
                  <Text style={styles.fieldLabel}>ПОДТВЕРДИТЕ ПАРОЛЬ</Text>
                  <View style={[styles.inputContainer, errors.confirmPassword && styles.inputError]}>
                    <TextInput
                      style={[styles.textInput, { flex: 1 }]}
                      value={formData.confirmPassword}
                      onChangeText={(text) => {
                        setFormData(prev => ({ ...prev, confirmPassword: text }));
                        if (errors.confirmPassword) {
                          setErrors(prev => ({ ...prev, confirmPassword: '' }));
                        }
                      }}
                      placeholder="Повторите пароль"
                      placeholderTextColor="rgba(255, 255, 255, 0.3)"
                      secureTextEntry={!showConfirmPassword}
                    />
                    <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                      {showConfirmPassword ? (
                        <EyeOff size={16} color="rgba(255, 255, 255, 0.4)" strokeWidth={1.5} />
                      ) : (
                        <Eye size={16} color="rgba(255, 255, 255, 0.4)" strokeWidth={1.5} />
                      )}
                    </TouchableOpacity>
                  </View>
                  {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
                </View>
              </View>

              {/* Register Button */}
              <TouchableOpacity 
                style={[styles.registerButton, !isFormValid && styles.registerButtonDisabled]}
                onPress={handleRegister}
                disabled={!isFormValid}
              >
                <LinearGradient
                  colors={isFormValid ? ['#FF6B35', '#E55A2B'] : ['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.02)']}
                  style={styles.buttonGradient}
                >
                  <Text style={[
                    styles.registerButtonText,
                    !isFormValid && styles.registerButtonTextDisabled
                  ]}>
                    СОЗДАТЬ АККАУНТ
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
                  onPress={() => handleSocialRegister('google')}
                >
                  <View style={styles.socialIcon}>
                    <Text style={styles.socialIconText}>G</Text>
                  </View>
                  <Text style={styles.socialButtonText}>GOOGLE</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.socialButton}
                  onPress={() => handleSocialRegister('apple')}
                >
                  <View style={styles.socialIcon}>
                    <Text style={styles.socialIconText}>🍎</Text>
                  </View>
                  <Text style={styles.socialButtonText}>APPLE</Text>
                </TouchableOpacity>
              </View>

              {/* Login Link */}
              <TouchableOpacity 
                style={styles.loginLink}
                onPress={() => router.push('/auth/login')}
              >
                <Text style={styles.loginLinkText}>
                  УЖЕ ЕСТЬ АККАУНТ? <Text style={styles.loginLinkHighlight}>ВОЙТИ</Text>
                </Text>
              </TouchableOpacity>

              {/* Terms */}
              <Text style={styles.termsText}>
                СОЗДАВАЯ АККАУНТ, ВЫ СОГЛАШАЕТЕСЬ С{'\n'}
                <Text style={styles.termsLink}>УСЛОВИЯМИ ИСПОЛЬЗОВАНИЯ</Text> И{' '}
                <Text style={styles.termsLink}>ПОЛИТИКОЙ КОНФИДЕНЦИАЛЬНОСТИ</Text>
              </Text>
            </View>
          </ScrollView>
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
    justifyContent: 'space-between',
    marginBottom: 24,
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
  scrollView: {
    flex: 1,
  },
  formContainer: {
    paddingBottom: 24,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: 1.5,
  },
  subtitle: {
    fontSize: 11,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    lineHeight: 15,
    marginBottom: 32,
    letterSpacing: 0.5,
  },
  fieldsContainer: {
    marginBottom: 24,
  },
  fieldContainer: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 10,
    fontFamily: 'Inter-SemiBold',
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 6,
    letterSpacing: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 14,
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
  registerButton: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
  },
  registerButtonDisabled: {
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
  registerButtonText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#000',
    letterSpacing: 1,
  },
  registerButtonTextDisabled: {
    color: 'rgba(255, 255, 255, 0.3)',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
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
    gap: 10,
    marginBottom: 20,
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    gap: 6,
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
    fontSize: 9,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  loginLink: {
    alignItems: 'center',
    marginBottom: 16,
  },
  loginLinkText: {
    fontSize: 11,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.6)',
    letterSpacing: 0.3,
  },
  loginLinkHighlight: {
    color: '#FF6B35',
    fontFamily: 'Inter-SemiBold',
  },
  termsText: {
    fontSize: 8,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.4)',
    textAlign: 'center',
    lineHeight: 11,
    letterSpacing: 0.2,
  },
  termsLink: {
    color: '#FF6B35',
    fontFamily: 'Inter-Medium',
  },
});