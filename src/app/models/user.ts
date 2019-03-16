import { BaseModel } from './base';

interface IUser {
  name: string;
  avatar: string;
}

export class User extends BaseModel<IUser> implements IUser {
  public name: string;
  public avatar: string;
}
