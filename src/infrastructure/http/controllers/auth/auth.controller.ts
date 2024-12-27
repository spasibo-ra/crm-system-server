import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  LoginUseCase,
  RefreshTokenUseCase,
  RegisterUseCase,
} from '@app/application/crm/use-case/auth';
import { LoginDto, RefreshTokenDto, RegisterDto } from '../../dto/auth';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly registerUseCase: RegisterUseCase,
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
  ) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.loginUseCase.execute(loginDto);
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return await this.registerUseCase.execute(registerDto);
  }

  @Post('refresh-token')
  async refreshToken(@Body() body: RefreshTokenDto) {
    return await this.refreshTokenUseCase.execute(body);
  }
}
