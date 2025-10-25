// src/hooks/useUsuario.ts
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

export function useUsuario() {
  return useContext(UserContext);
}