import React from 'react';

const TodoItem = ({ todo, toggleComplete, removeTodo }) => {
  return (
    <tr>
      <td>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleComplete(todo.id)}
        />
      </td>
      <td style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
        {todo.text}
      </td>
      <td>
        <button
          className="remove-button"
          onClick={() => removeTodo(todo.id)}
        >
          Sil
        </button>
      </td>
    </tr>
  );
};

export default TodoItem;

