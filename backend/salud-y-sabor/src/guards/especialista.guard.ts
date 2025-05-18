import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UsersService } from '../users/users.service';
import { Role } from '../users/users.entity';

@Injectable()
export class EspecialistaGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Token no proporcionado');
    }

    try {
      const payload = this.jwtService.verify(token);
      const user = await this.usersService.getUserById(payload.userId);

      if (!user) {
        throw new UnauthorizedException('Usuario no encontrado');
      }

      // Verificación del rol
      if (user.role !== Role.ROLE_ESPECIALISTA) {
        throw new UnauthorizedException('Acceso restringido a especialistas');
      }

      // Verificación de versión del token (opcional)
      if (payload.tokenVersion !== user.tokenVersion) {
        throw new UnauthorizedException('Token inválido (sesión cerrada)');
      }

      request.user = user; // Almacena el usuario completo en la request
      return true;
    } catch (error) {
      throw new UnauthorizedException(error.message || 'Acceso no autorizado');
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
