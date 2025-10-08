import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sucursal } from './entities/sucursal.entity';
import { ApiService } from './api.service';
import { ApiController } from './api.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Sucursal])],
  providers: [ApiService],
  controllers: [ApiController],
})
export class ApiModule {}
