import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('token'); // Remove o token do localStorage
    navigate('/login'); // Redireciona para a página de login
  }, [navigate]); // O useEffect será executado uma vez, ao montar o componente

  return null; // O componente não renderiza nada na tela
};