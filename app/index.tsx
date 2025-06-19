import { useEffect } from 'react';
import { router } from 'expo-router';
import { View, StyleSheet } from 'react-native';

export default function Index() {
  useEffect(() => {
    // Check if user is authenticated
    let isAuthenticated = false;
    let hasCompletedOnboarding = false;
    
    if (typeof window !== 'undefined') {
      isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
      hasCompletedOnboarding = localStorage.getItem('onboardingCompleted') === 'true';
    }
    
    if (!isAuthenticated) {
      // User is not authenticated, redirect to auth
      router.replace('/auth/sign-in');
    } else if (!hasCompletedOnboarding) {
      // User is authenticated but hasn't completed onboarding
      router.replace('/onboarding');
    } else {
      // User is authenticated and has completed onboarding
      router.replace('/(tabs)');
    }
  }, []);

  return <View style={styles.container} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
});