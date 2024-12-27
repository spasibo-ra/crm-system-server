import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from '@app/domain/crm/token-payload.interface';
import { EnvService } from '@app/infrastructure/env';
import { RefreshTokenRepository, UserRepository } from '../../ports';
import { GenerateTokensUseCase } from './generate-tokens.use-case';
import { CreateRefreshTokenUseCase } from './create-refresh-token.use-case';

interface RefreshAccessTokenUseCaseCommand {
  refreshToken: string;
}

@Injectable()
export class RefreshAccessTokenUseCase {
  constructor(
    private readonly envService: EnvService,
    private readonly jwtService: JwtService,
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly userRepository: UserRepository,
    private readonly generateTokensUseCase: GenerateTokensUseCase,
    private readonly createRefreshTokenUseCase: CreateRefreshTokenUseCase,
  ) {}
  async execute({ refreshToken }: RefreshAccessTokenUseCaseCommand) {
    const tokenRecord =
      await this.refreshTokenRepository.findByToken(refreshToken);
    if (!tokenRecord) throw new UnauthorizedException('Invalid refresh token');

    let decoded: TokenPayload;
    try {
      decoded = await this.jwtService.verifyAsync(refreshToken, {
        secret: this.envService.get('REFRESH_JWT_SECRET'),
      });
    } catch {
      throw new UnauthorizedException('Invalid token');
    }

    const user = await this.userRepository.findById(decoded.id);
    if (!user) throw new UnauthorizedException('User not found');

    await this.refreshTokenRepository.deleteByToken(refreshToken);

    const payload: TokenPayload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const { accessToken, refreshToken: newToken } =
      await this.generateTokensUseCase.execute({ payload });

    await this.createRefreshTokenUseCase.execute({
      token: newToken,
      userId: user.id,
    });

    return { accessToken, refreshToken: newToken };
  }
}
