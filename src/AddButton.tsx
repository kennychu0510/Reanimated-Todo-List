import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import Animated, { Easing, useSharedValue, withDelay, withTiming } from 'react-native-reanimated';
import { DELAY } from './constants';
import useAppState from './hooks/useAppState';

const AddButton = () => {
  const {openAddTodoModal} = useAppState();
  const offset = useSharedValue(500);


  useEffect(() => {
    offset.value = withDelay(DELAY.HEADER * 2, withTiming(0, { duration: 1000, easing: Easing.inOut(Easing.ease) }));
  }, []);

  return (
    <Animated.View style={{...styles.button, transform: [{translateY: offset}]}}>
      <Button mode='elevated' icon={'plus'} onPress={openAddTodoModal}>
        Add
      </Button>
    </Animated.View>
  );
};

export default AddButton;

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
  },
});
