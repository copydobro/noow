import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="sign-in" />
      <Stack.Screen name="sign-up" />
      <Stack.Screen name="consent" />
      <Stack.Screen name="basic-info" />
      <Stack.Screen name="permissions" />
    </Stack>
  );
}