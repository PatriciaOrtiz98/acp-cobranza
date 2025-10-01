import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // ✅ Importa ConfigModule
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module'; // ✅ Módulo de autenticación
import { RrhhModule } from './rrhh/rrhh.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // ✅ Carga variables de entorno
    AuthModule,
    RrhhModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
