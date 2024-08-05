import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import TodoList from './components/Todo/TodoList';
import { getCurrentUser } from './components/services/authService';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const location = useLocation();

  if (!getCurrentUser()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <a href="/login">Login</a>
            </li>
            <li>
              <a href="/register">Register</a>
            </li>
            <li>
              <a href="/todos">Todos</a>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/todos"
            element={
              <PrivateRoute>
                <TodoList />
              </PrivateRoute>
            }
          />
          <Route path="/" element={<Navigate to="/todos" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;