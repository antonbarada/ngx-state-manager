import { BehaviorSubject, Observable } from 'rxjs';

export class State<T extends object> {
  private readonly state: { [K in keyof T]?: BehaviorSubject<T[K]> } = {};

  get<K extends keyof T>(key: K): Observable<T[K]> {
    return this.state[key]!.asObservable();
  }

  set<K extends keyof T>(key: K, value: T[K]): void {
    if (!this.state[key]) {
      this.state[key] = new BehaviorSubject(value);
      return;
    }
    this.state[key]!.next(value);
  }

  getValue<K extends keyof T>(key: K): T[K] {
    return this.state[key]!.getValue();
  }
}
