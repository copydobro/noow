import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

interface AuthCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export function AuthCard({ children, style }: AuthCardProps) {
  return (
    <View style={[styles.card, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '90%',
    maxWidth: 390,
    minWidth: 280,
    borderRadius: 12,
    padding: 24,
    backgroundColor: 'rgba(0,0,0,0.40)',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.12)',
    shadowColor: '#FFB86B',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 32,
    alignSelf: 'center',
  },
}); 