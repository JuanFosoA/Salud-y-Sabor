import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);

  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Invalid Token');
    }

    try {
      const payload = this.jwtService.verify(token);
        
      const user = await this.usersService.getUserById(payload.userId);
      
      if (!user) {
        throw new UnauthorizedException('Usuario no encontrado');
      }
      if (payload.tokenVersion !== user.tokenVersion) {
        throw new UnauthorizedException('Token inválido (sesión cerrada)');
      }

      request.user = {
        id: user.id,
        tokenVersion: user.tokenVersion,
      };

      return true;
    } catch (error) {
        this.logger.error(`Authentication Error: ${error.message}`);
        throw new UnauthorizedException(error.message || 'Invalid token');
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
}
}
