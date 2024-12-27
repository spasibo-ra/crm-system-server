import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../ports';

@Injectable()
export class GetUserByIdUseCase {
  constructor(private readonly userRepository: UserRepository) {}
  async execute(id: string) {
    return await this.userRepository.findById(id);
  }
}
