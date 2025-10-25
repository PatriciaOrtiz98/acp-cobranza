import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './shared/layout/Layout';
import Login from './modules/login/login';
import DashboardAdmin from './modules/admin/DashboardAdmin'; // ejemplo
import RutaProtegida from './modules/login/RutaProtegida'; // lo creamos abajo

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta pública: Login */}
        <Route path="/" element={<Login />} />

        {/* Rutas protegidas con Layout */}
        <Route element={<RutaProtegida><Layout /></RutaProtegida>}>
          <Route path="/admin/dashboard" element={<DashboardAdmin />} />
          {/* Agrega aquí más rutas protegidas por rol */}
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}