import { User } from '../entities/user.entity';

export interface IUserRepository {
  findAll(
    limit: number,
    page: number,
  ): Promise<{ data: User[]; total: number }>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(user: User): Promise<User>;
  update(id: string, user: Partial<User>): Promise<User | null>;
  delete(id: string): Promise<void>;
}
