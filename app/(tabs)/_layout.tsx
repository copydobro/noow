import { Tabs } from 'expo-router';
import { Brain, Activity, ChartBar as BarChart3, User } from 'lucide-react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useEffect } from 'react';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#0A0A0A',
          borderTopColor: 'rgba(255, 107, 53, 0.08)',
          borderTopWidth: 1,
          paddingTop: 8,
          paddingBottom: 8,
          height: 70,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarActiveTintColor: '#FF6B35',
        tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.3)',
        tabBarShowLabel: false,
        tabBarIconStyle: {
          marginTop: 2,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ size, color, focused }) => {
            const AnimatedBrain = Animated.createAnimatedComponent(Brain);
            const scale = useSharedValue(focused ? 1.1 : 1);
            
            useEffect(() => {
              scale.value = withSpring(focused ? 1.1 : 1, {
                damping: 15,
                stiffness: 150,
              });
            }, [focused]);

            const animatedStyle = useAnimatedStyle(() => ({
              transform: [{ scale: scale.value }],
            }));

            return (
              <Animated.View style={animatedStyle}>
                <Brain 
                  size={focused ? 26 : 24} 
                  color={color} 
                  strokeWidth={focused ? 2.5 : 1.8} 
                />
              </Animated.View>
            );
          },
        }}
      />
      <Tabs.Screen
        name="activity"
        options={{
          tabBarIcon: ({ size, color, focused }) => {
            const AnimatedActivity = Animated.createAnimatedComponent(Activity);
            const scale = useSharedValue(focused ? 1.1 : 1);
            
            useEffect(() => {
              scale.value = withSpring(focused ? 1.1 : 1, {
                damping: 15,
                stiffness: 150,
              });
            }, [focused]);

            const animatedStyle = useAnimatedStyle(() => ({
              transform: [{ scale: scale.value }],
            }));

            return (
              <Animated.View style={animatedStyle}>
                <Activity 
                  size={focused ? 26 : 24} 
                  color={color} 
                  strokeWidth={focused ? 2.5 : 1.8} 
                />
              </Animated.View>
            );
          },
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          tabBarIcon: ({ size, color, focused }) => {
            const AnimatedBarChart = Animated.createAnimatedComponent(BarChart3);
            const scale = useSharedValue(focused ? 1.1 : 1);
            
            useEffect(() => {
              scale.value = withSpring(focused ? 1.1 : 1, {
                damping: 15,
                stiffness: 150,
              });
            }, [focused]);

            const animatedStyle = useAnimatedStyle(() => ({
              transform: [{ scale: scale.value }],
            }));

            return (
              <Animated.View style={animatedStyle}>
                <BarChart3 
                  size={focused ? 26 : 24} 
                  color={color} 
                  strokeWidth={focused ? 2.5 : 1.8} 
                />
              </Animated.View>
            );
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ size, color, focused }) => {
            const AnimatedUser = Animated.createAnimatedComponent(User);
            const scale = useSharedValue(focused ? 1.1 : 1);
            
            useEffect(() => {
              scale.value = withSpring(focused ? 1.1 : 1, {
                damping: 15,
                stiffness: 150,
              });
            }, [focused]);

            const animatedStyle = useAnimatedStyle(() => ({
              transform: [{ scale: scale.value }],
            }));

            return (
              <Animated.View style={animatedStyle}>
                <User 
                  size={focused ? 26 : 24} 
                  color={color} 
                  strokeWidth={focused ? 2.5 : 1.8} 
                />
              </Animated.View>
            );
          },
        }}
      />
    </Tabs>
  );
}