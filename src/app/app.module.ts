import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StateManagerModule } from 'ngx-state-manager';
import { ApiUrlInterceptor } from './api-url.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { loadEmployee } from './load-user.initializer';
import { StateManager } from './state-manager';
import { AuthStateService } from './state-manager/auth.service';
import { UserNavComponent } from './user-nav/user-nav.component';

@NgModule({
  declarations: [AppComponent, UserNavComponent],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, StateManagerModule.forRoot([AuthStateService])],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiUrlInterceptor, multi: true },
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
