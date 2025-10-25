import axios from 'axios';

interface ResultadoLogin {
  exito: boolean;
  token?: string;
  rol?: string;
  mensaje?: string;
}

export async function loginUsuario(usuario: string, contrasenia: string): Promise<ResultadoLogin> {
  try {
    const res = await axios.post('http://localhost:3000/auth/login', {
      usuario,
      contrasenia,
    });

    const token = res.data.access_token;

    // Decodificar el token para extraer el rol
    const payloadBase64 = token.split('.')[1];
    const payload = JSON.parse(atob(payloadBase64));
    const rol = payload.rol;

    return {
      exito: true,
      token,
      rol,
    };
  } catch (err) {
    console.error('Error al conectar con el backend:', err);
    return {
      exito: false,
      mensaje: 'Credenciales inválidas o error de conexión',
    };
  }
}