import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HashService } from '@shared/hash/hash.service';
import { TokenPayload } from '@app/domain/crm/token-payload.interface';
import { GetUserByEmailUseCase } from '../user';

interface LoginUseCaseCommand {
  email: string;
  password: string;
}

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly getUserByEmailUseCase: GetUserByEmailUseCase,
    private readonly jwtService: JwtService,
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
    };

    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }
}
