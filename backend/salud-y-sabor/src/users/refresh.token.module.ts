import { Module } from '@nestjs/common';
import { RefreshTokenService } from './refresh.token.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshToken } from './refresh.tokens.entity';
import { User } from './users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RefreshToken, User])],
  providers: [RefreshTokenService],
  exports: [RefreshTokenService],
})
export class RefreshTokenModule {}
