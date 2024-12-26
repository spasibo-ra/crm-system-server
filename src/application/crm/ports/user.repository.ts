import { User } from '@app/domain/crm/user';

export abstract class UserRepository {
  abstract findAll(
    limit: number,
    page: number,
  ): Promise<{ data: User[]; total: number }>;
  abstract findById(id: string): Promise<User | null>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract create(user: User): Promise<User>;
  abstract update(id: string, user: Partial<User>): Promise<User | null>;
  abstract delete(id: string): Promise<void>;
}
