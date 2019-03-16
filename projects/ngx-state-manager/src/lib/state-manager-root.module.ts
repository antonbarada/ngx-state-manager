import { Inject, NgModule } from '@angular/core';
import { ListenersSubscription } from './events/listeners-subscription';
import { FeatureStateManager } from './feature-state-manager';
import { ROOT_STATE_MANAGERS } from './tokens';

@NgModule({})
export class StateManagerRootModule {
  constructor(
    @Inject(ROOT_STATE_MANAGERS) rootStateManagers: FeatureStateManager<any>[],
    private listenersSubscription: ListenersSubscription
  ) {
    rootStateManagers.forEach(stateManager =>
      this.addStateManager(stateManager)
    );
  }

  addStateManager(stateManager: FeatureStateManager<any>) {
    this.listenersSubscription.addStateManager(stateManager);
  }
}
