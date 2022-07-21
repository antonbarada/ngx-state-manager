import { Observable } from 'rxjs';
import { State, IState } from './state';

export abstract class FeatureStateManager<T extends IState> {
  protected readonly state!: State<T>;

  constructor(initialState: T) {
    this.state = new State(initialState);
  }

  getState<K extends keyof T>(key: K): Observable<T[K]> {
    return this.state.get(key);
  }

  getStateValue<K extends keyof T>(key: K): T[K] {
    return this.state.getValue(key);
  }
}
