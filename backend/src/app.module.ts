import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';
import { RrhhModule } from './rrhh/rrhh.module';
import { ConfiguracionModule } from './configuracion/configuracion.module';
import { ApiModule } from './api/api.module'; // ✅ Nuevo módulo para schema api
import { InventarioModule } from './inventario/inventario.module';
import { ClientesModule } from './clientes/clientes.module';

@Module({
  imports: [
    // 🔧 Carga variables de entorno desde .env
    ConfigModule.forRoot({ isGlobal: true }),

    // 🗄️ Inicializa TypeORM con conexión a PostgreSQL
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: false, // ⚠️ Solo en desarrollo. Usa migraciones en producción.
    }),

    // 🔐 Módulo de autenticación
    AuthModule,

    // 👥 Módulo de recursos humanos
    RrhhModule,

    // ⚙️ Módulo de configuración institucional
    ConfiguracionModule,

    // 🧱 Módulo operativo para sucursales reales
    ApiModule,

    // 🏬 Módulo de inventario y gestión de producto
    InventarioModule,
    // 🛒 Módulo de gestión de clientes
    ClientesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
