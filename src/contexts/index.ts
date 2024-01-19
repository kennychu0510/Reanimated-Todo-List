import { createContext } from 'react';
import createAppStateContext from './createAppStateContext';
import createTodoListContext from './createTodoListContext';

export const TodoContext = createContext<ReturnType<typeof createTodoListContext> | null>(null);

export const AppStateContext = createContext<ReturnType<typeof createAppStateContext> | null>(null);
