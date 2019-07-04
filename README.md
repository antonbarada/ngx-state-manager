# ngx-state-manager

[![npm version](https://badge.fury.io/js/ngx-state-manager.svg)](https://badge.fury.io/js/ngx-state-manager) [![npm downloads](https://img.shields.io/npm/dm/ngx-state-manager.svg)](https://www.npmjs.com/package/ngx-state-manager)

Simple state manager based on Angular services.

## Table of contents:

- [Prerequisites](#prerequisites)
- [Getting started](#getting-started)
  - [Installation](#installation)
  - [Create state service](#create-state-service)
  - [app.module.ts](#app.module.ts)
  - [state-manager.ts](#state-manager.ts)
  - [app.component.ts](#app.component.ts)
- [Events](#events)
- [Feature module](#feature-module)
- [License](#license)

## Prerequisites

This package depends on Angular `v8.0.0`.

## Getting started

### Installation

Install **ngx-state-manager** from npm:

```bash
npm install ngx-state-manager --save
```

### Create state service

Define your state **IState** and create **TodosStateService** that will extends abstract class **FeatureStateManager**.
The main thing provided by **FeatureStateManager** is state instance by wich we manipulate with state shanges.
You could also define initial state (optionaly), otherwise all inital values will be `null`:

```ts
interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

interface IState {
  todos: Todo[];
  loaded: boolean;
}

@Injectable({ providedIn: 'root' })
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
      this.api.todos.getAll().subscribe(todos => {
        this.state.set('todos', todos);
        this.state.set('loaded', true);
      });
    }
    return this.state.get('todos');
  }
}
```

### app.module.ts

Add **TodosStateService** to your app module using **StateManagerModule**:

```ts
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, StateManagerModule.forRoot([TodosStateService])],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

### state-manager.ts

For your convenience create **StateManager** that gonna include all state services:

```ts
@Injectable({ providedIn: 'root' })
export class StateManager {
  constructor(
    public todos: TodosStateService,
    public auth: AuthStateService,
    public whatever: MyAnotherStateService
  ) {}
}
```

### app.component.ts

Now you can use **StateManager** in app component:

```ts
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  todos$: Observable<Todo[]> = this.stateManager.todos.getTodos();

  constructor(public stateManager: StateManager) {}
}
```

## Events

Besides simple state management library provide events broadcasting mechanism.
This mechanism is achived using **StateManagerEvents**.

For example, you need to clear todos after you've logged out. First of all you need define event:

### events.ts

```ts
export class LogoutEvent implements StateEvent {
  readonly type = 'LogoutEvent';
}
```

Then inject **StateManagerEvents** and use `broadcast` method with created event as an arguemnt:

### auth-state.service.ts

```ts
@Injectable({ providedIn: 'root' })
export class AuthStateService extends FeatureStateManager<IState> {
  constructor(private events$: StateManagerEvents) {
    super();
  }

  logout(): void {
    this.state.set('user', null);
    localStorage.removeItem(loggedInKey);
    this.events$.broadcast(new LogoutEvent());
  }
}
```

To catch event use `ListenEvent` decorator with appropriate method

### todos-state.service.ts

```ts
@Injectable({ providedIn: 'root' })
export class TodosStateService extends FeatureStateManager<IState> {
  ...

  @ListenEvent(LogoutEvent)
  clear() {
    this.state.set('todos', []);
    this.state.set('loaded', false);
  }
}

```

## Feature module

You can isolate states and events within particular module using `forFeature` method of **StateManagerModule**:

```ts
@NgModule({
  imports: [BrowserModule, StateManagerModule.forFeature([FeatureStateService])]
})
export class MyFeatureModule {}
```

## API

`State` has following methods:

- `get(key: string): Observable<any>` get observable of value from state by key
- `set(key: string, value: any): void` set value to state using key
- `getValue(key: string): any` get current value from state by value (not observable)

`StateManagerEvents` has following methods:

- `broadcast(value: StateEvent): void` broadcast event to all listeners

## License

The MIT License (MIT)
