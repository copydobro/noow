import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { BlurView } from 'expo-blur';

interface AuthCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export function AuthCard({ children, style }: AuthCardProps) {
  return (
    <View style={[styles.card, style]}>
      <BlurView intensity={24} tint="dark" style={[StyleSheet.absoluteFill, { borderRadius: 12, overflow: 'hidden' }]} />
      <View style={{ position: 'relative' }}>{children}</View>
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
    alignSelf: 'center',
  },
}); 