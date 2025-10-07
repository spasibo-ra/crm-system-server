import { DealStage, DealStatus } from '@app/domain/crm/deal';
import { InteractionType } from '@app/domain/crm/interaction';
import { TaskStatus } from '@app/domain/crm/task';
import { UserRole, UserStatus } from '@app/domain/crm/user';

export interface UserTable {
  id: string;
  email: string;
  password: string;
  name: string;
  role: UserRole;
  status: UserStatus;
  avatarUrl: string | null;
  lastLoginAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CustomerTable {
  id: string;
  email: string;
  name: string;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface InteractionTable {
  id: string;
  customerId: string;
  managerId: string;
  type: InteractionType;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DealTable {
  id: string;
  customerId: string;
  managerId: string;
  title: string;
  description?: string;
  status: DealStatus;
  stage: DealStage;
  amount: number;
  currency: string;
  closedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CompanyTable {
  id: string;
  name: string;
  industry?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ContactTable {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  companyId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TaskTable {
  id: string;
  managerId: string;
  customerId: string;
  dealId: string;
  title: string;
  description?: string;
  status: TaskStatus;
  dueDate?: Date;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface RefreshTokenTable {
  id: string;
  userId: string;
  token: string;
  expiresAt: Date;
  createdAt: Date;
}
