import React from 'react';
import { View, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'gradient' | 'elevated' | 'outlined';
  gradientColors?: readonly [string, string, ...string[]];
  style?: ViewStyle;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  gradientColors = ['#1e293b', '#334155'] as const,
  style,
  className = '',
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'default':
        return 'bg-slate-800 border border-slate-700';
      case 'gradient':
        return 'border border-slate-700';
      case 'elevated':
        return 'bg-slate-800 shadow-lg';
      case 'outlined':
        return 'bg-transparent border-2 border-slate-600';
      default:
        return 'bg-slate-800 border border-slate-700';
    }
  };

  const baseStyles = `
    rounded-2xl p-4
    ${getVariantStyles()}
    ${className}
  `;

  if (variant === 'gradient') {
    return (
      <View className={baseStyles} style={style}>
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: 16,
          }}
        />
        <View style={{ position: 'relative', zIndex: 10 }}>
          {children}
        </View>
      </View>
    );
  }

  return (
    <View className={baseStyles} style={style}>
      {children}
    </View>
  );
}; 