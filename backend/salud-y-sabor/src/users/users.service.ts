import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { SignupDto } from 'src/auth/dto/signup.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';
import { nanoid } from 'nanoid';
import { ResetTokenService } from './reset.token.service';
import { MailService } from './services/mail.service';
import { SpecialistSignupDto } from 'src/auth/dto/specialistSignup.dto';
import { Pacient } from './pacient.entity';
import { Specialist } from './specialist.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Pacient) private pacientRepository: Repository<Pacient>,
    @InjectRepository(Specialist) private specialistRepository: Repository<Specialist>,
    private resetTokenService: ResetTokenService,
    private mailService: MailService,
  ) {}

  async getUserByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }

  async getUserById(id: number) {
    const userFound = await this.userRepository.findOne({
      where: { id },
    });
    return userFound;
  }

  async getUserByUsername(username: string) {
    return await this.pacientRepository.findOne({ where: { username } });
  }

  async createPacient(user: SignupDto) {
    const userFound = await this.pacientRepository.findOne({
      where: { document: user.document },
    });

    if (userFound) {
      throw new HttpException('Pacient already exists', HttpStatus.CONFLICT);
    }

    const newUser = this.pacientRepository.create(user);
    return this.pacientRepository.save(newUser);
  }

  async createSpecialist(user: SpecialistSignupDto) {
    const userFound = await this.userRepository.findOne({
      where: { document: user.document },
    });

    if (userFound) {
      throw new HttpException('Specialist already exists', HttpStatus.CONFLICT);
    }

    const newSpecialist = this.specialistRepository.create(user);
    return this.specialistRepository.save(newSpecialist);
  }

  async updateUser(
    userId: number,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    Object.assign(user, updateUserDto);
    return this.userRepository.save(user);
  }

  async incrementTokenVersion(userId: number): Promise<void> {
    await this.userRepository.update(
      { id: userId },
      { tokenVersion: () => 'tokenVersion + 1' },
    );
  }

  async changePassword(
    userId: number,
    oldPassword: string,
    newPassword: string,
  ) {
    const user = await this.getUserById(userId);
    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }
    if (oldPassword === newPassword) {
      throw new UnauthorizedException('Las contraseñas no deben ser iguales');
    }
    const passwordMatch = await bcrypt.compare(oldPassword, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Wrong credentials');
    }

    const newHashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = newHashedPassword;
    await this.userRepository.save(user);
    return { message: 'Password changed' };
  }

  async forgotPassword(email: string) {
    const user = await this.userRepository.findOne({ where: { email } })
    if (user) {
      const resetToken = nanoid(64);
      await this.resetTokenService.createResetToken(user, resetToken);
      await this.mailService.sendPasswordResetEmail(email, resetToken)
    }

    return { message: 'If this user exits, they will receive an email'}
  }

  async resetPassword(newPassword: string, resetToken: string){
    const token = await this.resetTokenService.findToken(resetToken);
    if (!token) {
      throw new UnauthorizedException('Invalid token')
    }
    await this.resetTokenService.deleteToken(token);

    const user = await this.getUserById(token.id);
    if (!user) {
      throw new InternalServerErrorException();
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await this.userRepository.save(user);
    return { message: 'Password changed' };
  }
}
