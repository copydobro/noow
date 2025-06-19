import { Tabs } from 'expo-router';
import { Brain, ChartBar as BarChart3, User } from 'lucide-react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withTiming,
  interpolate,
  withSequence,
  withDelay
} from 'react-native-reanimated';
import { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

// Создаем анимированные компоненты
const AnimatedBrain = Animated.createAnimatedComponent(Brain);
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
  const translateY = useSharedValue(0);
  const glowOpacity = useSharedValue(0);
  const backgroundScale = useSharedValue(0);

  useEffect(() => {
    if (focused) {
      // Плавная анимация при активации
      scale.value = withSpring(1.05, { damping: 15, stiffness: 200 });
      translateY.value = withSpring(0, { damping: 15, stiffness: 200 });
      glowOpacity.value = withTiming(1, { duration: 300 });
      backgroundScale.value = withSpring(1, { damping: 15, stiffness: 200 });
    } else {
      scale.value = withSpring(1, { damping: 15, stiffness: 200 });
      translateY.value = withSpring(0, { damping: 15, stiffness: 200 });
      glowOpacity.value = withTiming(0, { duration: 200 });
      backgroundScale.value = withSpring(0, { damping: 15, stiffness: 200 });
    }
  }, [focused]);

  const animatedIconStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { translateY: translateY.value }
    ],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
    transform: [{ scale: backgroundScale.value }],
  }));

  const AnimatedIcon = Animated.createAnimatedComponent(IconComponent);

  return (
    <View style={styles.iconContainer}>
      {/* Background glow effect */}
      <Animated.View style={[styles.iconBackground, glowStyle]} />
      
      {/* Main icon */}
      <Animated.View style={animatedIconStyle}>
        <AnimatedIcon />
      </Animated.View>
    </View>
  );
}

export default function TabLayout() {
  return (
    <View style={styles.container}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: styles.tabBarStyle,
          tabBarActiveTintColor: '#FF6B35',
          tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.4)',
          tabBarShowLabel: false,
          tabBarIconStyle: styles.tabBarIconStyle,
          tabBarBackground: () => (
            <View style={styles.tabBarBackground}>
              {/* Gradient overlay */}
              <View style={styles.gradientOverlay} />
              
              {/* Top border line */}
              <View style={styles.topBorderLine} />
              
              {/* Subtle pattern */}
              <View style={styles.patternOverlay} />
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
    height: 64,
    paddingTop: 0,
    paddingBottom: 8,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabBarIconStyle: {
    marginTop: 8, // Опускаем иконки на 8px вниз (примерно 20% от высоты навбара)
    marginBottom: 0,
  },
  tabBarBackground: {
    flex: 1,
    backgroundColor: 'rgba(8, 8, 8, 0.95)',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
    position: 'relative',
    // Добавляем тень для глубины
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 107, 53, 0.02)',
  },
  topBorderLine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(255, 107, 53, 0.2)',
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  patternOverlay: {
    position: 'absolute',
    top: 1,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
  },
  iconContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    margin: 0,
    padding: 0,
  },
  iconBackground: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 107, 53, 0.1)',
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
});