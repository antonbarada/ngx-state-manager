import { Component } from '@angular/core';
import { StateManager } from './state-manager';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'state manager';

  constructor(public stateManager: StateManager) {}
}
