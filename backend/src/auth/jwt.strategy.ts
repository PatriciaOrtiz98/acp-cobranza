import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

interface JwtPayload {
  usuario: string;
  rol: string;
  sucursal: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get<string>('JWT_SECRET') ?? 'clave-super-secreta',
    });
  }

  validate(payload: JwtPayload) {
    return {
      usuario: payload.usuario,
      rol: payload.rol,
      sucursal: payload.sucursal,
    };
  }
}
