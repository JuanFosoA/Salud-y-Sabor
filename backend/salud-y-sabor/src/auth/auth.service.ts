import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User, Disease, Role } from 'src/users/users.entity';
import { SignupDto } from './dto/signup.dto';
import * as bcrypt from 'bcryptjs';
import { SigninDto } from './dto/signin.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenService } from 'src/users/refresh.token.service';
import { PassThrough } from 'stream';
import { SpecialistSignupDto } from './dto/specialistSignup.dto';
import { StorageService } from 'src/shared/storage/storage.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private refreshTokenService: RefreshTokenService,
    private readonly storageService: StorageService,
  ) {}

  //CREAR ESPECIALISTA
  async specialistSignup(signupData: SpecialistSignupDto): Promise<User> {
    const email = signupData.email.toLowerCase().trim();

    const emailInUse = await this.userService.getUserByEmail(email);
    if (emailInUse) {
      throw new BadRequestException('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(signupData.password, 10);

    return this.userService.createSpecialist({
      fullname: signupData.fullname,
      documentType: signupData.documentType,
      document: signupData.document,
      email,
      password: hashedPassword,
    });
  }

  //CREAR PACIENTE
  async pacientSignup(
    signupData: SignupDto,
    historialMedicoFile?: Express.Multer.File,
  ): Promise<User> {
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

    let medicalRecordFileName: string | undefined = undefined;
    if (historialMedicoFile) {
      medicalRecordFileName =
        await this.storageService.saveMedicalRecord(historialMedicoFile);
    }

    const hashedPassword = await bcrypt.hash(signupData.password, 10);

    return this.userService.createPacient({
      fullname: signupData.fullname,
      documentType: signupData.documentType,
      document: signupData.document,
      email,
      username: signupData.username,
      historialMedico: medicalRecordFileName,
      password: hashedPassword,
      // height: signupData.height,
      // weight: signupData.weight,
      disease: signupData.disease || Disease.NINGUNA,
    });
  }

  // Iniciar sesión especialista
  async specialistSignin(credentials: SigninDto) {
    const { email, password } = credentials;
    const user = await this.userService.getUserByEmail(email);

    if (!user || user.role != Role.ROLE_ESPECIALISTA) {
      throw new UnauthorizedException(
        'No tienes permisos para acceder a este contenido',
      );
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = {
      userId: user.id,
      tokenVersion: user.tokenVersion,
    };

    return this.generateUserTokens(payload);
  }

  // Iniciar Sesión Paciente
  async pacientSignin(credentials: SigninDto) {
    const { email, password } = credentials;
    const user = await this.userService.getUserByEmail(email);

    if (!user || user.role != Role.ROLE_USER) {
      throw new UnauthorizedException(
        'Debes ser un paciente para acceder a este recurso',
      );
    }

    if (!(await bcrypt.compare(password, user.password))) {
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
