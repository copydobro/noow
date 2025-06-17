import { Stack } from 'expo-router';

export default function CognitiveLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="nback" />
      <Stack.Screen name="stroop" />
    </Stack>
  );
}