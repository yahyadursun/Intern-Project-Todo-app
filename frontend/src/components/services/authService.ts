// frontend/src/services/authService.ts

const API_URL = 'http://localhost:3000/auth';

export const login = async (email: string, password: string) => {
  const response = await fetch(`${API_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  console.log(`${API_URL}/signin`);
  
  const data = await response.json();
  
  if (data.accessToken) {
    localStorage.setItem('user', JSON.stringify(data));
  }
  
  return data;
};

export const register = async (user: any) => {
  return fetch(`${API_URL}/signUp`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
};

export const logout = () => {
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  if (userStr) return JSON.parse(userStr);
  return null;
};
