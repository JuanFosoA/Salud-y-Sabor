import { BadRequestException, Injectable } from '@nestjs/common';
import { User, Role, Status, DocumentType, Disease } from 'src/users/users.entity';
import { SignupDto } from './dto/signup.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { SigninDto } from './dto/signin.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

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


  // async signin(credentials: SigninDto){

  // }

}
