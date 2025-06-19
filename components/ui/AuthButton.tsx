import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle, StyleProp } from 'react-native';

interface AuthButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export function AuthButton({ title, onPress, disabled = false, style, textStyle }: AuthButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled} style={[styles.button, style]}>
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    backgroundColor: '#FF6B00',
    paddingVertical: 0,
    height: 44,
    minHeight: 44,
    paddingHorizontal: 16,
    width: '100%',
  },
  text: {
    color: '#fff',
    fontWeight: '400',
    fontSize: 18,
  },
}); 