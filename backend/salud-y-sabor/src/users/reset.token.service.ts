import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';

import { User } from './users.entity';
import { ResetToken } from './reset.token.entity';

@Injectable()
export class ResetTokenService {
  constructor(
    @InjectRepository(ResetToken)
    private resetTokenRepository: Repository<ResetToken>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createResetToken(user: User, token: string): Promise<ResetToken> {
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1); // 1 hora de expiración

    const resetToken = this.resetTokenRepository.create({
      token,
      expiresAt,
      user,
    });
    return this.resetTokenRepository.save(resetToken);
  }

  async findToken(token: string): Promise<ResetToken | null> {
    return this.resetTokenRepository.findOne({
      where: { token },
      relations: ['user'],
    });
  }

  async deleteToken(token: any): Promise<void> {
    await this.resetTokenRepository.delete({ token });
  }
}
