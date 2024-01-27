import LottieView from 'lottie-react-native';
import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useDerivedValue, useSharedValue, withDelay, withTiming } from 'react-native-reanimated';
import { Todo } from './contexts/createTodoListContext';
import useTodoList from './hooks/useTodoList';
import CheckboxLottie from './lottie/checkbox.json';

const DELAY = 100;
const REMOVE_VELOCITY_THRESHOLD = -500;

const ToDoItem = (props: Todo & { order: number }) => {
  const { deleteTodo, checkTodo } = useTodoList();
  const { detail, order } = props;
  const xOffset = useSharedValue(0);
  const opacity = useSharedValue(0);
  const deleteButtonRight = useSharedValue(-100);
  const lottieRef = useRef<LottieView>(null);
  const deleteButtonOpacity = useSharedValue(0);
  const lottieOpacity = useSharedValue(1);

  useEffect(() => {
    opacity.value = withDelay(DELAY * order, withTiming(1, { duration: 1000 }));
  }, []);

  const pan = Gesture.Pan()
    .onUpdate((e) => {
      xOffset.value = e.translationX;
    })
    .onTouchesDown(() => {
      deleteButtonRight.value = withTiming(-100, { duration: 1000 });
      deleteButtonOpacity.value = withTiming(0, { duration: 1000 });
      lottieOpacity.value = withTiming(1, { duration: 1000 });
    })
    .onEnd((e) => {
      if (e.velocityX < REMOVE_VELOCITY_THRESHOLD) {
        xOffset.value = withTiming(-1000, { duration: 1000 });
        deleteButtonRight.value = withTiming(0, { duration: 1000 });
        deleteButtonOpacity.value = withTiming(1, { duration: 1000 });
        lottieOpacity.value = withTiming(0, { duration: 1000 });
      } else {
        xOffset.value = withTiming(0, { duration: 1000 });
      }
    });

  function setDone() {
    checkTodo(props.id);
  }

  function onDelete() {
    xOffset.value = withTiming(-1000, { duration: 1000 }, () => {
      deleteTodo(props.id);
    });
  }

  useEffect(() => {
    if (props.done) {
      lottieRef.current?.reset();
      lottieRef.current?.play();
    } else {
      lottieRef.current?.reset();
    }
  }, [props.done, lottieRef]);

  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={{ ...styles.container, opacity }}>
        <Text style={{ ...styles.order, ...styles.text }}>{order + 1}. </Text>
        <Text style={{ ...styles.text }}>{detail}</Text>
        <View style={{ marginLeft: 'auto' }}>
          <Animated.View style={{ opacity: lottieOpacity }}>
            <TouchableOpacity onPress={setDone}>
              <LottieView
                ref={lottieRef}
                source={CheckboxLottie}
                loop={false}
                style={{
                  marginTop: -40,
                  marginRight: -40,
                  width: 100,
                  height: 100,
                }}
              />
            </TouchableOpacity>
          </Animated.View>
          <Animated.View style={{ position: 'absolute', top: -3, right: deleteButtonRight, opacity: deleteButtonOpacity }}>
            <TouchableOpacity style={{ backgroundColor: 'red', padding: 5 }} onPress={onDelete}>
              <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Delete</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Animated.View>
    </GestureDetector>
  );
};

export default ToDoItem;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    flexDirection: 'row',
    height: 40,
  },
  order: {
    width: 20,
  },
  text: {
    fontSize: 18,
    fontFamily: 'AmericanTypewriter',
  },
});
