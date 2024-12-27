import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { RefreshTokenRepository } from '../../ports';

@Injectable()
export class ClearExpiredTokenUseCase {
  constructor(
    private readonly refreshTokenRepository: RefreshTokenRepository,
  ) {}
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async execute() {
    const now = new Date();
    return await this.refreshTokenRepository.deleteExpiredToken(now);
  }
}
