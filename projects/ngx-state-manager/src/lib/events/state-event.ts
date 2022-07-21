export interface StateEvent<T extends string = string> {
  readonly type: T;
  payload?: any;
}
