import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from './clientes.entity';
import { ClienteDto } from './clientes.dto';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente)
    private readonly repo: Repository<Cliente>,
  ) {}

  async create(dto: ClienteDto): Promise<Cliente> {
    const cliente = this.repo.create(dto);
    return this.repo.save(cliente);
  }

  async findAll(): Promise<Cliente[]> {
    return this.repo.find();
  }

  async findOne(id: number): Promise<Cliente> {
    const cliente = await this.repo.findOne({ where: { id_cliente: id } });
    if (!cliente) {
      throw new NotFoundException(`Cliente con ID ${id} no encontrado`);
    }
    return cliente;
  }

  async update(id: number, dto: ClienteDto): Promise<Cliente> {
    const cliente = await this.findOne(id);
    const actualizado = this.repo.merge(cliente, dto);
    return this.repo.save(actualizado);
  }

  async remove(id: number): Promise<{ eliminado: boolean }> {
    const cliente = await this.findOne(id);
    await this.repo.remove(cliente);
    return { eliminado: true };
  }
}
