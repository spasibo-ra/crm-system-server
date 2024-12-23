import { Inject, Injectable } from '@nestjs/common';
import * as crypto from 'node:crypto';
import { IUserRepository } from '../../domain/repositories/user.repository';
import { CreateUserDto } from '../dto/user.dto';
import { User } from '../../domain/entities/user.entity';
import { USERS_REPOSITORY } from '@shared/constants';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(USERS_REPOSITORY) private readonly userRepository: IUserRepository,
  ) {}

  async execute(createUserDto: CreateUserDto): Promise<User> {
    const user = new User(
      crypto.randomUUID(),
      createUserDto.name,
      createUserDto.email,
      createUserDto.password,
      new Date(),
      new Date(),
    );
    return this.userRepository.create(user);
  }
}
