import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ParametroVenta } from './parametros.entity';

@Injectable()
export class ParametrosService {
  constructor(
    @InjectRepository(ParametroVenta)
    private readonly repo: Repository<ParametroVenta>,
  ) {}

  // ✅ Obtener valor vigente de un parámetro activo
  async obtener(nombre: string): Promise<number> {
    const parametro = await this.repo.findOne({
      where: { nombre_parametro: nombre, activo: true },
    });

    if (!parametro) {
      throw new Error(`Parámetro "${nombre}" no está definido o está inactivo`);
    }

    return Number(parametro.valor);
  }

  // ✅ Verificar si un parámetro está activo
  async estaActivo(nombre: string): Promise<boolean> {
    const parametro = await this.repo.findOne({
      where: { nombre_parametro: nombre },
    });

    return !!parametro?.activo;
  }

  // ✅ Listar todos los parámetros activos
  async listarActivos(): Promise<ParametroVenta[]> {
    return this.repo.find({ where: { activo: true } });
  }

  // ✅ Actualizar valor de un parámetro (solo para Administrador)
  async actualizar(nombre: string, nuevoValor: number): Promise<string> {
    const parametro = await this.repo.findOne({
      where: { nombre_parametro: nombre },
    });

    if (!parametro) {
      throw new Error(`Parámetro "${nombre}" no existe`);
    }

    parametro.valor = nuevoValor;
    await this.repo.save(parametro);

    return `Parámetro "${nombre}" actualizado a ${nuevoValor}`;
  }

  // ✅ Desactivar un parámetro (opcional)
  async desactivar(nombre: string): Promise<string> {
    const parametro = await this.repo.findOne({
      where: { nombre_parametro: nombre },
    });

    if (!parametro) {
      throw new Error(`Parámetro "${nombre}" no existe`);
    }

    parametro.activo = false;
    await this.repo.save(parametro);

    return `Parámetro "${nombre}" desactivado`;
  }
}
