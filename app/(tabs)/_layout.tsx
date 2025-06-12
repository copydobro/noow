import { Tabs } from 'expo-router';
import { Brain, Activity, ChartBar as BarChart3, User } from 'lucide-react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withTiming,
  interpolate,
  runOnJS,
  withSequence,
  withDelay
} from 'react-native-reanimated';
import { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

// Создаем анимированные компоненты
const AnimatedBrain = Animated.createAnimatedComponent(Brain);
const AnimatedActivity = Animated.createAnimatedComponent(Activity);
const AnimatedBarChart = Animated.createAnimatedComponent(BarChart3);
const AnimatedUser = Animated.createAnimatedComponent(User);

// Компонент для анимированной иконки
function AnimatedTabIcon({ 
  IconComponent, 
  focused, 
  color, 
  size = 20 
}: { 
  IconComponent: any;
  focused: boolean;
  color: string;
  size?: number;
}) {
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);
  const glowOpacity = useSharedValue(0);
  const pulseScale = useSharedValue(1);

  useEffect(() => {
    if (focused) {
      // Последовательность анимаций при активации
      scale.value = withSequence(
        withTiming(1.2, { duration: 150 }),
        withSpring(1.1, { damping: 12, stiffness: 200 })
      );
      
      rotation.value = withSequence(
        withTiming(360, { duration: 400 }),
        withTiming(0, { duration: 0 })
      );
      
      glowOpacity.value = withTiming(1, { duration: 200 });
      
      // Пульсация
      pulseScale.value = withSequence(
        withDelay(200, withTiming(1.15, { duration: 300 })),
        withTiming(1, { duration: 300 })
      );
    } else {
      scale.value = withSpring(1, { damping: 15, stiffness: 150 });
      rotation.value = withTiming(0, { duration: 200 });
      glowOpacity.value = withTiming(0, { duration: 200 });
      pulseScale.value = withTiming(1, { duration: 200 });
    }
  }, [focused]);

  const animatedIconStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { rotate: `${rotation.value}deg` }
    ],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
    transform: [{ scale: pulseScale.value }],
  }));

  const AnimatedIcon = Animated.createAnimatedComponent(IconComponent);

  return (
    <View style={styles.iconContainer}>
      {/* Glow effect */}
      <Animated.View style={[styles.glowEffect, glowStyle]} />
      
      {/* Main icon */}
      <Animated.View style={animatedIconStyle}>
        <AnimatedIcon 
          size={focused ? 22 : 20} 
          color={color} 
          strokeWidth={focused ? 2 : 1.5} 
        />
      </Animated.View>
    </View>
  );
}

// Компонент для анимированного фона таба
function AnimatedTabBackground() {
  const backgroundOpacity = useSharedValue(0);
  const backgroundScale = useSharedValue(0.8);

  useEffect(() => {
    backgroundOpacity.value = withTiming(1, { duration: 500 });
    backgroundScale.value = withSpring(1, { damping: 15, stiffness: 100 });
  }, []);

  const backgroundStyle = useAnimatedStyle(() => ({
    opacity: backgroundOpacity.value,
    transform: [{ scale: backgroundScale.value }],
  }));

  return (
    <Animated.View style={[styles.tabBackground, backgroundStyle]}>
      {/* Gradient lines */}
      <View style={styles.gradientLine1} />
      <View style={styles.gradientLine2} />
      <View style={styles.gradientLine3} />
    </Animated.View>
  );
}

export default function TabLayout() {
  return (
    <View style={styles.container}>
      <AnimatedTabBackground />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: styles.tabBarStyle,
          tabBarActiveTintColor: '#FF6B35',
          tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.25)',
          tabBarShowLabel: false,
          tabBarIconStyle: styles.tabBarIconStyle,
          tabBarBackground: () => (
            <View style={styles.tabBarBackground}>
              {/* Holographic effect */}
              <View style={styles.holographicOverlay} />
              
              {/* Animated border */}
              <View style={styles.animatedBorder} />
            </View>
          ),
        }}>
        <Tabs.Screen
          name="index"
          options={{
            tabBarIcon: ({ color, focused }) => (
              <AnimatedTabIcon 
                IconComponent={Brain}
                focused={focused}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="activity"
          options={{
            tabBarIcon: ({ color, focused }) => (
              <AnimatedTabIcon 
                IconComponent={Activity}
                focused={focused}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="stats"
          options={{
            tabBarIcon: ({ color, focused }) => (
              <AnimatedTabIcon 
                IconComponent={BarChart3}
                focused={focused}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            tabBarIcon: ({ color, focused }) => (
              <AnimatedTabIcon 
                IconComponent={User}
                focused={focused}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  tabBarStyle: {
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    elevation: 0,
    shadowOpacity: 0,
    height: 60,
    paddingTop: 4,
    paddingBottom: 8,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabBarIconStyle: {
    marginTop: 0,
  },
  tabBarBackground: {
    flex: 1,
    backgroundColor: 'rgba(10, 10, 10, 0.98)',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  holographicOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(255, 107, 53, 0.4)',
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
  },
  animatedBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'linear-gradient(90deg, transparent, #FF6B35, transparent)',
    opacity: 0.6,
  },
  iconContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
  },
  glowEffect: {
    position: 'absolute',
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 107, 53, 0.12)',
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
  },
  tabBackground: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    zIndex: -1,
  },
  gradientLine1: {
    position: 'absolute',
    top: 0,
    left: '10%',
    width: '20%',
    height: 1,
    backgroundColor: 'rgba(255, 107, 53, 0.15)',
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
  },
  gradientLine2: {
    position: 'absolute',
    top: 0,
    left: '40%',
    width: '20%',
    height: 1,
    backgroundColor: 'rgba(255, 107, 53, 0.25)',
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 5,
  },
  gradientLine3: {
    position: 'absolute',
    top: 0,
    left: '70%',
    width: '20%',
    height: 1,
    backgroundColor: 'rgba(255, 107, 53, 0.15)',
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
  },
});