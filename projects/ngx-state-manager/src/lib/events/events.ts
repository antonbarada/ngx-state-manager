import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { StateEvent } from './state-event';

@Injectable()
export class StateManagerEvents<V = StateEvent> extends Subject<V> {
  constructor() {
    super();
  }

  broadcast(event: V): void {
    this.next(event);
  }
}
