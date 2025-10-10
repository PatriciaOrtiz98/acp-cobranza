import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PagosClienteController } from './pagos-cliente.controller';
import { PagosClienteService } from './pagos-cliente.service';
import { PagoCliente } from './pagos-cliente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PagoCliente])],
  controllers: [PagosClienteController],
  providers: [PagosClienteService],
})
export class PagosClienteModule {}
