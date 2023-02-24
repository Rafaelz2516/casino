import { User } from '../schemas/user.schema';

export class UserDto {
  readonly username: string;
  readonly birthDate: Date;
  readonly balance: number;

  constructor(object: User) {
    this.username = object.username;
    this.birthDate = object.birthDate;
    this.balance = object.balance;
  }
}
