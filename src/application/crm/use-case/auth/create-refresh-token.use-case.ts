import { randomUUID } from 'node:crypto';
import { Injectable } from '@nestjs/common';
import { RefreshTokenRepository } from '../../ports';
import { RefreshToken } from '@app/domain/crm/refresh-token';

interface CreateRefreshTokenUseCaseCommand {
  userId: string;
  token: string;
}

@Injectable()
export class CreateRefreshTokenUseCase {
  constructor(
    private readonly refreshTokenRepository: RefreshTokenRepository,
  ) {}
  async execute({ token, userId }: CreateRefreshTokenUseCaseCommand) {
    const newRefreshToken = new RefreshToken({
      id: randomUUID(),
      token,
      userId,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      createdAt: new Date(),
    });
    await this.refreshTokenRepository.create(newRefreshToken);
  }
}
