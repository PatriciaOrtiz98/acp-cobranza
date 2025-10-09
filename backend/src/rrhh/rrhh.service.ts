import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database.service';
import { Usuario } from './dto/usuario.dto';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { CreateRolDto } from './dto/create-rol.dto';
import { Rol } from './dto/rol.dto';
import { CrearTareaTemporalDto } from './dto/crear-tarea-temporal.dto';
import { AsignacionManualDto } from './dto/asignacion-manual.dto';
import { TareaSecretariaDto } from './dto/tarea-secretaria.dto';

@Injectable()
export class RrhhService {
  constructor(private readonly db: DatabaseService) {}

  listarUsuarios(): Promise<Usuario[]> {
    return this.db.query<Usuario>(
      'SELECT * FROM rrhh.usuarios ORDER BY nombre',
    );
  }

  async buscarUsuarioPorId(id: number): Promise<Usuario | null> {
    const resultado = await this.db.query<Usuario>(
      'SELECT * FROM rrhh.usuarios WHERE id_usuario = $1',
      [id],
    );
    return resultado[0] || null;
  }

  listarRoles(): Promise<Rol[]> {
    return this.db.query<Rol>('SELECT * FROM rrhh.roles ORDER BY nivel');
  }

  async crearRol(
    dto: CreateRolDto,
    usuario: string,
  ): Promise<{ mensaje: string }> {
    const existe = await this.db.query(
      'SELECT id_rol FROM rrhh.roles WHERE nombre_rol = $1',
      [dto.nombre_rol],
    );

    if (existe.length > 0) {
      throw new Error(`El rol '${dto.nombre_rol}' ya existe`);
    }

    await this.db.query(
      `INSERT INTO rrhh.roles (nombre_rol, nivel, descripcion)
       VALUES ($1, $2, $3)`,
      [dto.nombre_rol, dto.nivel, dto.descripcion],
    );

    await this.db.query(
      `INSERT INTO rrhh.accesos (usuario, rol, modulo, nivel)
       VALUES ($1, $2, $3, $4)`,
      [usuario, 'Administrador', 'configuracion.roles', dto.nivel.toString()],
    );

    return { mensaje: `Rol '${dto.nombre_rol}' creado exitosamente` };
  }

  async asignarRol(
    id_usuario: number,
    id_rol: number,
  ): Promise<{ mensaje: string }> {
    await this.db.query(
      'UPDATE rrhh.usuarios SET id_rol = $1 WHERE id_usuario = $2',
      [id_rol, id_usuario],
    );

    return { mensaje: `Rol asignado al usuario ${id_usuario}` };
  }

  listarTareas(): Promise<any[]> {
    return this.db.query<any>(
      'SELECT * FROM rrhh.tareas ORDER BY nombre_tarea',
    );
  }

  listarAccesos(): Promise<any[]> {
    return this.db.query<any>(
      'SELECT * FROM rrhh.accesos ORDER BY fecha DESC LIMIT 100',
    );
  }

  async crearUsuario(dto: CreateUsuarioDto): Promise<{ mensaje: string }> {
    try {
      const existente = await this.db.query(
        'SELECT id_usuario FROM rrhh.usuarios WHERE usuario = $1 OR email = $2',
        [dto.usuario, dto.email],
      );

      if (existente.length > 0) {
        throw new Error('Usuario o correo ya registrado');
      }

      await this.db.query(
        `INSERT INTO rrhh.usuarios (
          nombre, apellido, usuario, contrasenia, email, id_rol, id_sucursal, foto_path
        ) VALUES (
          $1, $2, $3, crypt($4, gen_salt('bf')), $5, $6, $7, $8
        )`,
        [
          dto.nombre,
          dto.apellido,
          dto.usuario,
          dto.contrasenia,
          dto.email,
          dto.id_rol,
          dto.id_sucursal,
          dto.foto_path || null,
        ],
      );

      return { mensaje: `Usuario '${dto.nombre}' creado exitosamente` };
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error al crear usuario:', error.message);
        throw new Error('No se pudo crear el usuario');
      }
      throw new Error('Error desconocido al crear usuario');
    }
  }

  async crearTareaTemporal(
    dto: CrearTareaTemporalDto,
  ): Promise<{ mensaje: string }> {
    await this.db.query(
      `INSERT INTO rrhh.tareas_temporales (descripcion, prioridad, fecha_limite, asignada_por)
       VALUES ($1, $2, $3, $4)`,
      [dto.descripcion, dto.prioridad, dto.fecha_limite, dto.asignada_por],
    );
    return { mensaje: 'Tarea temporal registrada' };
  }

  async asignarTareaManual(
    dto: AsignacionManualDto,
  ): Promise<{ mensaje: string }> {
    await this.db.query(
      `INSERT INTO rrhh.tareas_asignadas_manualmente (id_tarea, id_secretaria, asignada_por)
       VALUES ($1, $2, $3)`,
      [dto.id_tarea, dto.id_secretaria, dto.asignada_por],
    );
    return { mensaje: 'Tarea asignada manualmente' };
  }

  async procesarAsignaciones(): Promise<{ mensaje: string }> {
    await this.db.query('SELECT rrhh.procesar_asignaciones_manuales()');
    return { mensaje: 'Asignaciones procesadas correctamente' };
  }

  async listarTareasSecretaria(
    id_secretaria: number,
  ): Promise<TareaSecretariaDto[]> {
    return this.db.query<TareaSecretariaDto>(
      `SELECT * FROM rrhh.tareas_secretaria WHERE id_secretaria = $1 ORDER BY fecha_limite`,
      [id_secretaria],
    );
  }

  async evaluarTarea(id_tarea: number): Promise<{ mensaje: string }> {
    await this.db.query(
      `UPDATE rrhh.tareas_secretaria
       SET completada = TRUE, evaluacion = TRUE, estado = 'revisada'
       WHERE id_tarea = $1`,
      [id_tarea],
    );

    return { mensaje: `Tarea ${id_tarea} evaluada correctamente` };
  }

  async listarTareasDeHoy(): Promise<TareaSecretariaDto[]> {
    return this.db.query<TareaSecretariaDto>(
      `SELECT * FROM rrhh.v_tareas_secretaria_hoy ORDER BY prioridad DESC`,
    );
  }
}
