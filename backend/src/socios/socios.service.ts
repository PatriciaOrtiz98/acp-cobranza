import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database.service';
import { RegistrarSocioDto } from './dto/registrar-socio.dto';
import { RegistrarVentaDto } from './dto/registrar-venta.dto';
import { RegistrarVentaConPagoDto } from './dto/registrar-venta-conekta.dto';
import { RevertirVentaDto } from './dto/revertir-venta.dto';

@Injectable()
export class SociosService {
  constructor(private readonly dbService: DatabaseService) {}

  async registrarSocio(dto: RegistrarSocioDto) {
    const { gps, ...rest } = dto;
    const point = gps ? `SRID=4326;POINT(${gps.lng} ${gps.lat})` : null;

    try {
      await this.dbService.query(
        `INSERT INTO socios.socios (
          nombre, id_tipo, contacto, telefono, correo, direccion,
          gps, descuento_base, creado_por
        ) VALUES (
          $1, $2, $3, $4, $5, $6,
          ST_GeogFromText($7), $8, $9
        )`,
        [
          rest.nombre,
          rest.id_tipo,
          rest.contacto,
          rest.telefono,
          rest.correo,
          rest.direccion,
          point,
          rest.descuento_base || 0,
          rest.creado_por,
        ],
      );

      await this.dbService.registrarAcceso(
        rest.creado_por.toString(),
        'Administrador',
        '127.0.0.1',
        'socios.registrarSocio',
        new Date(),
      );

      return { mensaje: 'Socio registrado correctamente' };
    } catch (error) {
      console.error('Error al registrar socio:', error);
      throw new Error('No se pudo registrar el socio');
    }
  }

  async registrarVenta(dto: RegistrarVentaDto) {
    if (!dto.productos || dto.productos.length === 0) {
      throw new Error('La venta debe incluir al menos un producto');
    }

    try {
      await this.dbService.query(
        `SELECT socios.registrar_venta_institucional($1, $2, $3, $4, $5)`,
        [
          dto.id_socio,
          JSON.stringify(dto.productos),
          dto.id_modalidad,
          dto.id_medio,
          dto.usuario,
        ],
      );

      await this.dbService.registrarAcceso(
        dto.usuario.toString(),
        'Administrador',
        '127.0.0.1',
        'socios.registrarVenta',
        new Date(),
      );

      return { mensaje: 'Venta registrada correctamente' };
    } catch (error) {
      console.error('Error al registrar venta institucional:', error);
      throw new Error(
        error instanceof Error
          ? error.message
          : 'No se pudo registrar la venta institucional',
      );
    }
  }

  async registrarVentaConPago(dto: RegistrarVentaConPagoDto) {
    if (!dto.productos || dto.productos.length === 0) {
      throw new Error('La venta debe incluir al menos un producto');
    }

    try {
      await this.dbService.query(
        `SELECT socios.registrar_venta_con_pago(
          $1, $2, $3, $4, $5,
          $6, $7, $8, $9,
          $10, $11, $12, $13
        )`,
        [
          dto.id_socio,
          JSON.stringify(dto.productos),
          dto.id_modalidad,
          dto.id_medio,
          dto.usuario,
          dto.conekta_order_id,
          dto.conekta_charge_id,
          dto.metodo,
          dto.estado,
          dto.cliente_nombre,
          dto.cliente_correo,
          dto.cliente_telefono,
          JSON.stringify(dto.respuesta),
        ],
      );

      await this.dbService.registrarAcceso(
        dto.usuario.toString(),
        'Administrador',
        '127.0.0.1',
        'socios.registrarVentaConPago',
        new Date(),
      );

      return { mensaje: 'Venta con pago registrada correctamente' };
    } catch (error) {
      console.error('Error al registrar venta con pago:', error);
      throw new Error(
        error instanceof Error
          ? error.message
          : 'No se pudo registrar la venta con pago',
      );
    }
  }

  async revertirVenta(dto: RevertirVentaDto) {
    try {
      await this.dbService.query(
        `SELECT socios.revertir_venta_institucional($1, $2, $3)`,
        [dto.id_venta, dto.motivo, dto.usuario],
      );

      await this.dbService.registrarAcceso(
        dto.usuario.toString(),
        'Administrador',
        '127.0.0.1',
        'socios.revertirVenta',
        new Date(),
      );

      return { mensaje: 'Venta revertida correctamente' };
    } catch (error) {
      console.error('Error al revertir venta:', error);
      throw new Error(
        error instanceof Error ? error.message : 'No se pudo revertir la venta',
      );
    }
  }
  // TIPOS DE SOCIO
  async crearTipoSocio(nombre: string, descripcion: string, usuario: number) {
    try {
      await this.dbService.query(`SELECT socios.crear_tipo_socio($1, $2, $3)`, [
        nombre,
        descripcion,
        usuario,
      ]);
      return { mensaje: 'Tipo de socio creado correctamente' };
    } catch (error) {
      console.error('Error al crear tipo de socio:', error);
      throw new Error('No se pudo crear el tipo de socio');
    }
  }

  async modificarTipoSocio(
    id_tipo: number,
    nombre: string,
    descripcion: string,
    usuario: number,
  ) {
    try {
      await this.dbService.query(
        `SELECT socios.modificar_tipo_socio($1, $2, $3, $4)`,
        [id_tipo, nombre, descripcion, usuario],
      );
      return { mensaje: 'Tipo de socio modificado correctamente' };
    } catch (error) {
      console.error('Error al modificar tipo de socio:', error);
      throw new Error('No se pudo modificar el tipo de socio');
    }
  }

  async eliminarTipoSocio(id_tipo: number, usuario: number) {
    try {
      await this.dbService.query(`SELECT socios.eliminar_tipo_socio($1, $2)`, [
        id_tipo,
        usuario,
      ]);
      return { mensaje: 'Tipo de socio eliminado correctamente' };
    } catch (error) {
      console.error('Error al eliminar tipo de socio:', error);
      throw new Error('No se pudo eliminar el tipo de socio');
    }
  }

  // MEDIOS DE PAGO
  async crearMedioPago(nombre: string, descripcion: string, usuario: number) {
    try {
      await this.dbService.query(`SELECT socios.crear_medio_pago($1, $2, $3)`, [
        nombre,
        descripcion,
        usuario,
      ]);
      return { mensaje: 'Medio de pago creado correctamente' };
    } catch (error) {
      console.error('Error al crear medio de pago:', error);
      throw new Error('No se pudo crear el medio de pago');
    }
  }

  async modificarMedioPago(
    id_medio: number,
    nombre: string,
    descripcion: string,
    usuario: number,
  ) {
    try {
      await this.dbService.query(
        `SELECT socios.modificar_medio_pago($1, $2, $3, $4)`,
        [id_medio, nombre, descripcion, usuario],
      );
      return { mensaje: 'Medio de pago modificado correctamente' };
    } catch (error) {
      console.error('Error al modificar medio de pago:', error);
      throw new Error('No se pudo modificar el medio de pago');
    }
  }

  async eliminarMedioPago(id_medio: number, usuario: number) {
    try {
      await this.dbService.query(`SELECT socios.eliminar_medio_pago($1, $2)`, [
        id_medio,
        usuario,
      ]);
      return { mensaje: 'Medio de pago eliminado correctamente' };
    } catch (error) {
      console.error('Error al eliminar medio de pago:', error);
      throw new Error('No se pudo eliminar el medio de pago');
    }
  }
}
