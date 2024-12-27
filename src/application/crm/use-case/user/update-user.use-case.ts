import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@app/domain/crm/user';
import { UserRepository } from '../../ports/user.repository';

interface UpdateUserUseCaseCommand {
  id: string;
  user: Partial<Pick<User, 'name' | 'email' | 'status'>>;
}

@Injectable()
export class UpdateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({ id, user }: UpdateUserUseCaseCommand) {
    const existingUser = await this.userRepository.findById(id);
    if (!existingUser)
      throw new NotFoundException(`User with ID: ${id} not found`);
    const updatedUser = await this.userRepository.update(id, {
      ...user,
      updatedAt: new Date(),
    });
    if (!updatedUser) throw new Error(`Failed to update user with ID ${id}`);
    return updatedUser;
  }
}
