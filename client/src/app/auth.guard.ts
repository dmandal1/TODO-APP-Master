import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
   providedIn: 'root'
})
export class AuthGuard implements CanActivate {
   constructor(private _authService: AuthService, private router: Router) {}
   canActivate(): boolean {
      if (this._authService.isUserLoggedIn()) {
         return true;
      } else {
         this.router.navigate(['/user/login']);
         return false;
      }
   }
}
