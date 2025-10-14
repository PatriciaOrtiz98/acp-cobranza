import { NavLink } from 'react-router-dom';
import {
  FaHome,
  FaUsers,
  FaChartLine,
  FaMoneyBillWave,
  FaRoute,
  FaUserCog,
  FaClipboardList,
  FaWarehouse,
  FaHandshake,
  FaCogs,
  FaTools
} from 'react-icons/fa';
import '../../styles/sidebar.css';

export default function Sidebar() {
  return (
    <aside className="sidebar sidebar-collapsed">
      <nav className="sidebar-nav">
        {/* Bloque superior: General, Operación, Administración */}
        <div className="sidebar-top">
          <div>
            <p className="sidebar-section-title">General</p>
            <NavLink to="/inicio" className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}>
              <FaHome className="sidebar-icon" />
              <span>Inicio</span>
            </NavLink>
          </div>

          <div>
            <p className="sidebar-section-title">Operación</p>
            <NavLink to="/clientes" className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}>
              <FaUsers className="sidebar-icon" />
              <span>Clientes</span>
            </NavLink>
            <NavLink to="/ventas" className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}>
              <FaChartLine className="sidebar-icon" />
              <span>Ventas</span>
            </NavLink>
            <NavLink to="/cobros" className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}>
              <FaMoneyBillWave className="sidebar-icon" />
              <span>Cobros</span>
            </NavLink>
            <NavLink to="/rutas" className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}>
              <FaRoute className="sidebar-icon" />
              <span>Rutas</span>
            </NavLink>
          </div>

          <div>
            <p className="sidebar-section-title">Administración</p>
            <NavLink to="/usuarios" className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}>
              <FaUserCog className="sidebar-icon" />
              <span>Usuarios</span>
            </NavLink>
            <NavLink to="/nomina" className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}>
              <FaClipboardList className="sidebar-icon" />
              <span>Nómina</span>
            </NavLink>
            <NavLink to="/inventario" className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}>
              <FaWarehouse className="sidebar-icon" />
              <span>Inventario</span>
            </NavLink>
            <NavLink to="/socios" className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}>
              <FaHandshake className="sidebar-icon" />
              <span>Socios</span>
            </NavLink>
          </div>
        </div>

        {/* Bloque inferior: Sistema */}
        <div className="sidebar-bottom">
          <div>
            <p className="sidebar-section-title">Sistema</p>
            <NavLink to="/simulacion" className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}>
              <FaCogs className="sidebar-icon" />
              <span>Simulación P.E.</span>
            </NavLink>
            <NavLink to="/configuracion" className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}>
              <FaTools className="sidebar-icon" />
              <span>Configuración</span>
            </NavLink>
          </div>
        </div>
      </nav>
    </aside>
  );
}