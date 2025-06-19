import React from 'react';
import { View, Text, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface ProgressBarProps {
  progress: number; // 0-100
  variant?: 'default' | 'gradient' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  label?: string;
  style?: ViewStyle;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  variant = 'default',
  size = 'md',
  showLabel = false,
  label,
  style,
  className = '',
}) => {
  const clampedProgress = Math.max(0, Math.min(100, progress));

  const getVariantStyles = () => {
    switch (variant) {
      case 'default':
        return {
          bg: 'bg-slate-700',
          fill: 'bg-orange-500',
        };
      case 'gradient':
        return {
          bg: 'bg-slate-700',
          fill: 'bg-gradient-to-r from-orange-500 to-orange-600',
        };
      case 'success':
        return {
          bg: 'bg-slate-700',
          fill: 'bg-green-500',
        };
      case 'warning':
        return {
          bg: 'bg-slate-700',
          fill: 'bg-yellow-500',
        };
      case 'error':
        return {
          bg: 'bg-slate-700',
          fill: 'bg-red-500',
        };
      default:
        return {
          bg: 'bg-slate-700',
          fill: 'bg-orange-500',
        };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'h-1';
      case 'md':
        return 'h-2';
      case 'lg':
        return 'h-3';
      default:
        return 'h-2';
    }
  };

  const variantStyles = getVariantStyles();
  const sizeStyles = getSizeStyles();

  return (
    <View className={`w-full ${className}`} style={style}>
      {showLabel && (
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-slate-300 text-sm font-medium">
            {label || `${Math.round(clampedProgress)}%`}
          </Text>
          <Text className="text-slate-400 text-xs">
            {Math.round(clampedProgress)}%
          </Text>
        </View>
      )}
      <View className={`w-full rounded-full overflow-hidden ${variantStyles.bg} ${sizeStyles}`}>
        <View
          className={`h-full rounded-full ${variantStyles.fill}`}
          style={{ width: `${clampedProgress}%` }}
        />
      </View>
    </View>
  );
}; 