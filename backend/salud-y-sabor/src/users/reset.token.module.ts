import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { ResetToken } from './reset.token.entity';
import { ResetTokenService } from './reset.token.service';

@Module({
  imports: [TypeOrmModule.forFeature([ResetToken, User])],
  providers: [ResetTokenService],
  exports: [ResetTokenService],
})
export class ResetTokenModule {}
