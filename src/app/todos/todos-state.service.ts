import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FeatureStateManager, ListenEvent } from 'ngx-state-manager';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Todo } from '../models';
import { LogoutEvent } from '../state-manager/events';

interface IState {
  todos: Todo[];
  loaded: boolean;
}

@Injectable()
export class TodosStateService extends FeatureStateManager<IState> {
  initialState: IState = {
    todos: [],
    loaded: false
  };

  constructor(private http: HttpClient) {
    super();
  }

  getTodos(): Observable<Todo[]> {
    if (!this.state.getValue('loaded')) {
      this.http
        .get<Todo[]>(`todos`)
        .pipe(map(todos => todos.map(todo => new Todo(todo))))
        .subscribe(todos => {
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
