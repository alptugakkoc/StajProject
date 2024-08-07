import React, { useState, useEffect } from 'react';
import Login from './Login';  
import TodoList from './TodoList';  

function App() {
  const [user, setUser] = useState(null);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    if (user) {
      loadTodos();
    }
  }, [user]);

  const loadTodos = () => {
    const storedTodos = localStorage.getItem(`todos_${user}`);
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    } else {
      setTodos([]);
    }
  };

  const saveTodos = (updatedTodos) => {
    localStorage.setItem(`todos_${user}`, JSON.stringify(updatedTodos));
    setTodos(updatedTodos);
  };

  return (
    <div className="App">
      {user ? (
        <TodoList
          user={user}
          todos={todos}
          saveTodos={saveTodos}
          loadTodos={loadTodos}
        />
      ) : (
        <Login setUser={setUser} />
      )}
    </div>
  );
}

export default App;
