import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  constructor(private _authService: AuthService, private router: Router) {}

  ngOnInit() {
    if (this._authService.isUserLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

  saveUserData() {
    let user = {
      email: this.email,
      password: this.password
    };
    this._authService.loginUser(user);
  }
}
