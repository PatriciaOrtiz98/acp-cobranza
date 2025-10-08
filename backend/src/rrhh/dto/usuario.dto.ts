export interface Usuario {
  id_usuario: number;
  nombre: string;
  apellido: string | null;
  usuario: string;
  contrasenia: string;
  email: string | null;
  id_rol: number;
  id_sucursal: number | null;
  activo: boolean;
  foto_path: string | null;
}
