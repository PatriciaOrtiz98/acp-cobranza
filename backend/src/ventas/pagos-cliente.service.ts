import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PagoCliente } from './pagos-cliente.entity';

@Injectable()
export class PagosClienteService {
  constructor(
    @InjectRepository(PagoCliente)
    private readonly repo: Repository<PagoCliente>,
  ) {}

  async findAll(): Promise<PagoCliente[]> {
    return this.repo.find();
  }

  async findByVenta(id_venta: number): Promise<PagoCliente[]> {
    return this.repo.find({ where: { id_venta } });
  }
}
