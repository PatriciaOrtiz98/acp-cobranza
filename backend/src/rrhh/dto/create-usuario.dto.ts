export class CreateUsuarioDto {
  nombre: string;
  apellido?: string;
  usuario: string;
  contrasenia: string;
  email?: string;
  id_rol: number;
  id_sucursal?: number;
  foto_path?: string;
}
