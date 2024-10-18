import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../hooks/useAuth';  // Importa a função de verificação

const ProtectedRoute = ({ element }) => {
  if (!isAuthenticated()) {
    // Redireciona para a página de login se o usuário não estiver autenticado
    return <Navigate to="/login" replace />;
  }

  // Retorna o elemento da rota (componente) se o usuário estiver autenticado
  return element;
};

export default ProtectedRoute;
