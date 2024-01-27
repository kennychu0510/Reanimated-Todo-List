import { StatusBar } from 'expo-status-bar';
import { PaperProvider } from 'react-native-paper';
import Landing from './src/Landing';
import { AppStateContext, TodoContext } from './src/contexts';
import createAppStateContext from './src/contexts/createAppStateContext';
import createTodoListContext from './src/contexts/createTodoListContext';

export default function App() {
  const todoManager = createTodoListContext();
  const appState = createAppStateContext();

  return (
    <PaperProvider>
      <TodoContext.Provider value={todoManager}>
        <AppStateContext.Provider value={appState}>
            <Landing />
            <StatusBar style='auto' />
        </AppStateContext.Provider>
      </TodoContext.Provider>
    </PaperProvider>
  );
}
