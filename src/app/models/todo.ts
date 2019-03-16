import { BaseModel } from './base';

interface ITodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export class Todo extends BaseModel<ITodo> {
  public userId: number;
  public id: number;
  public title: string;
  public completed: boolean;
}
