import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database.service';
import { Usuario } from './dto/usuario.dto';

@Injectable()
export class RrhhService {
  constructor(private readonly db: DatabaseService) {}

  listarUsuarios(): Promise<Usuario[]> {
    return this.db.query('SELECT * FROM rrhh.usuarios ORDER BY nombre');
  }

  buscarUsuarioPorId(id: number): Promise<Usuario | null> {
    return this.db
      .query('SELECT * FROM rrhh.usuarios WHERE id_usuario = $1', [id])
      .then((resultado: Usuario[]) => resultado[0] || null);
  }

  listarRoles(): Promise<string[]> {
    return this.db
      .query('SELECT nombre_rol FROM rrhh.roles ORDER BY nombre_rol')
      .then((resultado: { nombre_rol: string }[]) =>
        resultado.map((fila) => fila.nombre_rol),
      );
  }

  asignarRol(id_usuario: number, rol: string): Promise<{ mensaje: string }> {
    return this.db
      .query('UPDATE rrhh.usuarios SET rol = $1 WHERE id_usuario = $2', [
        rol,
        id_usuario,
      ])
      .then(() => ({
        mensaje: `Rol '${rol}' asignado al usuario ${id_usuario}`,
      }));
  }

  listarTareas(): Promise<any[]> {
    return this.db.query('SELECT * FROM rrhh.tareas ORDER BY nombre_tarea');
  }

  listarAccesos(): Promise<any[]> {
    return this.db.query(
      'SELECT * FROM rrhh.accesos ORDER BY fecha DESC LIMIT 100',
    );
  }
}
