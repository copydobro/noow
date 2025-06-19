import React from 'react';
import { View, StyleSheet, ViewStyle, ColorValue } from 'react-native';
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
          colors={Colors.gradients.card as [ColorValue, ColorValue]}
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
    borderRadius: 28,
    backgroundColor: 'rgba(0,0,0,0.40)',
    // @ts-ignore
    backdropFilter: 'blur(16px)',
    shadowColor: '#FF6B00',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
  },
  
  defaultCard: {
    borderWidth: 1,
    borderColor: Colors.border.primary,
    padding: 20,
  },
  
  statisticalCard: {
    borderWidth: 1,
    borderColor: Colors.border.primary,
    padding: 16,
    alignItems: 'center',
  },
  
  userCard: {
    overflow: 'hidden',
  },
  
  userCardGradient: {
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.border.accent,
    borderRadius: 28,
  },
}); 