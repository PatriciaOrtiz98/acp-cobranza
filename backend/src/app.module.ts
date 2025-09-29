import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // ✅ Importa ConfigModule
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module'; // ✅ Módulo de autenticación

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // ✅ Carga variables de entorno
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
