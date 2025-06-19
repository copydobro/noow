import React from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';
import { Colors, Typography } from '@/constants';

interface InputProps extends TextInputProps {
  variant?: 'default' | 'search';
}

export function Input({ variant = 'default', style, ...props }: InputProps) {
  return (
    <TextInput
      style={[styles.input, styles[`${variant}Input`], style]}
      placeholderTextColor={Colors.text.muted}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: Colors.background.secondary,
    borderWidth: 1,
    borderColor: Colors.border.primary,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    color: Colors.text.primary,
    ...Typography.sizes.body,
  },
  
  defaultInput: {
    // Default styling already applied above
  },
  
  searchInput: {
    borderRadius: 20,
  },
}); 