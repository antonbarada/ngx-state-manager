import { Injectable } from '@angular/core';
import { AuthStateService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class StateManager {
  constructor(public auth: AuthStateService) {}
}
