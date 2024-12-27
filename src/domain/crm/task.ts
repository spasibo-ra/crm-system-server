import { Entity } from '@app/core/entities/entity';

export type TaskStatus = 'pending' | 'in_progress' | 'completed';

export interface TaskProps {
  id?: string;
  managerId: string;
  customerId: string;
  dealId: string;
  title: string;
  description?: string;
  status: TaskStatus;
  dueDate: Date;
  completedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export class Task extends Entity<TaskProps> {
  constructor(props: TaskProps) {
    props.description = props.description ?? '';
    super(props);
  }

  get id(): string {
    return this.props.id;
  }

  get managerId(): string {
    return this.props.managerId;
  }

  get customerId(): string {
    return this.props.customerId;
  }

  get dealId(): string {
    return this.props.dealId;
  }

  get title(): string {
    return this.props.title;
  }

  get description(): string {
    return this.props.description;
  }

  get status(): TaskStatus {
    return this.props.status;
  }

  get dueDate(): Date {
    return this.props.dueDate;
  }

  get completedAt(): Date {
    return this.props.completedAt;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  get currentState(): TaskProps {
    return this.props;
  }
}
