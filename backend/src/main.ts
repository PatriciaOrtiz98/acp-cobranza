import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AccessLoggerInterceptor } from './auth/access-loger.interceptor';
import { DatabaseService } from './database.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  // ✅ Permitir solicitudes desde el frontend
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });

  const dbService = app.get(DatabaseService);
  app.useGlobalInterceptors(new AccessLoggerInterceptor(dbService));

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
