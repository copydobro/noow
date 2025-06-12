import { Tabs } from 'expo-router';
import { Brain, Activity, ChartBar as BarChart3, User } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#0A0A0A',
          borderTopColor: 'rgba(255, 107, 53, 0.2)',
          borderTopWidth: 1,
          paddingTop: 8,
          paddingBottom: 8,
          height: 80,
        },
        tabBarActiveTintColor: '#FF6B35',
        tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.4)',
        tabBarLabelStyle: {
          fontSize: 10,
          fontFamily: 'Inter-SemiBold',
          marginTop: 4,
          letterSpacing: 0.5,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'РИТМ',
          tabBarIcon: ({ size, color }) => (
            <Brain size={size} color={color} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="activity"
        options={{
          title: 'АКТИВНОСТЬ',
          tabBarIcon: ({ size, color }) => (
            <Activity size={size} color={color} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          title: 'СТАТИСТИКА',
          tabBarIcon: ({ size, color }) => (
            <BarChart3 size={size} color={color} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'ПРОФИЛЬ',
          tabBarIcon: ({ size, color }) => (
            <User size={size} color={color} strokeWidth={2} />
          ),
        }}
      />
    </Tabs>
  );
}