import { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

import '../../styles/layout.css';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen] = useState(true);

  return (
    <div className="flex flex-col h-screen font-roboto">
      {/* Encabezado modular */}
      <Header />

      {/* Contenedor principal con sidebar, contenido y footer */}
      <div className="flex flex-1 overflow-hidden">
        {sidebarOpen && <Sidebar />}

        <div className="flex flex-col flex-1 overflow-hidden">
          <main className="flex-1 overflow-y-auto p-6 bg-[#F9F9F9]">
            {children}
          </main>

          {/* Footer institucional alineado al contenido */}
          <Footer />
        </div>
      </div>
    </div>
  );
}