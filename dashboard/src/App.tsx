import { useState } from 'react';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`bg-white shadow-md w-64 transition-transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-64'}`}>
        <div className="p-4 font-bold text-xl text-blue-600">Movicash</div>
        <nav className="mt-4 space-y-2 px-4">
          <a href="/panel" className="block text-gray-700 hover:text-blue-600">Dashboard</a>
          <a href="/clientes" className="block text-gray-700 hover:text-blue-600">Clientes</a>
          <a href="/ventas" className="block text-gray-700 hover:text-blue-600">Ventas</a>
          <a href="/cobros" className="block text-gray-700 hover:text-blue-600">Cobros</a>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Panel principal</h1>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {sidebarOpen ? 'Ocultar menú' : 'Mostrar menú'}
          </button>
        </header>

        <section className="bg-white p-6 rounded shadow">
          <p className="text-gray-600">Bienvenida al dashboard institucional Movicash.</p>
        </section>
      </main>
    </div>
  );
}