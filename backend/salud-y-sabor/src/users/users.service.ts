import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { SignupDto } from 'src/auth/dto/signup.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getUserByEmail(email: string) {
    const userFound = await this.userRepository.findOne({
      where: { email },
    });
    return userFound;
  }

  async getUserById(id: number) {
    const userFound = await this.userRepository.findOne({
      where: { id },
    });
    return userFound;
  }

  async getUserByUsername(username: string) {
    const userFound = await this.userRepository.findOne({
      where: { username },
    });
    return userFound;
  }
  
  async createUser(user: SignupDto) {
    const userFound = await this.userRepository.findOne({
      where: { document: user.document },
    });

    if (userFound) {
      throw new HttpException('User already exits', HttpStatus.CONFLICT);
    }

    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

}
