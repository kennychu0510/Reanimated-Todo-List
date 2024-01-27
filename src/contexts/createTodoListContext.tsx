import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

export type Todo = {
  id: string;
  detail: string;
  done: boolean;
  dateAdded: Date;
};

const createTodoListContext = () => {
  const [todoList, setTodoList] = useState<Todo[]>([]);

  useEffect(() => {
    async function getTodoList() {
      const toDoListString = await AsyncStorage.getItem('todoList');
      if (!toDoListString) {
        return;
      }
      const todoListMap = JSON.parse(toDoListString);
      setTodoList(todoListMap);
    }

    getTodoList();
  }, []);

  async function addTodo(todo: Todo) {
    const newTodoList: Todo[] = [...todoList, todo];
    setTodoList(newTodoList);
    await AsyncStorage.setItem('todoList', JSON.stringify(newTodoList));
  }

  async function deleteTodo(id: string) {
    const newTodoList = todoList.filter((todo) => todo.id !== id);
    setTodoList(newTodoList);
    await AsyncStorage.setItem('todoList', JSON.stringify(newTodoList));
  }

  function checkTodo(id: string) {
    setTodoList(
      todoList.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            done: !todo.done,
          };
        }
        return todo;
      })
    );
  }

  return { todoList, addTodo, deleteTodo, checkTodo };
};

export default createTodoListContext;
