import { Injectable } from '@angular/core';
import { TodosService } from './todos.service';
import { UserApiService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(public user: UserApiService, public todos: TodosService) {}
}
