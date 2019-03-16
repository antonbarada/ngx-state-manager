import { Injectable } from '@angular/core';
import { AuthStateService } from './auth.service';
import { TodosStateService } from './todos.service';

@Injectable({
  providedIn: 'root'
})
export class StateManager {
  constructor(public auth: AuthStateService, public todos: TodosStateService) {}
}
