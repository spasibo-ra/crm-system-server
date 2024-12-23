import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '@users/domain/repositories/user.repository';
import { USERS_REPOSITORY } from '@shared/constants';

@Injectable()
export class GetAllUsersUseCase {
  constructor(
    @Inject(USERS_REPOSITORY) private readonly userRepository: IUserRepository,
  ) {}

  async execute(limit: number, page: number) {
    return await this.userRepository.findAll(limit, page);
  }
}
