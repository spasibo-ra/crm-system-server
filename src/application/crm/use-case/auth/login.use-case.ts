import { Injectable, UnauthorizedException } from '@nestjs/common';
import { HashService } from '@shared/hash/hash.service';
import { TokenPayload } from '@app/domain/crm/token-payload.interface';
import { UserRepository } from '../../ports';
import { GenerateTokensUseCase } from './generate-tokens.use-case';
import { CreateRefreshTokenUseCase } from './create-refresh-token.use-case';

interface LoginUseCaseCommand {
  email: string;
  password: string;
}

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly generateTokensUseCase: GenerateTokensUseCase,
    private readonly createRefreshTokenUseCase: CreateRefreshTokenUseCase,
  ) {}

  async execute(loginCommand: LoginUseCaseCommand) {
    const user = await this.userRepository.findByEmail(loginCommand.email);
    if (!user) throw new UnauthorizedException('Invalid credential');

    const isPasswordValid = await HashService.verifyPassword(
      loginCommand.password,
      user.password,
    );
    if (!isPasswordValid) throw new UnauthorizedException('Invalid credential');

    await this.userRepository.updateLastLogin(user.id);

    const payload: TokenPayload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const { accessToken, refreshToken } =
      await this.generateTokensUseCase.execute({ payload });
    await this.createRefreshTokenUseCase.execute({
      userId: user.id,
      token: refreshToken,
    });
    return { accessToken, refreshToken };
  }
}
