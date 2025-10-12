import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CobrosController } from './cobros.controller';
import { CobrosService } from './cobros.service';
import { Pago } from './entities/pago.entity';
import { Reversion } from './entities/reversion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pago, Reversion])],
  controllers: [CobrosController],
  providers: [CobrosService],
  exports: [CobrosService],
})
export class CobrosModule {}
