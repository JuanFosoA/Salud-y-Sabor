import { BadRequestException, Injectable } from '@nestjs/common';
import { User, Role, Status, DocumentType, Disease } from 'src/users/users.entity';
import { SignupDto } from './dto/signup.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async signup(signupData: SignupDto): Promise<User> {
   
    const email = signupData.email.toLowerCase().trim();

    
    const emailInUse = await this.userRepository.findOne({ where: { email } });
    if (emailInUse) {
      throw new BadRequestException('Email already in use');
    }

    
    const usernameInUse = await this.userRepository.findOne({
      where: { username: signupData.username },
    });
    if (usernameInUse) {
      throw new BadRequestException('Username already in use');
    }

    
    const hashedPassword = await bcrypt.hash(signupData.password, 10);

   
    const newUser = this.userRepository.create({
      fullname: signupData.fullname,
      documentType: signupData.documentType,
      document: signupData.document,
      email, 
      username: signupData.username,
      password: hashedPassword, 
      height: signupData.height,
      Weight: signupData.weight, 
      disease: signupData.disease || Disease.NINGUNA, 
      status: Status.ACTIVE, 
      role: Role.ROLE_USER, 
    });

    return this.userRepository.save(newUser);
  }
}
