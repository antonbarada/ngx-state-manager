import { StateEvent } from 'projects/ngx-state-manager/src/public_api';

export class LogoutEvent implements StateEvent {
  readonly type = 'LogoutEvent';
}
