// frontend/src/services/todoService.ts
import axios from 'axios';
import { getCurrentUser } from './authService';

const API_URL = '<http://localhost:3000/todo>';

const authHeader = () => {
  const user = getCurrentUser();
  if (user && user.accessToken) {
    return { Authorization: 'Bearer ' + user.accessToken };
  } else {
    return {};
  }
};

export const createTodo = async (todo: any) => {
  return axios.post(API_URL, todo, { headers: authHeader() });
};

export const getTodos = async () => {
  return axios.get(API_URL, { headers: authHeader() });
};

export const updateTodo = async (id: string, todo: any) => {
  return axios.put(`${API_URL}/${id}`, todo, { headers: authHeader() });
};

export const deleteTodo = async (id: string) => {
  return axios.delete(`${API_URL}/${id}`, { headers: authHeader() });
};
