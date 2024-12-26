import { Entity } from '@app/core/entities/entity';

export type DealStatus = 'open' | 'in_progress' | 'closed';

export type DealStage =
  | 'initial'
  | 'discussion'
  | 'negotiation'
  | 'success'
  | 'failure';

export interface DealProps {
  id?: string;
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

export class Deal extends Entity<DealProps> {
  constructor(props: DealProps) {
    super(props);
  }

  get id(): string {
    return this.props.id;
  }

  get customerId(): string {
    return this.props.customerId;
  }

  get managerId(): string {
    return this.props.managerId;
  }

  get title(): string {
    return this.props.title;
  }

  get description(): string {
    return this.props.description;
  }

  get status(): DealStatus {
    return this.props.status;
  }

  get stage(): DealStage {
    return this.props.stage;
  }

  get amount(): number {
    return this.props.amount;
  }

  get currency(): string {
    return this.props.currency;
  }

  get closedAt(): Date {
    return this.props.closedAt;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  get currentState(): DealProps {
    return this.props;
  }
}
