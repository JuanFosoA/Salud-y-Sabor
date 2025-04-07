import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User, Disease } from 'src/users/users.entity';
import { SignupDto } from './dto/signup.dto';
import * as bcrypt from 'bcryptjs';
import { SigninDto } from './dto/signin.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenService } from 'src/users/refresh.token.service';
import { PassThrough } from 'stream';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private refreshTokenService: RefreshTokenService,
  ) {}

  async signup(signupData: SignupDto): Promise<User> {
    const email = signupData.email.toLowerCase().trim();

    const emailInUse = await this.userService.getUserByEmail(email);
    if (emailInUse) {
      throw new BadRequestException('Email already in use');
    }

    const usernameInUse = await this.userService.getUserByUsername(
      signupData.username,
    );
    if (usernameInUse) {
      throw new BadRequestException('Username already in use');
    }

    const hashedPassword = await bcrypt.hash(signupData.password, 10);

    return this.userService.createUser({
      fullname: signupData.fullname,
      documentType: signupData.documentType,
      document: signupData.document,
      email,
      username: signupData.username,
      password: hashedPassword,
      height: signupData.height,
      weight: signupData.weight,
      disease: signupData.disease || Disease.NINGUNA,
    });
  }

  async signin(credentials: SigninDto) {
    const { email, password } = credentials;
    const user = await this.userService.getUserByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = {
      userId: user.id,
      tokenVersion: user.tokenVersion,
    };

    return this.generateUserTokens(payload);
  }

  async generateUserTokens(payload: { userId: number; tokenVersion: number }) {
    const user = await this.userService.getUserById(payload.userId);

    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    if (payload.tokenVersion !== user.tokenVersion) {
      throw new UnauthorizedException('Versión de token inválida');
    }

    const accessToken = this.jwtService.sign(payload);
    const refreshToken =
      await this.refreshTokenService.createRefreshToken(user);

    return {
      accessToken,
      refreshToken: refreshToken.token,
    };
  }

  async refreshToken(token: string) {
    const refreshToken = await this.refreshTokenService.findToken(token);
    if (!refreshToken || refreshToken.expiresAt < new Date()) {
      throw new UnauthorizedException('Refresh token inválido o expirado');
    }

    const user = await this.userService.getUserById(refreshToken.user.id);
    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    return this.generateUserTokens({
      userId: user.id,
      tokenVersion: user.tokenVersion,
    });
  }

  async logout(userId: number) {
    await this.userService.incrementTokenVersion(userId);
    await this.refreshTokenService.deleteAllForUser(userId);
    return { message: 'Logout exitoso. Todos los tokens fueron invalidados.' };
  }
}
