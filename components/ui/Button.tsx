import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Typography } from '@/constants';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'play';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Button({ 
  title, 
  onPress, 
  variant = 'primary', 
  size = 'medium',
  disabled = false,
  style,
  textStyle 
}: ButtonProps) {
  const getButtonStyle = () => {
    const baseStyle = [styles.button, styles[`${variant}Button`], styles[`${size}Button`]];
    if (disabled) baseStyle.push(styles.disabled);
    if (style) baseStyle.push(style);
    return baseStyle;
  };

  const getTextStyle = () => {
    const baseStyle = [styles.text, styles[`${variant}Text`], styles[`${size}Text`]];
    if (disabled) baseStyle.push(styles.disabledText);
    if (textStyle) baseStyle.push(textStyle);
    return baseStyle;
  };

  if (variant === 'primary') {
    return (
      <TouchableOpacity onPress={onPress} disabled={disabled} style={getButtonStyle()}>
        <LinearGradient
          colors={Colors.gradients.primary}
          style={styles.gradientButton}
        >
          <Text style={getTextStyle()}>{title}</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  if (variant === 'play') {
    return (
      <TouchableOpacity onPress={onPress} disabled={disabled} style={getButtonStyle()}>
        <LinearGradient
          colors={Colors.gradients.primary}
          style={styles.playButtonGradient}
        >
          <Text style={getTextStyle()}>{title}</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity onPress={onPress} disabled={disabled} style={getButtonStyle()}>
      <Text style={getTextStyle()}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
  },
  
  // Variants
  primaryButton: {
    overflow: 'hidden',
  },
  
  secondaryButton: {
    backgroundColor: Colors.background.tertiary,
    borderWidth: 1,
    borderColor: Colors.border.secondary,
    borderRadius: 22,
    width: 44,
    height: 44,
  },
  
  ghostButton: {
    backgroundColor: 'transparent',
  },
  
  playButton: {
    borderRadius: 32,
    width: 64,
    height: 64,
    overflow: 'hidden',
  },
  
  // Sizes
  smallButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  
  mediumButton: {
    paddingVertical: 14,
    paddingHorizontal: 24,
  },
  
  largeButton: {
    paddingVertical: 18,
    paddingHorizontal: 32,
  },
  
  // Gradients
  gradientButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 16,
  },
  
  playButtonGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 32,
  },
  
  // Text styles
  text: {
    ...Typography.sizes.button,
  },
  
  primaryText: {
    color: '#000000',
  },
  
  secondaryText: {
    color: Colors.text.primary,
  },
  
  ghostText: {
    color: Colors.text.secondary,
  },
  
  playText: {
    color: '#000000',
  },
  
  // Size text styles
  smallText: {
    fontSize: 10,
  },
  
  mediumText: {
    fontSize: 12,
  },
  
  largeText: {
    fontSize: 14,
  },
  
  // Disabled states
  disabled: {
    opacity: 0.5,
  },
  
  disabledText: {
    color: Colors.text.muted,
  },
});