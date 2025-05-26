import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, In, Repository } from 'typeorm';
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
import {
  StorageFolder,
  StorageService,
} from 'src/shared/storage/storage.service';
import { Menu } from 'src/menus/menus.entity';
import { Recipe } from 'src/recipes/recipes.entity';
import { UpdatePacientDto } from './dto/updatePacient.dto';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { promises } from 'dns';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Pacient) private pacientRepository: Repository<Pacient>,
    @InjectRepository(Specialist)
    private specialistRepository: Repository<Specialist>,
    @InjectRepository(Menu) private menuRepository: Repository<Menu>,
    @InjectRepository(Recipe) private recipeRepository: Repository<Recipe>,
    private resetTokenService: ResetTokenService,
    private mailService: MailService,
    private readonly storageService: StorageService,
    private jwtService: JwtService,
  ) {}

  private extractSpecialistId(request: Request): number {
    const authHeader = request.headers.authorization;
    if (!authHeader)
      throw new HttpException(
        'Authorization header missing',
        HttpStatus.UNAUTHORIZED,
      );

    const token = authHeader.split(' ')[1];
    const decoded = this.jwtService.decode(token) as { userId: number };

    if (!decoded?.userId) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }

    return decoded.userId;
  }

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
  // PACIENTE
  async createPacient(user: SignupDto) {
    const { specialistId, ...pacientData } = user;

    const userFound = await this.pacientRepository.findOne({
      where: { document: pacientData.document },
    });

    if (userFound) {
      throw new HttpException('Pacient already exists', HttpStatus.CONFLICT);
    }

    const pacient = this.pacientRepository.create(user);

    if (specialistId) {
      const specialist = await this.specialistRepository.findOneBy({
        id: specialistId,
      });

      if (!specialist) {
        throw new NotFoundException(
          `Specialist with ID ${specialistId} not found`,
        );
      }

      pacient.specialist = specialist;
      pacient.specialistId = specialistId;
    } else {
      pacient.specialist = null;
      pacient.specialistId = null;
    }

    return this.pacientRepository.save(pacient);
  }

  async getPacientById(id: number): Promise<Pacient | null> {
    const pacientFound = await this.pacientRepository.findOne({
      where: { id },
    });
    return pacientFound;
  }

  async getAllPacients(request: Request, skip: number = 0, take: number = 10) {
    const specialistId = this.extractSpecialistId(request);

    return this.pacientRepository.find({
      where: { specialistId },
      skip,
      take,
      order: { id: 'ASC' },
      relations: ['menus', 'recipes'],
    });
  }

  async getPacientsByName(request: Request, name: string) {
    const specialistId = this.extractSpecialistId(request);

    return this.pacientRepository.find({
      where: {
        specialistId,
        fullname: ILike(`%${name}%`),
      },
      relations: ['menus', 'recipes'],
    });
  }

  async deletePacient(request: Request, id: number) {
    const specialistId = this.extractSpecialistId(request);

    const pacient = await this.pacientRepository.findOne({
      where: { id, specialistId },
    });

    if (!pacient) {
      throw new NotFoundException('Pacient not found or not authorized');
    }

    await this.pacientRepository.remove(pacient);
    return { message: 'Pacient deleted successfully' };
  }

  async getMedicalRecord(pacientId: number) {
    const pacient = await this.getPacientById(pacientId);
    if (!pacient || !pacient.historialMedico) {
      throw new NotFoundException('Medical record not found');
    }

    return {
      filename: pacient.historialMedico,
      data: await this.storageService.getFile(
        pacient.historialMedico,
        StorageFolder.MEDICAL_RECORDS,
      ),
    };
  }

  async updatePacient(
    request: Request,
    id: number,
    updatePacientDto: UpdatePacientDto,
  ): Promise<Pacient> {
    const specialistId = this.extractSpecialistId(request);
    const pacient = await this.pacientRepository.findOne({
      where: { id, specialistId },
      relations: ['menus', 'recipes'],
    });

    if (!pacient) {
      throw new NotFoundException(`Pacient with ID ${id} not found`);
    }

    Object.assign(pacient, updatePacientDto);

    if (updatePacientDto.menuIds) {
      const menus = await this.menuRepository.findBy({
        id: In(updatePacientDto.menuIds),
      });
      pacient.menus = menus;
    }

    if (updatePacientDto.recipeIds) {
      const recipes = await this.recipeRepository.findBy({
        id: In(updatePacientDto.recipeIds),
      });
      pacient.recipes = recipes;
    }

    return this.pacientRepository.save(pacient);
  }

  // ESPECIALISTA
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
    const user = await this.userRepository.findOne({ where: { email } });
    if (user) {
      const resetToken = nanoid(64);
      await this.resetTokenService.createResetToken(user, resetToken);
      await this.mailService.sendPasswordResetEmail(email, resetToken);
    }

    return { message: 'If this user exits, they will receive an email' };
  }

  async resetPassword(newPassword: string, resetToken: string) {
    const token = await this.resetTokenService.findToken(resetToken);
    if (!token) {
      throw new UnauthorizedException('Invalid token');
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
