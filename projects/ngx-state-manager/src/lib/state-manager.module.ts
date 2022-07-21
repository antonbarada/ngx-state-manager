import { ModuleWithProviders, NgModule, Type } from '@angular/core';
import { StateManagerEvents } from './events/events';
import { ListenersSubscription } from './events/listeners-subscription';
import { FeatureStateManager } from './feature-state-manager';
import { StateManagerFeatureModule } from './state-manager-feature.module';
import { StateManagerRootModule } from './state-manager-root.module';
import { FEATURE_STATE_MANAGERS, ROOT_STATE_MANAGERS } from './tokens';

@NgModule({})
export class StateManagerModule {
  static forRoot(
    rootStateManagers: Type<FeatureStateManager<any>>[]
  ): ModuleWithProviders<StateManagerRootModule> {
    return {
      ngModule: StateManagerRootModule,
      providers: [
        StateManagerEvents,
        ListenersSubscription,
        {
          provide: ROOT_STATE_MANAGERS,
          useFactory: (...instances: FeatureStateManager<any>[]) => instances,
          deps: rootStateManagers,
        },
      ],
    };
  }

  static forFeature(
    featureStateManagers: Type<FeatureStateManager<any>>[]
  ): ModuleWithProviders<StateManagerFeatureModule> {
    return {
      ngModule: StateManagerFeatureModule,
      providers: [
        StateManagerEvents,
        {
          provide: FEATURE_STATE_MANAGERS,
          useFactory: (...instances: FeatureStateManager<any>[]) => instances,
          deps: featureStateManagers,
        },
      ],
    };
  }
}
