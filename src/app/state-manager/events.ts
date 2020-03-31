import { StateEvent } from 'ngx-state-manager';

export class LogoutEvent implements StateEvent {
  readonly type = 'LogoutEvent';
}
