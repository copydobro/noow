import { useEffect } from 'react';
import { router } from 'expo-router';
import { View, StyleSheet } from 'react-native';

export default function Index() {
  useEffect(() => {
    // Check if user has completed onboarding
    const hasCompletedOnboarding = false; // This would come from storage
    
    if (hasCompletedOnboarding) {
      router.replace('/(tabs)');
    } else {
      router.replace('/onboarding');
    }
  }, []);

  return <View style={styles.container} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});