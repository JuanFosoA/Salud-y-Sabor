import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { UsersController } from './users.controller';
import { AuthModule } from '../auth/auth.module';
import { RefreshTokenModule } from './refresh.token.module';
import { ResetTokenModule } from './reset.token.module';
import { MailService } from './services/mail.service';
import { Pacient } from './pacient.entity';
import { Specialist } from './specialist.entity';
import { EspecialistaGuard } from 'src/guards/especialista.guard';
import { PacientsController } from './pacients.controller';
import { StorageService } from 'src/shared/storage/storage.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Pacient, Specialist]),
    forwardRef(() => AuthModule),
    RefreshTokenModule,
    ResetTokenModule,
  ],
  controllers: [UsersController, PacientsController],
  providers: [UsersService, StorageService, MailService, EspecialistaGuard],
  exports: [UsersService],
})
export class UsersModule {}
