import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './shared/layout/Layout';

function Placeholder() {
  return (
    <div className="bg-white p-6 rounded shadow text-[#0A1F2D] font-montserrat">
      <h2 className="text-2xl font-bold mb-2">Bienvenida a ACP Cobranza</h2>
      <p className="text-[#A5A5A5]">Este es un módulo temporal para validar el layout institucional.</p>
    </div>
  );
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Placeholder />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}