import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { DatabaseService } from '../database.service';

interface UsuarioConRol {
  id_usuario: number;
  usuario: string;
  contrasenia: string;
  activo: boolean;
  nombre: string;
  apellido: string;
  email: string;
  id_rol: number;
  nombre_rol: string;
  id_sucursal: number;
  foto_path: string;
}

interface LoginDto {
  usuario: string;
  contrasenia: string;
}

interface TokenResponse {
  access_token: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly db: DatabaseService,
    private readonly jwtService: JwtService,
  ) {}

  async login(credentials: LoginDto): Promise<TokenResponse> {
    const { usuario, contrasenia } = credentials;

    const resultado = await this.db.query<UsuarioConRol>(
      `
      SELECT u.*, r.nombre_rol
      FROM rrhh.usuarios u
      JOIN rrhh.roles r ON u.id_rol = r.id_rol
      WHERE u.usuario = $1
      `,
      [usuario],
    );

    const usuarioEncontrado = resultado[0];

    if (!usuarioEncontrado || !usuarioEncontrado.activo) {
      throw new UnauthorizedException('Usuario no válido o inactivo');
    }

    const coincide = await bcrypt.compare(
      contrasenia,
      usuarioEncontrado.contrasenia,
    );

    if (!coincide) {
      throw new UnauthorizedException('Contraseña incorrecta');
    }

    const payload = {
      sub: usuarioEncontrado.id_usuario,
      usuario: usuarioEncontrado.usuario,
      rol: usuarioEncontrado.nombre_rol,
      sucursal: usuarioEncontrado.id_sucursal,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
