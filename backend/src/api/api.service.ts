import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sucursal } from './entities/sucursal.entity';
import { SucursalDto } from './dto/sucursal.dto';

@Injectable()
export class ApiService {
  constructor(
    @InjectRepository(Sucursal)
    private readonly repo: Repository<Sucursal>,
  ) {}

  async crear(dto: SucursalDto, id_usuario: number) {
    const sucursal = this.repo.create({
      ...dto,
      registrada_por: id_usuario,
    });
    return await this.repo.save(sucursal);
  }
}
