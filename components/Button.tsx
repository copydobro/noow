import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  style,
  textStyle,
  className = '',
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-orange-500 active:bg-orange-600 disabled:bg-orange-300';
      case 'secondary':
        return 'bg-slate-800 active:bg-slate-700 disabled:bg-slate-600 border border-slate-600';
      case 'ghost':
        return 'bg-transparent active:bg-slate-800 disabled:bg-transparent';
      case 'danger':
        return 'bg-red-500 active:bg-red-600 disabled:bg-red-300';
      default:
        return 'bg-orange-500 active:bg-orange-600 disabled:bg-orange-300';
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'px-3 py-2 rounded-lg';
      case 'md':
        return 'px-4 py-3 rounded-xl';
      case 'lg':
        return 'px-6 py-4 rounded-2xl';
      default:
        return 'px-4 py-3 rounded-xl';
    }
  };

  const getTextVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'text-white font-semibold';
      case 'secondary':
        return 'text-white font-semibold';
      case 'ghost':
        return 'text-orange-500 font-semibold';
      case 'danger':
        return 'text-white font-semibold';
      default:
        return 'text-white font-semibold';
    }
  };

  const getTextSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'text-sm';
      case 'md':
        return 'text-base';
      case 'lg':
        return 'text-lg';
      default:
        return 'text-base';
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      className={`
        ${getVariantStyles()}
        ${getSizeStyles()}
        ${fullWidth ? 'w-full' : ''}
        flex-row items-center justify-center
        shadow-md
        transition-all duration-200
        ${className}
      `}
      style={style}
    >
      {loading && (
        <ActivityIndicator
          size="small"
          color={variant === 'ghost' ? '#f97316' : '#ffffff'}
          style={{ marginRight: 8 }}
        />
      )}
      <Text
        className={`
          ${getTextVariantStyles()}
          ${getTextSizeStyles()}
          ${disabled ? 'opacity-50' : ''}
        `}
        style={textStyle}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}; 