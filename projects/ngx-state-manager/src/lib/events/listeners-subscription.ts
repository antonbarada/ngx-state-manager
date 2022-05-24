import { Injectable, OnDestroy, Optional, SkipSelf } from '@angular/core';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { FeatureStateManager } from '../feature-state-manager';
import { getListenerMetadata } from './event-listener-metadata';
import { StateManagerEvents } from './events';

@Injectable()
export class ListenersSubscription extends Subscription implements OnDestroy {
  constructor(
    @Optional()
    @SkipSelf()
    public parent: ListenersSubscription,
    private events$: StateManagerEvents
  ) {
    super();

    if (Boolean(parent)) {
      parent.add(this);
    }
  }

  addStateManager(stateManager: FeatureStateManager<any>) {
    const listeners = getListenerMetadata(stateManager);
    if (!listeners?.length) {
      return;
    }
    listeners.forEach(({ methodName, type }) => {
      const sub = this.events$
        .pipe(filter(e => e instanceof type))
        .subscribe(e => (stateManager as any)[methodName](e.payload));

      this.add(sub);
    });
  }

  ngOnDestroy() {
    if (!this.closed) {
      this.unsubscribe();
    }
  }
}
