import { BehaviorSubject, Observable, skip } from 'rxjs';

export interface IState {
  [K: string]: any;
}

export type StateObject<T> = {
  [K in keyof T]: {
    isValueSet: boolean;
    subject: BehaviorSubject<T[K]>;
  };
};

export class State<T extends IState> {
  private readonly initialState: T;
  private readonly state: StateObject<T>;

  constructor(initialState: T) {
    this.initialState = initialState;
    this.state = {} as StateObject<T>;
    this.setInitialValues();
  }

  get<K extends keyof T>(key: K): Observable<T[K]> {
    if (!this.state[key]) {
      this.state[key] = {
        isValueSet: false,
        subject: new BehaviorSubject(undefined as T[K]),
      };
    }
    const observable = this.state[key].subject.asObservable();
    if (!this.state[key].isValueSet) {
      return observable.pipe(skip(1));
    }
    return observable;
  }

  set<K extends keyof T>(key: K, value: T[K]): void {
    if (!this.state[key]) {
      this.state[key] = {
        isValueSet: true,
        subject: new BehaviorSubject(value),
      };
      return;
    }
    this.state[key].isValueSet = true;
    this.state[key].subject.next(value);
  }

  getValue<K extends keyof T>(key: K): T[K] {
    if (!this.state[key]) {
      return undefined as T[K];
    }
    return this.state[key].subject.getValue();
  }

  setInitialValues({ resetValues } = { resetValues: false }) {
    for (const key in this.initialState) {
      if (this.initialState.hasOwnProperty(key)) {
        if (!this.state[key]) {
          this.state[key] = {
            isValueSet: true,
            subject: new BehaviorSubject(this.initialState[key]),
          };
        } else {
          this.state[key].isValueSet = resetValues ? false : this.state[key].isValueSet;
          this.state[key].subject.next(this.initialState[key]);
        }
      }
    }
  }
}
