import { ModuleWithProviders, NgModule, Type } from '@angular/core';
import { StateManagerEvents } from './events/events';
import { ListenersSubscription } from './events/listeners-subscription';
import { FeatureStateManager } from './feature-state-manager';
import { StateManagerRootModule } from './state-manager-root.module';
import { FEATURE_STATE_MANAGERS, ROOT_STATE_MANAGERS } from './tokens';

@NgModule({})
export class StateManagerModule {
  static forRoot(rootStateManagers: Type<any>[]): ModuleWithProviders {
    return {
      ngModule: StateManagerRootModule,
      providers: [
        StateManagerEvents,
        ListenersSubscription,
        rootStateManagers,
        {
          provide: ROOT_STATE_MANAGERS,
          deps: rootStateManagers,
          useFactory: createManagerInstances
        }
      ]
    };
  }

  static forFeature(featureStateManagers: Type<any>[]): ModuleWithProviders {
    return {
      ngModule: StateManagerRootModule,
      providers: [
        featureStateManagers,
        {
          provide: FEATURE_STATE_MANAGERS,
          deps: featureStateManagers,
          useFactory: createManagerInstances
        }
      ]
    };
  }
}

export function createManagerInstances(
  ...instances: FeatureStateManager<any>[]
) {
  instances.forEach(i => i.onInit());
  return instances;
}
