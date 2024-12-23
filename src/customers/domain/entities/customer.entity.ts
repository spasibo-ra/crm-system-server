export class Customer {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public phone: string | null,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
}
