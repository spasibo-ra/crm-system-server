import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HashService } from '@shared/hash/hash.service';
import { TokenPayload } from '@app/domain/crm/token-payload.interface';
import { GetUserByEmailUseCase } from '../user';
import { EnvService } from '@app/infrastructure/env';

interface LoginUseCaseCommand {
  email: string;
  password: string;
}

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly envService: EnvService,
    private readonly jwtService: JwtService,
    private readonly getUserByEmailUseCase: GetUserByEmailUseCase,
  ) {}

  async execute(loginCommand: LoginUseCaseCommand) {
    const user = await this.getUserByEmailUseCase.execute({
      email: loginCommand.email,
    });
    if (!user) throw new UnauthorizedException('Invalid credential');

    const isPasswordValid = await HashService.verifyPassword(
      loginCommand.password,
      user.password,
    );
    if (!isPasswordValid) throw new UnauthorizedException('Invalid credential');

    const payload: TokenPayload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const refreshOptions = {
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
