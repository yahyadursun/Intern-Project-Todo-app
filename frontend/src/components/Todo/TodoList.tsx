import React, { useEffect, useState } from 'react';
import { createTodo, getTodos, updateTodo, deleteTodo } from '../services/todoService';
import TodoItem from './TodoItem';
import { getCurrentUser } from '../services/authService';

interface Todo {
  id: string;
  text: string;
  isCompleted: boolean;
  expireDate?: string;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoText, setNewTodoText] = useState('');

  const user = getCurrentUser();
  const userId = user ? user.userId : ''; // Kullanıcı ID'sini alın

  useEffect(() => {
    if (userId) {
      fetchTodos();
    }
  }, [userId]);

  const fetchTodos = async () => {
    try {
      console.log('Fetching todos...');
      const response = await getTodos(userId);
      console.log('Todos fetched:', response.data);
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const handleCreateTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) {
      console.error('No user ID found');
      return;
    }
    console.log('Creating todo with text:', newTodoText);
    try {
      await createTodo({ text: newTodoText, isCompleted: false, userId });
      setNewTodoText('');
      fetchTodos();
    } catch (error) {
      console.error('Error creating todo:', error);
    }
  };

  const handleToggleTodo = async (id: string, isCompleted: boolean) => {
    if (!userId) {
      console.error('No user ID found');
      return;
    }
    console.log('Toggling todo with id:', id);
    try {
      const todo = todos.find((todo) => todo.id === id);
      if (todo) {
        await updateTodo(id, { text: todo.text, isCompleted: !isCompleted, userId, expireDate: todo.expireDate });
        fetchTodos();
      }
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleDeleteTodo = async (id: string) => {
    if (!userId) {
      console.error('No user ID found');
      return;
    }
    console.log('Deleting todo with id:', id);
    try {
      await deleteTodo(id, userId);
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
