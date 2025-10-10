import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DetalleVenta } from './detalles-venta.entity';

@Injectable()
export class DetallesVentaService {
  constructor(
    @InjectRepository(DetalleVenta)
    private readonly repo: Repository<DetalleVenta>,
  ) {}

  async findAll(): Promise<DetalleVenta[]> {
    return this.repo.find();
  }

  async findByVenta(id_venta: number): Promise<DetalleVenta[]> {
    return this.repo.find({ where: { id_venta } });
  }
}
