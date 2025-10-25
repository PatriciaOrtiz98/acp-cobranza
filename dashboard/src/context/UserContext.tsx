// src/context/UserContext.ts
import { createContext } from 'react';

export interface Usuario {
  usuario: string;
  rol: string;
  sucursal: number;
}

export const UserContext = createContext<Usuario | null>(null);