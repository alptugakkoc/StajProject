import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';// jsPDF ile tablo oluşturmak için 
import './TodoList.css';

function TodoList({ user, todos, saveTodos }) {
  const [newTodo, setNewTodo] = useState('');
  const [newDate, setNewDate] = useState('');
  const [editingTodo, setEditingTodo] = useState(null);
  const [editingText, setEditingText] = useState('');

  const addTodo = () => {
    if (newTodo.trim() && newDate) {
      const updatedTodos = [
        ...todos,
        {
          id: Date.now(),
          text: newTodo,
          date: newDate,
          completed: false
        }
      ];
      saveTodos(updatedTodos);
      setNewTodo('');
      setNewDate('');
    }
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    saveTodos(updatedTodos);
  };

  const startEditing = (todo) => {
    setEditingTodo(todo);
    setEditingText(todo.text);
  };

  const saveEdit = () => {
    const updatedTodos = todos.map(todo =>
      todo.id === editingTodo.id ? { ...todo, text: editingText } : todo
    );
    saveTodos(updatedTodos);
    setEditingTodo(null);
  };

  const toggleComplete = (id) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    saveTodos(updatedTodos);
  };

  const exportToExcel = () => {   // EXCEL İÇİN GEREKLİ OLAN KODLAR 
    const ws = XLSX.utils.json_to_sheet(todos.map(todo => ({
      Todo: todo.text,
      Date: todo.date,
      Completed: todo.completed ? 'Yes' : 'No',
    })));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, `${user}'s Todo List`);
    XLSX.writeFile(wb, 'todo_list.xlsx');
  };

  const exportToPDF = () => {  // PDF İÇİN GEREKLİ OLAN KODLAR 
    const doc = new jsPDF();
    const tableColumn = ["Todo","Date ","Complated"];
    const tableRows = todos.map(todo => [
      todo.text,
      todo.date,
      todo.completed ? 'Yes' : ' No '
    ]);
    doc.autoTable(tableColumn,tableRows,{startY:20});
    doc.text(`${user}'s Todo List`,14,15 );// backtik altgr+virgül
    doc.save('todo_list.pdf'); 
  }

  return (
    <div className="todo-list">
      <h1>{`${user}'s Todo List`}</h1>
      <div className="todo-input-container">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="New todo"
        />
        <input
          type="date"
          value={newDate}
          onChange={(e) => setNewDate(e.target.value)}
        />
        <button className="add-button" onClick={addTodo}>Add Todo </button>
        <button className="export-button" onClick={exportToExcel}>Export to Excel</button>
        <button className="export-button" onClick={exportToPDF}>Export to PDF</button>
      </div>
      <table className="todo-table">
        <thead>
          <tr>
            <th>Todo</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.map(todo => (
            <tr key={todo.id}>
              <td className={todo.completed ? 'completed' : ''}>
                {editingTodo?.id === todo.id ? (
                  <input
                    type="text"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                  />
                ) : (
                  todo.text
                )}
              </td>
              <td>{todo.date}</td>
              <td>
                <div className="action-buttons">
                  {editingTodo?.id === todo.id ? (
                    <>
                      <button className="action-button save-button" onClick={saveEdit}>Save</button>
                      <button className="action-button cancel-button" onClick={() => setEditingTodo(null)}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button className="action-button edit-button" onClick={() => startEditing(todo)}>Edit</button>
                      <button className="action-button delete-button" onClick={() => deleteTodo(todo.id)}>Delete</button>
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => toggleComplete(todo.id)}
                        className="complete-checkbox"
                      />
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TodoList;
