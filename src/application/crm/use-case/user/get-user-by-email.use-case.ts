import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../ports/user.repository';

interface GetUserByEmailUseCaseCommand {
  email: string;
}

@Injectable()
export class GetUserByEmailUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({ email }: GetUserByEmailUseCaseCommand) {
    return await this.userRepository.findByEmail(email);
  }
}
