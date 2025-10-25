import { Navigate } from 'react-router-dom';
import type { ReactElement } from 'react';

export default function RutaProtegida({ children }: { children: ReactElement }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/" />;
}