import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IUserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/user.entity';
import { UpdateUserDto } from '../dto/user.dto';
import { USERS_REPOSITORY } from '@shared/constants';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject(USERS_REPOSITORY) private readonly userRepository: IUserRepository,
  ) {}

  async execute(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findById(id);
    if (!existingUser)
      throw new NotFoundException(`User with ID: ${id} not found`);
    const updatedUser = await this.userRepository.update(id, {
      ...updateUserDto,
      updatedAt: new Date(),
    });
    if (!updatedUser) throw new Error(`Failed to update user with ID ${id}`);
    return updatedUser;
  }
}
