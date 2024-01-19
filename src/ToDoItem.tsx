import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { Todo } from './contexts/createTodoListContext';
import Animated, { useDerivedValue, useSharedValue, withDelay, withTiming } from 'react-native-reanimated';

const DELAY = 100;

const ToDoItem = (props: Todo & { order: number }) => {
  const { detail, order } = props;
  const offset = useSharedValue(-100);
  const opacity = useDerivedValue(() => {
    return 1 + offset.value / 100;
  });

  useEffect(() => {
    offset.value = withDelay(DELAY * order, withTiming(0, { duration: 1000 }));
  }, []);
  return (
    <Animated.View style={{ ...styles.container, opacity, transform: [{ translateX: offset }] }}>
      <Text style={{ ...styles.order, ...styles.text }}>{order + 1}. </Text>
      <Text style={{ ...styles.text }}>{detail}</Text>
    </Animated.View>
  );
};

export default ToDoItem;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    flexDirection: 'row',
  },
  order: {
    width: 20,
  },
  text: {
    fontSize: 18,
    fontFamily: 'AmericanTypewriter',
  },
});
