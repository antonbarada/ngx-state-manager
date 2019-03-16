import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models';
import { StateManager } from '../state-manager';

@Component({
  selector: 'app-user-nav',
  templateUrl: './user-nav.component.html',
  styleUrls: ['./user-nav.component.css']
})
export class UserNavComponent {
  isAuthenticated$: Observable<
    boolean
  > = this.stateManager.auth.getAuthentication();
  user$: Observable<User> = this.stateManager.auth.getUser();

  constructor(private stateManager: StateManager) {}

  login(): void {
    this.stateManager.auth.login('thebarada');
  }

  logout(): void {
    this.stateManager.auth.logout();
  }
}
