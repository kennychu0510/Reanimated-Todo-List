import { Map } from 'immutable';
import _ from 'lodash';
import { useState } from 'react';

export type Todo = {
  detail: string;
  done: boolean;
  dateAdded: Date;
}

const createTodoListContext = () => {
  const [todoList, setTodoList] = useState<Map<string, Todo>>(Map<string, Todo>());

  function addTodo(todo: Todo) {
    const newId = _.uniqueId('todo_');
    setTodoList(todoList.set(newId, todo));
  }

  function deleteTodo(id: string) {
    setTodoList(todoList.delete(id));
  }

  function checkTodo(id: string) {
    setTodoList(todoList.update(id, (todo: any) => ({...todo, done: !todo.done})))
  }

  return {todoList, addTodo, deleteTodo, checkTodo};
};

export default createTodoListContext;
