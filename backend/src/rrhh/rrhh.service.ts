import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database.service';

@Injectable()
export class RrhhService {
  constructor(private readonly db: DatabaseService) {}

  listarUsuarios() {
    return this.db.query('SELECT * FROM rrhh.usuarios ORDER BY nombre');
  }

  buscarUsuarioPorId(id: number) {
    return this.db.query('SELECT * FROM rrhh.usuarios WHERE id_usuario = $1', [
      id,
    ]);
  }

  listarRoles() {
    return this.db.query('SELECT * FROM rrhh.roles ORDER BY nombre_rol');
  }

  listarTareas() {
    return this.db.query('SELECT * FROM rrhh.tareas ORDER BY nombre_tarea');
  }

  listarAccesos() {
    return this.db.query(
      'SELECT * FROM rrhh.accesos ORDER BY fecha DESC LIMIT 100',
    );
  }
}
