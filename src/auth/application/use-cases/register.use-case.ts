import { ConflictException, Injectable } from '@nestjs/common';
import { HashService } from '@shared/hash/hash.service';

import { CreateUserUseCase } from '@users/application/use-cases/create-user.use-case';
import { GetUserByEmailUseCase } from '@users/application/use-cases/get-user-by-email.use-case';

import { RegisterDto } from '../dto/register.dto';

@Injectable()
export class RegisterUseCase {
  constructor(
    private readonly getUserByEmailUseCase: GetUserByEmailUseCase,
    private readonly createUserUseCase: CreateUserUseCase,
  ) {}

  async execute(registerDto: RegisterDto) {
    const { email, name } = registerDto;
    const existingUser = await this.getUserByEmailUseCase.execute(email);
    if (existingUser) throw new ConflictException('Email is already in use');

    const password = await HashService.hashPassword(registerDto.password);

    await this.createUserUseCase.execute({
      email,
      name,
      password,
    });

    return { message: 'User registered successfully' };
  }
}
