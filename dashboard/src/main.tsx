import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRoutes from './routes';
import { UserProvider } from './context/userProvider'; // Asegúrate de que la ruta sea correcta
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserProvider>
      <AppRoutes />
    </UserProvider>
  </React.StrictMode>
);