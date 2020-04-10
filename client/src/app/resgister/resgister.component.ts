import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resgister',
  templateUrl: './resgister.component.html',
  styleUrls: ['./resgister.component.scss']
})
export class ResgisterComponent implements OnInit {
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
    this._authService.registerUser(user).subscribe(
      data => {
        console.log(data);
      },
      err => console.log(err)
    );
  }
}
