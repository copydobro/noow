import React from 'react';
import { View, Text, TouchableOpacity, ViewStyle } from 'react-native';

interface RatingProps {
  value: number; // 1-5
  onValueChange: (value: number) => void;
  size?: 'sm' | 'md' | 'lg';
  showLabels?: boolean;
  labels?: string[];
  disabled?: boolean;
  style?: ViewStyle;
  className?: string;
}

export const Rating: React.FC<RatingProps> = ({
  value,
  onValueChange,
  size = 'md',
  showLabels = false,
  labels = ['Плохо', 'Не очень', 'Нормально', 'Хорошо', 'Отлично'],
  disabled = false,
  style,
  className = '',
}) => {
  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return {
          container: 'h-8 w-8',
          text: 'text-sm',
        };
      case 'md':
        return {
          container: 'h-10 w-10',
          text: 'text-base',
        };
      case 'lg':
        return {
          container: 'h-12 w-12',
          text: 'text-lg',
        };
      default:
        return {
          container: 'h-10 w-10',
          text: 'text-base',
        };
    }
  };

  const sizeStyles = getSizeStyles();

  const renderStar = (index: number) => {
    const isActive = index <= value;
    const isHalf = index === Math.ceil(value) && value % 1 !== 0;

    return (
      <TouchableOpacity
        key={index}
        onPress={() => !disabled && onValueChange(index)}
        disabled={disabled}
        className={`
          ${sizeStyles.container}
          rounded-full
          flex items-center justify-center
          mx-1
          ${isActive 
            ? 'bg-orange-500 border border-orange-400' 
            : 'bg-slate-700 border border-slate-600'
          }
          ${disabled ? 'opacity-50' : 'active:scale-95'}
          transition-all duration-200
        `}
      >
        <Text
          className={`
            ${sizeStyles.text}
            font-bold
            ${isActive ? 'text-white' : 'text-slate-400'}
          `}
        >
          {index}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View className={`flex-col items-center ${className}`} style={style}>
      <View className="flex-row items-center justify-center">
        {[1, 2, 3, 4, 5].map(renderStar)}
      </View>
      {showLabels && (
        <View className="flex-row justify-between w-full mt-2">
          {labels.map((label, index) => (
            <Text
              key={index}
              className="text-slate-400 text-xs text-center flex-1"
              numberOfLines={1}
            >
              {label}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
}; 