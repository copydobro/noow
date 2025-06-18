import { Stack } from 'expo-router';

export default function SocialLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="leaderboard" />
      <Stack.Screen name="challenges" />
    </Stack>
  );
}