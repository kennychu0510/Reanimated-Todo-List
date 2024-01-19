import { useContext } from 'react';
import { AppStateContext } from '../contexts';

const useAppState = () => {
  const appState = useContext(AppStateContext);
  if (!appState) {
    throw new Error('useAppState must be used within an AppStateContextProvider');
  }
  return appState
}

export default useAppState
