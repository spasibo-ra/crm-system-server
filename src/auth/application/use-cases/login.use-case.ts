import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HashService } from '@shared/hash/hash.service';
import { GetUserByEmailUseCase } from '@users/application/use-cases/get-user-by-email.use-case';
import { TokenPayload } from '@auth/domain/entities/token-payload.interface';
import { LoginDto } from '../dto/login.dto';

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly getUserByEmailUseCase: GetUserByEmailUseCase,
    private readonly jwtService: JwtService,
  ) {}

  async execute(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const user = await this.getUserByEmailUseCase.execute(loginDto.email);
    if (!user) throw new UnauthorizedException('Invalid credential');

    const isPasswordValid = await HashService.verifyPassword(
      loginDto.password,
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
