import { useState } from 'react';

const createAppStateContext = () => {
  const [addTodoModalOpen, setAddTodoModalOpen] = useState(false);

  function openAddTodoModal() {
    setAddTodoModalOpen(true);
  }

  function closeAddTodoModal() {
    setAddTodoModalOpen(false);
  }

  return {
    addTodoModalOpen,
    openAddTodoModal,
    closeAddTodoModal
  }
  
}

export default createAppStateContext
