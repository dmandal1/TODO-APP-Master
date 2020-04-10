import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ResgisterComponent } from './resgister/resgister.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TodoComponent } from './todo/todo.component';
import { TokenInterceptorService } from './token-interceptor.service';
import { TodoListComponent } from './todo-list/todo-list.component';
import { HeaderComponent } from './header/header.component';
import { NotificationComponent } from './notification/notification.component';

@NgModule({
  declarations: [
    AppComponent,
    ResgisterComponent,
    LoginComponent,
    TodoComponent,
    TodoListComponent,
    HeaderComponent,
    NotificationComponent
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
