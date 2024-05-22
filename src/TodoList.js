import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import './TodoList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'; // Import icons

const TodoList = () => {
  const [todos, setTodos] = useState(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    if (storedTodos && storedTodos.length > 0) {
      return storedTodos;
    } else {
      return [
        { id: 1, text: 'Sample Todo 1', completed: false },
        { id: 2, text: 'Sample Todo 2', completed: true }
      ];
    }
  });
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const toggleTodo = (id) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim() !== '') {
      const newTodo = {
        id: todos.length > 0 ? todos[todos.length - 1].id + 1 : 1,
        text: inputText,
        completed: false
      };
      setTodos([...todos, newTodo]);
      setInputText('');
    }
  };

  const handleRemoveTodo = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
  };

  return (
    <div className="todo-list">
      <form onSubmit={handleFormSubmit} className="todo-form">
        <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          placeholder="Add a new todo..."
        />
        <button type="submit"><FontAwesomeIcon icon={faPlus} /></button>
      </form>
      <ul className="todo-items">
        {todos.map(todo => (
          <li key={todo.id} className="todo-item">
            <TodoItem todo={todo} toggleTodo={toggleTodo} />
            <button className="remove-button" onClick={() => handleRemoveTodo(todo.id)}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
