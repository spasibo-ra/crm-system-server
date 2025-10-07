import { ConflictException, Injectable } from '@nestjs/common';
import { HashService } from '@shared/hash/hash.service';
import { CreateUserUseCase } from '../user';
import { UserRole } from '@app/domain/crm/user';
import { UserRepository } from '../../ports';

interface RegisterUseCaseCommand {
  email: string;
  password: string;
  name: string;
  role?: UserRole;
  avatarUrl?: string;
}

@Injectable()
export class RegisterUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly createUserUseCase: CreateUserUseCase,
  ) {}

  async execute(registerCommand: RegisterUseCaseCommand) {
    const { email, name, role = 'user', avatarUrl } = registerCommand;
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) throw new ConflictException('Email is already in use');

    const password = await HashService.hashPassword(registerCommand.password);

    await this.createUserUseCase.execute({
      email,
      name,
      password,
      role,
      avatarUrl,
    });

    return { message: 'User registered successfully' };
  }
}
