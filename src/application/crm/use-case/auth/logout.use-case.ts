import { Injectable } from '@nestjs/common';
import { RefreshTokenRepository } from '../../ports';

interface LogoutUseCaseCommand {
  userId: string;
}

@Injectable()
export class LogoutUseCase {
  constructor(private readonly refreshTokenRep: RefreshTokenRepository) {}

  async execute({ userId }: LogoutUseCaseCommand) {
    return await this.refreshTokenRep.deleteByUserId(userId);
  }
}
