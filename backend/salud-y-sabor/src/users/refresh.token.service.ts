import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';
import { RefreshToken } from './refresh.tokens.entity';
import { User } from './users.entity';

@Injectable()
export class RefreshTokenService {
  constructor(
    @InjectRepository(RefreshToken)
    private refreshTokenRepository: Repository<RefreshToken>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createRefreshToken(user: User): Promise<RefreshToken> {
    const token = crypto.randomBytes(64).toString('hex');
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 días de expiración

    const refreshToken = this.refreshTokenRepository.create({
      token,
      expiresAt,
      user,
    });

    return this.refreshTokenRepository.save(refreshToken);
  }

  async findToken(token: string): Promise<RefreshToken | null> {
    return this.refreshTokenRepository.findOne({
      where: { token },
      relations: ['user'],
    });
  }

  async deleteToken(token: string): Promise<void> {
    await this.refreshTokenRepository.delete({ token });
  }

  async deleteAllForUser(userId: number): Promise<void> {
    await this.refreshTokenRepository
      .createQueryBuilder()
      .delete()
      .where('userId = :userId', { userId })
      .execute();
  }
}
