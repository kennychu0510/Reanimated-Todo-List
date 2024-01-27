import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AddButton from './AddButton';
import AddTodoModal from './AddTodoModal';
import Header from './Header';
import ToDoItem from './ToDoItem';
import useAppState from './hooks/useAppState';
import useTodoList from './hooks/useTodoList';

const Landing = () => {
  const appState = useAppState();
  const { todoList } = useTodoList();

  console.log(todoList)
  
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Header />
          <FlatList style={styles.TodoList} data={todoList} renderItem={({item, index}) => <ToDoItem {...item} order={index} />} />
          <AddTodoModal visible={appState.addTodoModalOpen} />
          <AddButton />
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Landing;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  TodoList: {
    paddingHorizontal: 20,
  },
});
