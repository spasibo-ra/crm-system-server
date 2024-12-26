import { ConflictException, Injectable } from '@nestjs/common';
import { HashService } from '@shared/hash/hash.service';
import { GetUserByEmailUseCase, CreateUserUseCase } from '../user';

interface RegisterUseCaseCommand {
  email: string;
  password: string;
  name: string;
}

@Injectable()
export class RegisterUseCase {
  constructor(
    private readonly getUserByEmailUseCase: GetUserByEmailUseCase,
    private readonly createUserUseCase: CreateUserUseCase,
  ) {}

  async execute(registerCommand: RegisterUseCaseCommand) {
    const { email, name } = registerCommand;
    const existingUser = await this.getUserByEmailUseCase.execute({ email });
    if (existingUser) throw new ConflictException('Email is already in use');

    const password = await HashService.hashPassword(registerCommand.password);

    await this.createUserUseCase.execute({
      email,
      name,
      password,
    });

    return { message: 'User registered successfully' };
  }
}
