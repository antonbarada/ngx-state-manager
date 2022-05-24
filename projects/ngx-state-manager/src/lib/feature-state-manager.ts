import { Observable } from 'rxjs';
import { State } from './state';

export abstract class FeatureStateManager<T extends object> {
  protected readonly state: State<T> = new State();
  protected readonly initialState!: T;

  onInit() {
    this.setInitialState();
  }

  getState<K extends keyof T>(key: K): Observable<T[K]> {
    return this.state.get(key);
  }

  getStateValue<K extends keyof T>(key: K): T[K] {
    return this.state.getValue(key);
  }

  private setInitialState() {
    if (this.initialState) {
      for (const key in this.initialState) {
        if (this.initialState.hasOwnProperty(key)) {
          this.state.set(key, this.initialState[key]);
        }
      }
    }
  }
}
