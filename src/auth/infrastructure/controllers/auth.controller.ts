import { Controller, Post, Body } from '@nestjs/common';

import { LoginDto } from '@auth/application/dto/login.dto';
import { LoginUseCase } from '@auth/application/use-cases/login.use-case';
import { RegisterUseCase } from '@auth/application/use-cases/register.use-case';
import { RegisterDto } from '@auth/application/dto/register.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly registerUseCase: RegisterUseCase,
  ) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.loginUseCase.execute(loginDto);
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return await this.registerUseCase.execute(registerDto);
  }
}
