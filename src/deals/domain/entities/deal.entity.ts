export class Deal {
  constructor(
    public id: string,
    public customerId: string,
    public managerId: string,
    public title: string,
    public description: string | null,
    public status: string,
    public stage: string,
    public amount: number,
    public currency: string,
    public closedAt: Date | null,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
}
