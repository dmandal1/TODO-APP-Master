import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResgisterComponent } from './resgister/resgister.component';
import { LoginComponent } from './login/login.component';
import { TodoComponent } from './todo/todo.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'user/register', component: ResgisterComponent },
  { path: 'user/login', component: LoginComponent },
  { path: '', component: TodoComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
