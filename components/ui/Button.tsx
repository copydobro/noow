import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle, StyleSheet as RNStyleSheet, StyleProp } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Typography } from '@/constants';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'play';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
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
  const buttonStyles: any = [
    styles.button,
    styles[`${variant}Button` as keyof typeof styles],
    styles[`${size}Button` as keyof typeof styles],
    disabled && styles.disabled,
    style
  ];

  const textStyles: any = [
    styles.text,
    styles[`${variant}Text` as keyof typeof styles],
    styles[`${size}Text` as keyof typeof styles],
    disabled && styles.disabledText,
    textStyle
  ];

  if (variant === 'primary') {
    return (
      <TouchableOpacity onPress={onPress} disabled={disabled} style={buttonStyles}>
        <LinearGradient
          colors={Colors.gradients.primary as [string, string]}
          style={styles.gradientButton}
        >
          <Text style={textStyles}>{title}</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  if (variant === 'play') {
    return (
      <TouchableOpacity onPress={onPress} disabled={disabled} style={buttonStyles}>
        <LinearGradient
          colors={Colors.gradients.primary as [string, string]}
          style={styles.playButtonGradient}
        >
          <Text style={textStyles}>{title}</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity onPress={onPress} disabled={disabled} style={buttonStyles}>
      <Text style={textStyles}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 28,
    shadowColor: '#FF6B00',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
  },
  
  // Variants
  primaryButton: {
    overflow: 'hidden',
    backgroundColor: '#FF6B00',
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