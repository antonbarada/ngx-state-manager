import { State } from './state';

export abstract class FeatureStateManager<T> {
  protected state: State<T> = new State();
  protected initialState: T;

  onInit() {
    this.setInitialState();
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
