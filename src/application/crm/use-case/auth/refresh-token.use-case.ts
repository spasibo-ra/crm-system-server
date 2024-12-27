import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GetUserByIdUseCase } from '../user/get-user-by-id.use-case';
import { TokenPayload } from '@app/domain/crm/token-payload.interface';
import { EnvService } from '@app/infrastructure/env';

interface RefreshTokenUseCaseCommand {
  refreshToken: string;
}

@Injectable()
export class RefreshTokenUseCase {
  constructor(
    private readonly envService: EnvService,
    private readonly jwtService: JwtService,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
  ) {}
  async execute({ refreshToken }: RefreshTokenUseCaseCommand) {
    let decoded: TokenPayload;
    try {
      decoded = await this.jwtService.verifyAsync(refreshToken, {
        secret: this.envService.get('REFRESH_JWT_SECRET'),
      });
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
    const user = await this.getUserByIdUseCase.execute(decoded.id);
    if (!user) throw new UnauthorizedException('User not found');

    const payload: TokenPayload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };
    const accessToken = await this.jwtService.signAsync(payload);
    return { accessToken };
  }
}
