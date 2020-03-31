import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StateManagerModule } from 'ngx-state-manager';
import { TodosRoutingModule } from './todos-routing.module';
import { TodosStateService } from './todos-state.service';
import { TodosComponent } from './todos.component';

@NgModule({
  declarations: [TodosComponent],
  imports: [CommonModule, TodosRoutingModule, StateManagerModule.forFeature([TodosStateService])],
  providers: [TodosStateService]
})
export class TodosModule {}
