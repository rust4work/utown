// src/hooks/useNavigateTo.ts
import { useNavigate } from "react-router-dom";

export const useNavigateTo = () => {
  const navigate = useNavigate();

  // возвращаем "фабрику функций" для переиспользования
  const navigateTo = (path: string) => () => navigate(path);

  return { navigateTo };
};
