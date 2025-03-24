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

    const userFound = await this.userService.getUserByEmail(email);

    if (!userFound) {
      throw new UnauthorizedException('Wrong credentials');
    }

    const passwordMatch = await bcrypt.compare(password, userFound.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Wrong credentials');
    }

    return this.generateUserTokens(userFound.email);
  }

  async generateUserTokens(userId: string) {
    const user = await this.userService.getUserByEmail(userId);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const accessToken = this.jwtService.sign({ userId });
    const refreshToken = await this.refreshTokenService.createRefreshToken(user);
    return {
      accessToken,
      refreshToken: refreshToken.token,
    };
  }

  async refreshToken(token: string) {
    const refreshToken = await this.refreshTokenService.findToken(token);
    if (!refreshToken || refreshToken.expiresAt < new Date()) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    const newAccessToken = this.jwtService.sign({ id: refreshToken.user.id });

    return { accessToken: newAccessToken };
  }
}
