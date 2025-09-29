import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { Request } from 'express';
import { DatabaseService } from '../database.service';

@Injectable()
export class AccessLoggerInterceptor implements NestInterceptor {
  constructor(private readonly db: DatabaseService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    const usuario = request.user as { usuario?: string; rol?: string };

    const ipHeader = request.headers['x-forwarded-for'];
    const ip: string =
      request.ip ??
      (Array.isArray(ipHeader)
        ? ipHeader[0]
        : typeof ipHeader === 'string'
          ? ipHeader
          : 'desconocida');

    const route = request.route as { path?: string } | undefined;
    const ruta: string =
      typeof route?.path === 'string' ? route.path : request.url;

    return next.handle().pipe(
      tap(() => {
        this.db
          .registrarAcceso(
            usuario?.usuario ?? 'desconocido',
            usuario?.rol ?? 'sin-rol',
            ip,
            ruta,
            new Date(),
          )
          .catch((err) => {
            console.error('Error registrando acceso:', err);
          });
      }),
    );
  }
}
