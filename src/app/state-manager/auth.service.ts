import { Injectable } from '@angular/core';
import {
  FeatureStateManager,
  StateManagerEvents
} from 'projects/ngx-state-manager/src/public_api';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from '../api/api.service';
import { User } from '../models';
import { LogoutEvent } from './events';

export const loggedInKey = 'loggedIn';

interface IState {
  user: User;
  isAuthenticated: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthStateService extends FeatureStateManager<IState> {
  protected initialState: IState = {
    user: null,
    isAuthenticated: false
  };

  constructor(private api: ApiService, private events$: StateManagerEvents) {
    super();
  }

  getAuthentication(): Observable<boolean> {
    return this.state.get('user').pipe(map(Boolean));
  }

  getUser(): Observable<User> {
    return this.state.get('user');
  }

  login(username: string): void {
    this.fetchUser(username);
  }

  logout(): void {
    this.state.set('user', null);
    localStorage.removeItem(loggedInKey);
    this.events$.broadcast(new LogoutEvent());
  }

  getAuthenticated(): Observable<User> {
    const loggedInUsername = localStorage.getItem(loggedInKey);
    if (loggedInUsername) {
      this.fetchUser(loggedInUsername);
    }
    return this.state.get('user');
  }

  private fetchUser(username: string) {
    this.api.user.getUser().subscribe({
      next: user => {
        this.state.set('user', user);
        localStorage.setItem(loggedInKey, username);
      },
      error: () => localStorage.removeItem(loggedInKey)
    });
  }
}
