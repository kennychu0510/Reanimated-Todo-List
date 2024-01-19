import { useContext } from 'react';
import { TodoContext } from '../contexts';

const useTodoList = () => {
  const appState = useContext(TodoContext);
  if (!appState) {
    throw new Error('useTodoList must be used within an AppStateContextProvider');
  }
  return appState;
};

export default useTodoList;
