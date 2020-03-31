import { Component, OnInit } from '@angular/core';
import { StateManager } from '../state-manager/state-manager';
import { TodosStateService } from './todos-state.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  constructor(public stateManager: StateManager, public todosState: TodosStateService) {}

  ngOnInit(): void {}
}
