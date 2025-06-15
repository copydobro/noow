import { useEffect } from 'react';
import { router } from 'expo-router';
import { View, StyleSheet } from 'react-native';

export default function Index() {
  useEffect(() => {
    // Defer navigation to ensure Root Layout has mounted
    setTimeout(() => {
      // Check if user is registered and has completed onboarding
      let isRegistered = false;
      let hasCompletedOnboarding = false;
      
      if (typeof window !== 'undefined') {
        isRegistered = localStorage.getItem('isRegistered') === 'true';
        hasCompletedOnboarding = localStorage.getItem('onboardingCompleted') === 'true';
      }
      
      if (isRegistered && hasCompletedOnboarding) {
        router.replace('/(tabs)');
      } else if (isRegistered && !hasCompletedOnboarding) {
        router.replace('/onboarding');
      } else {
        router.replace('/auth/welcome');
      }
    }, 0);
  }, []);

  return <View style={styles.container} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
});