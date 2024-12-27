import { TokenPayload } from '@app/domain/crm/token-payload.interface';
import { EnvService } from '@app/infrastructure/env';
import { Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';

interface GenerateTokensUseCaseCommand {
  payload: TokenPayload;
}

@Injectable()
export class GenerateTokensUseCase {
  constructor(
    private readonly envService: EnvService,
    private readonly jwtService: JwtService,
  ) {}

  async execute({ payload }: GenerateTokensUseCaseCommand) {
    const refreshOptions: JwtSignOptions = {
      secret: this.envService.get('REFRESH_JWT_SECRET'),
      expiresIn: this.envService.get('REFRESH_EXPIRES_IN'),
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(payload, refreshOptions),
    ]);
    return { accessToken, refreshToken };
  }
}
