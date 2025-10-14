import '../../styles/header.css';
import logoACP from '../../assets/Icono_Logo_de_ACP_Cobranza.png';
import { HiOutlineLogout } from 'react-icons/hi';
import React from 'react'; // necesario si usas React.FC

const Header: React.FC = () => {
  const userName = 'Patricia Ortiz';
  const userRole = 'Administrador';

  return (
    <header className="layout-header">
      <div className="layout-branding">
        <img src={logoACP} alt="Logo ACP Cobranza" className="layout-logo" />
        <div className="layout-branding-text">
          <h1 className="layout-title">ACP COBRANZA</h1>
          <p className="layout-subtitle">Tu dinero rápido y seguro</p>
        </div>
      </div>

      <div className="layout-user-section">
        <p className="layout-user-name">{userName} – {userRole}</p>
        <button className="layout-logout-button" onClick={() => console.log('Cerrar sesión')}>
          <HiOutlineLogout size={30} />
        </button>
      </div>
    </header>
  );
};

export default Header;