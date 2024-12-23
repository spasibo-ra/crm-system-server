import { Inject, Injectable } from '@nestjs/common';
import { USERS_REPOSITORY } from '@shared/constants';
import { IUserRepository } from '@users/domain/repositories/user.repository';

@Injectable()
export class GetUserByEmailUseCase {
  constructor(
    @Inject(USERS_REPOSITORY) private readonly userRepository: IUserRepository,
  ) {}

  async execute(email: string) {
    return await this.userRepository.findByEmail(email);
  }
}
