import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database.module'; // ✅ ruta correcta
import { RrhhService } from './rrhh.service';
import { RolesController } from './roles.controller';
import { UsuariosController } from './usuarios.controller';
import { TareasController } from './tareas.controller';
import { AccesosController } from './accesos.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [
    UsuariosController,
    RolesController,
    TareasController,
    AccesosController,
  ],
  providers: [RrhhService],
})
export class RrhhModule {}
