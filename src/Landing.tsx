import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import AddButton from './AddButton';
import AddTodoModal from './AddTodoModal';
import Header from './Header';
import useAppState from './hooks/useAppState';
import useTodoList from './hooks/useTodoList';
import ToDoItem from './ToDoItem';

const Landing = () => {
  const appState = useAppState();
  const { todoList } = useTodoList();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Header />
        <FlatList style={styles.TodoList} data={Array.from(todoList.values())} renderItem={({ item, index }) => <ToDoItem {...item} order={index} />} />
        <AddTodoModal visible={appState.addTodoModalOpen} />
        <AddButton />
      </View>
    </SafeAreaView>
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
