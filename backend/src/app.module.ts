import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';
import { RrhhModule } from './rrhh/rrhh.module';
import { ConfiguracionModule } from './configuracion/configuracion.module';
import { ApiModule } from './api/api.module'; // ✅ Nuevo módulo para schema api

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
