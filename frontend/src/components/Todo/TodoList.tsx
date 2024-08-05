// frontend/src/components/Todo/TodoList.tsx
import React, { useEffect, useState } from 'react';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../services/todoService';
import TodoItem from './TodoItem';

interface Todo {
  id: string;
  text: string;
  isCompleted: boolean;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoText, setNewTodoText] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await getTodos();
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const handleCreateTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createTodo({ text: newTodoText });
      setNewTodoText('');
      fetchTodos();
    } catch (error) {
      console.error('Error creating todo:', error);
    }
  };

  const handleToggleTodo = async (id: string, isCompleted: boolean) => {
    try {
      await updateTodo(id, { isCompleted: !isCompleted });
      fetchTodos();
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      await deleteTodo(id);
      fetchTodos();
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div>
      <h2>Todo List</h2>
      <form onSubmit={handleCreateTodo}>
        <input
          type="text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          placeholder="Enter new todo"
          required
        />
        <button type="submit">Add Todo</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={handleToggleTodo}
            onDelete={handleDeleteTodo}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;