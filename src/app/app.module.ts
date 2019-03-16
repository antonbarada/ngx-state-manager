import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StateManagerModule } from 'projects/ngx-state-manager/src/public_api';
import { AppComponent } from './app.component';
import { loadEmployee } from './load-user.initializer';
import { StateManager } from './state-manager';
import { AuthStateService } from './state-manager/auth.service';
import { TodosStateService } from './state-manager/todos.service';
import { UserNavComponent } from './user-nav/user-nav.component';

@NgModule({
  declarations: [AppComponent, UserNavComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    StateManagerModule.forRoot([AuthStateService, TodosStateService])
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: loadEmployee,
      deps: [StateManager],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
