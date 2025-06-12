import { Tabs } from 'expo-router';
import { Brain, Activity, ChartBar as BarChart3, User } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#0A0A0A',
          borderTopColor: 'rgba(255, 107, 53, 0.1)',
          borderTopWidth: 1,
          paddingTop: 6,
          paddingBottom: 6,
          height: 60,
        },
        tabBarActiveTintColor: '#FF6B35',
        tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.25)',
        tabBarShowLabel: false,
        tabBarIconStyle: {
          marginTop: 4,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ size, color, focused }) => (
            <Brain 
              size={focused ? size + 2 : size - 2} 
              color={color} 
              strokeWidth={focused ? 2 : 1.5} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="activity"
        options={{
          tabBarIcon: ({ size, color, focused }) => (
            <Activity 
              size={focused ? size + 2 : size - 2} 
              color={color} 
              strokeWidth={focused ? 2 : 1.5} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          tabBarIcon: ({ size, color, focused }) => (
            <BarChart3 
              size={focused ? size + 2 : size - 2} 
              color={color} 
              strokeWidth={focused ? 2 : 1.5} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ size, color, focused }) => (
            <User 
              size={focused ? size + 2 : size - 2} 
              color={color} 
              strokeWidth={focused ? 2 : 1.5} 
            />
          ),
        }}
      />
    </Tabs>
  );
}