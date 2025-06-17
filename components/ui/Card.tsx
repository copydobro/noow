import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'statistical' | 'user';
  style?: ViewStyle;
}

export function Card({ children, variant = 'default', style }: CardProps) {
  if (variant === 'user') {
    return (
      <View style={[styles.card, styles.userCard, style]}>
        <LinearGradient
          colors={Colors.gradients.card}
          style={styles.userCardGradient}
        >
          {children}
        </LinearGradient>
      </View>
    );
  }

  return (
    <View style={[styles.card, styles[`${variant}Card`], style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
  },
  
  defaultCard: {
    backgroundColor: Colors.background.secondary,
    borderWidth: 1,
    borderColor: Colors.border.primary,
    padding: 16,
  },
  
  statisticalCard: {
    backgroundColor: Colors.background.secondary,
    borderWidth: 1,
    borderColor: Colors.border.primary,
    padding: 12,
    alignItems: 'center',
  },
  
  userCard: {
    overflow: 'hidden',
  },
  
  userCardGradient: {
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border.accent,
    borderRadius: 16,
  },
});