import { Injectable } from '@angular/core';
import {
  FeatureStateManager,
  ListenEvent
} from 'projects/ngx-state-manager/src/public_api';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service';
import { Todo } from '../models';
import { LogoutEvent } from './events';

interface IState {
  todos: Todo[];
  loaded: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TodosStateService extends FeatureStateManager<IState> {
  initialState: IState = {
    todos: [],
    loaded: false
  };

  constructor(private api: ApiService) {
    super();
  }

  getTodos(): Observable<Todo[]> {
    if (!this.state.getValue('loaded')) {
      this.api.todos.getTodos().subscribe(todos => {
        this.state.set('todos', todos);
        this.state.set('loaded', true);
      });
    }
    return this.state.get('todos');
  }

  @ListenEvent(LogoutEvent)
  clear() {
    this.state.set('todos', []);
    this.state.set('loaded', false);
  }
}
