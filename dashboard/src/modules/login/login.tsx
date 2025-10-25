import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoACP from '../../assets/Logo_ACP_Cobranza.png';
import { loginUsuario } from './authService';
import '../login/login.css';

export default function Login() {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const resultado = await loginUsuario(usuario, contrasena);
    console.log('Resultado login:', resultado); // ✅ Diagnóstico en consola

    if (resultado?.exito && resultado.token && resultado.rol) {
      localStorage.setItem('token', resultado.token);
      localStorage.setItem('rol', resultado.rol);
      redirigirPorRol(resultado.rol);
    } else {
      setError(resultado?.mensaje || 'Credenciales inválidas');
    }
  };

  const redirigirPorRol = (rol: string) => {
    const rutas: Record<string, string> = {
      administrador: '/admin/dashboard',
      secretaria: '/secretaria/inicio',
      cobrador: '/cobrador/ruta',
      vendedor_lider: '/ventas/lider',
      vendedor_cambaceo: '/ventas/cambaceo',
      vendedor_conferencista: '/ventas/conferencista',
    };

    const rolNormalizado = rol.toLowerCase();
    const rutaDestino = rutas[rolNormalizado] || '/login';
    console.log('Redirigiendo a:', rutaDestino); // ✅ Confirmación en consola
    navigate(rutaDestino);
  };

  return (
    <div className="login-wrapper">
      <form className="login-form" onSubmit={handleSubmit}>
        <img src={logoACP} alt="Logo ACP Cobranza" className="login-logo" />

        <p className="login-subtitle">Tu dinero rápido y seguro</p>
        <h1 className="login-title">Inicio de sesión</h1>

        <input
          type="text"
          placeholder="Usuario"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          required
          className="login-input"
          autoComplete="username"
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          required
          className="login-input"
          autoComplete="current-password"
        />

        <button type="submit" className="login-button">Ingresar</button>

        {error && <p className="login-error">{error}</p>}
      </form>
    </div>
  );
}