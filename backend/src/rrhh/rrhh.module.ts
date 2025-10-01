import { Module } from '@nestjs/common';
import { UsuariosController } from './usuarios.controller';
import { RolesController } from './roles.controller';
import { TareasController } from './tareas.controller';
import { AccesosController } from './accesos.controller';
import { RrhhService } from './rrhh.service';

@Module({
  controllers: [
    UsuariosController,
    RolesController,
    TareasController,
    AccesosController,
  ],
  providers: [RrhhService],
})
export class RrhhModule {}
