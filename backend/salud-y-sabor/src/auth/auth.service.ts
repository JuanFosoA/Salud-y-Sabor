import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { User, Disease } from 'src/users/users.entity';
import { SignupDto } from './dto/signup.dto';
import * as bcrypt from 'bcryptjs';
import { SigninDto } from './dto/signin.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
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


  async signin(credentials: SigninDto){
    const { email, password } = credentials;

    const userFound = await this.userService.getUserByEmail(email);

    if (!userFound) {
      throw new UnauthorizedException('Wrong credentials');
    }

    const passwordMatch = await bcrypt.compare(password, userFound.password);
    if (!passwordMatch){
      throw new UnauthorizedException('Wrong credentials');
    }

    return this.generateUserTokens(userFound.id)
  }

  generateUserTokens(userId: number) {
    const accessToken = this.jwtService.sign({ userId });

    return {
      accessToken,
    }
  }

}
