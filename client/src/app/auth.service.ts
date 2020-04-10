import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
   providedIn: 'root'
})
export class AuthService {
   private registerUrl = 'api/user/register';
   private loginUrl = 'api/user/login';
   private httpOptions = {
      headers: new HttpHeaders({
         'Content-Type': 'application/json'
      })
   };
   constructor(private http: HttpClient, private router: Router) {}

   registerUser(user): Observable<any> {
      return this.http.post(this.registerUrl, user, this.httpOptions);
   }

   loginUser(user) {
      this.http.post(this.loginUrl, user, this.httpOptions).subscribe(
         res => {
            localStorage.setItem('token', res['data']['token']);
            this.router.navigate(['/']);
         },
         err => console.log(err)
      );
   }

   isUserLoggedIn(): boolean {
      return !!localStorage.getItem('token');
   }

   getToken() {
      return localStorage.getItem('token') ? localStorage.getItem('token') : '';
   }

   logoutUser() {
      localStorage.removeItem('token');
      this.router.navigate(['/user/login']);
   }
}
