import axios from 'axios';
import { getCurrentUser } from './authService';

const API_URL = 'http://localhost:3000/todo';

const authHeader = () => {
  const user = getCurrentUser();
  if (user && user.accessToken) {
    return { Authorization: 'Bearer ' + user.accessToken };
  } else {
    return {};
  }
};

interface TodoData {
  userId: string;
  id?: string; // id is optional for create operation
  text: string;
  isCompleted: boolean;
  expireDate?: string; // expireDate is optional for update operation
}

export const createTodo = async (todo: TodoData) => {
  return axios.post(API_URL, todo, { headers: authHeader() });
};

export const getTodos = async (userId: string) => {
  return axios.get(`${API_URL}?userId=${userId}`, { headers: authHeader() });
};

export const updateTodo = async (id: string, todo: TodoData) => {
  return axios.put(`${API_URL}/${id}`, todo, { headers: authHeader() });
};

export const deleteTodo = async (id: string, userId: string) => {
  return axios.delete(`${API_URL}/${id}?userId=${userId}`, { headers: authHeader() });
};
