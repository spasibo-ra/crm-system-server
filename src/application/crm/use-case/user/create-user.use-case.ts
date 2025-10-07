import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { User, UserRole } from '@app/domain/crm/user';
import { UserRepository } from '../../ports/user.repository';

export interface CreateUserUseCaseCommand {
  email: string;
  password: string;
  name: string;
  role: UserRole;
  avatarUrl?: string;
  lastLoginAt?: Date;
}

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(_user: CreateUserUseCaseCommand) {
    const user = new User({
      id: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
      ..._user,
    });
    const response = await this.userRepository.create(user);
    return response;
  }
}
