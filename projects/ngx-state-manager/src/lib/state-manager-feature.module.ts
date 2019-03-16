import { Inject, NgModule } from '@angular/core';
import { FeatureStateManager } from './feature-state-manager';
import { StateManagerRootModule } from './state-manager-root.module';
import { FEATURE_STATE_MANAGERS } from './tokens';

@NgModule({})
export class StateManagerFeatureModule {
  constructor(
    root: StateManagerRootModule,
    @Inject(FEATURE_STATE_MANAGERS)
    featureStateManagers: FeatureStateManager<any>[]
  ) {
    featureStateManagers.forEach(stateManager =>
      root.addStateManager(stateManager)
    );
  }
}
