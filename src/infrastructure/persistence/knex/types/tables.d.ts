import { InteractionType } from '@app/domain/crm/interaction';

export interface UserTable {
  id: string;
  email: string;
  password: string;
  name: string;
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
