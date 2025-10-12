import { Module } from '@nestjs/common';
import { NominaController } from './nomina.controller';
import { NominaService } from './nomina.service';
import { DatabaseModule } from '../database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [NominaController],
  providers: [NominaService],
})
export class NominaModule {}
