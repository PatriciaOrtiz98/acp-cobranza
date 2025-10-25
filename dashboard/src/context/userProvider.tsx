import { useState, useEffect } from 'react';
import { UserContext } from './UserContext';
import type { Usuario } from './UserContext';

// Función para decodificar el payload del JWT
function decodePayload(token: string) {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Token mal formado');
    }

    const payloadBase64Url = parts[1];
    const payloadBase64 = payloadBase64Url.replace(/-/g, '+').replace(/_/g, '/');
    const decoded = JSON.parse(atob(payloadBase64));
    return decoded;
  } catch (err) {
    console.error('Error decodificando token:', err);
    return null;
  }
}

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  useEffect(() => {
  const token = localStorage.getItem('token');
  if (token && token.split('.').length === 3) {
    const payload = decodePayload(token);
    if (payload) {
      setUsuario({
        usuario: payload.usuario,
        rol: payload.rol,
        sucursal: payload.sucursal,
      });
    } else {
      setUsuario(null);
    }
  } else {
    console.warn('Token ausente o mal formado:', token);
    setUsuario(null);
  }
}, []);

  return (
    <UserContext.Provider value={usuario}>
      {children}
    </UserContext.Provider>
  );
}