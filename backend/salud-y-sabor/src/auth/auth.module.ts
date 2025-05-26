import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';  
import { UsersModule } from 'src/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { RefreshTokenModule } from 'src/users/refresh.token.module';
import { StorageService } from 'src/shared/storage/storage.service';
import { EspecialistaGuard } from 'src/guards/especialista.guard';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '30m' },
    }),
    forwardRef(() => UsersModule),
    RefreshTokenModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, StorageService, EspecialistaGuard],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
