import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ImageBackground, View, StyleSheet, Platform } from 'react-native';

export default function AuthLayout() {
  const webImageStyle = Platform.OS === 'web'
    ? { objectFit: 'cover', objectPosition: 'center', maxWidth: '100vw', maxHeight: '100vh' }
    : undefined;
  return (
    <ImageBackground 
      source={require('../../assets/images/authback.png')}
      style={styles.background}
      resizeMode="cover"
      imageStyle={webImageStyle as any}
    >
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    minWidth: 390,
    width: '100%',
    minHeight: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 