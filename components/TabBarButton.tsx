import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  StyleSheet,
} from 'react-native';
import React, { useEffect } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

export default function TabBarButton({
  onPress,
  onLongPress,
  isFocused,
  routeName,
  color,
  label,
}: {
  onPress: Function;
  onLongPress: Function;
  isFocused: boolean;
  routeName: string;
  color: string;
  label: string;
}) {
  const icon = {
    index: (props: any) => (
      <Ionicons name="home-outline" size={24} {...props} />
    ),
    settings: (props: any) => (
      <Ionicons name="settings-outline" size={24} {...props} />
    ),
    info: (props: any) => (
      <Ionicons name="information-circle-outline" size={24} {...props} />
    ),
    result: (props: any) => (
      <Ionicons name="document-text-outline" size={24} {...props} />
    ),
  };

  const scale = useSharedValue(0);

  useEffect(() => {
    // 创建弹簧动画
    scale.value = withSpring(
      typeof isFocused === 'boolean' ? (isFocused ? 1 : 0) : isFocused,
      { duration: 100 }
    );
  }, [scale, isFocused]);

  const animatedTextStyle = useAnimatedStyle(() => {
    // scale.value为0时，opacity为1；scale.value为1时，opacity为0
    const opacity = interpolate(scale.value, [0, 1], [1, 0]);
    return {
      opacity,
    };
  });

  const animatedIconStyle = useAnimatedStyle(() => {
    const scaleValue = interpolate(scale.value, [0, 1], [1, 1.2]);
    const top = interpolate(scale.value, [0, 1], [0, 9]);
    return {
      transform: [{ scale: scaleValue }],
      top,
    };
  });

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.tabBarItem}
    >
      <Animated.View style={animatedIconStyle}>
        {icon[routeName]({ color })}
      </Animated.View>

      <Animated.Text style={[{ fontSize: 12 }, animatedTextStyle]}>
        {label}
      </Animated.Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tabBarItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
