import { UserRole } from './user';

export interface TokenPayload {
  id: string;
  email: string;
  role: UserRole;
  iat?: number;
  exp?: number;
}
