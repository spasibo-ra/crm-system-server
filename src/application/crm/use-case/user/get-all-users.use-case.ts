import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../ports/user.repository';

@Injectable()
export class GetAllUsersUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(limit: number, page: number) {
    return await this.userRepository.findAll(limit, page);
  }
}
