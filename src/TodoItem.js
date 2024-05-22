import React from 'react';
import './TodoItem.css'; // Import CSS file

const TodoItem = ({ todo, toggleTodo }) => {
//   console.log('TodoItem - todo:', todo); // Debug log

  return (
    <li>{todo.text}</li>
  );
};

export default TodoItem;
