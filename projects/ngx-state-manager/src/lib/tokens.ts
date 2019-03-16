import { InjectionToken } from '@angular/core';
import { FeatureStateManager } from './feature-state-manager';

export const ROOT_STATE_MANAGERS = new InjectionToken<
  FeatureStateManager<any>[]
>('state-manager: Root State Managers');

export const FEATURE_STATE_MANAGERS = new InjectionToken<
  FeatureStateManager<any>[]
>('state-manager: Feature State Managers');
