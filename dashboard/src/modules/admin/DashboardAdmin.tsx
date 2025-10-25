export default function DashboardAdmin() {
  return (
    <div className="p-6 text-[#0A1F2D] font-montserrat">
      <h2 className="text-2xl font-bold mb-4">Panel Administrativo</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Módulo 1: Resumen de clientes */}
        <div className="bg-white rounded shadow p-4">
          <h3 className="text-lg font-semibold mb-2">Clientes registrados</h3>
          <p className="text-[#A5A5A5]">Total: 1,245</p>
        </div>

        {/* Módulo 2: Cobros del día */}
        <div className="bg-white rounded shadow p-4">
          <h3 className="text-lg font-semibold mb-2">Cobros hoy</h3>
          <p className="text-[#A5A5A5]">Monto: $58,320.00</p>
        </div>

        {/* Módulo 3: Rutas activas */}
        <div className="bg-white rounded shadow p-4">
          <h3 className="text-lg font-semibold mb-2">Rutas activas</h3>
          <p className="text-[#A5A5A5]">5 rutas en operación</p>
        </div>
      </div>
    </div>
  );
}