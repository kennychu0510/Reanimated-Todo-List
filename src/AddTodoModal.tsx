import React, { useEffect, useRef } from 'react';
import { Modal, ModalProps, StyleSheet, Text, SafeAreaView, View, TouchableWithoutFeedback, TextInput, KeyboardAvoidingView } from 'react-native';
import useAppState from './hooks/useAppState';
import Animated, { Easing, useSharedValue, withTiming } from 'react-native-reanimated';
import { Button } from 'react-native-paper';
import useTodoList from './hooks/useTodoList';
import _ from 'lodash';

interface Props extends Omit<ModalProps, 'children'> {}

const AddTodoModal = (props: Props) => {
  const { closeAddTodoModal, addTodoModalOpen } = useAppState();
  const { addTodo } = useTodoList();
  const input = useRef<string>('');
  const backdropOpacity = useSharedValue(0);
  const offset = useSharedValue(500);

  useEffect(() => {
    backdropOpacity.value = withTiming(addTodoModalOpen ? 1 : 0, { duration: 500, easing: Easing.inOut(Easing.ease) });
    offset.value = withTiming(addTodoModalOpen ? 0 : 500, { duration: 500, easing: Easing.inOut(Easing.ease) });
  }, [addTodoModalOpen]);

  function onClose() {
    backdropOpacity.value = withTiming(0, { duration: 500, easing: Easing.inOut(Easing.ease) });
    offset.value = withTiming(500, { duration: 500, easing: Easing.inOut(Easing.ease) });
    setTimeout(() => {
      closeAddTodoModal();
    }, 500);
  }

  function onAddTodo() {
    if (!input.current) {
      return;
    }
    addTodo({
      dateAdded: new Date(),
      detail: input.current,
      done: false,
    });
    onClose();
  }

  return (
    <Modal {...props} transparent statusBarTranslucent>
      <TouchableWithoutFeedback onPress={onClose}>
        <Animated.View style={{ ...styles.backdrop, opacity: backdropOpacity }}>
          <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView style={{ marginTop: 'auto' }} behavior='padding'>
              <Animated.View style={{ ...styles.addTodoContainer, transform: [{ translateY: offset }] }}>
                <Text style={{ fontWeight: 'bold', fontSize: 24, fontFamily: 'AmericanTypewriter' }}>Add a Todo</Text>
                <TextInput
                  onChangeText={(text) => (input.current = text)}
                  style={{ borderWidth: 1, borderColor: '#d3d3d3', borderRadius: 5, minHeight: 100, marginVertical: 15, padding: 5 }}
                  multiline
                ></TextInput>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Button mode='outlined' textColor='black' style={{ flex: 1 }}>
                    Cancel
                  </Button>
                  <View style={{ width: 50 }} />
                  <Button mode='contained' style={{ flex: 1 }} onPress={onAddTodo}>
                    Add
                  </Button>
                </View>
              </Animated.View>
            </KeyboardAvoidingView>
          </SafeAreaView>
        </Animated.View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default AddTodoModal;

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  addTodoContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    margin: 15,
    padding: 15,
    marginTop: 'auto',
  },
});
