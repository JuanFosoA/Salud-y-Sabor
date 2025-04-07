import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { UsersController } from './users.controller';
import { AuthModule } from '../auth/auth.module';
import { RefreshTokenModule } from './refresh.token.module';
import { ResetTokenModule } from './reset.token.module';
import { MailService } from './services/mail.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => AuthModule),
    RefreshTokenModule,
    ResetTokenModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, MailService],
  exports: [UsersService],
})
export class UsersModule {}
