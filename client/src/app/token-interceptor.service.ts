import { Injectable, Injector } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler
} from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const tokenizedRequest = req.clone({
      headers: req.headers.set('Authorization', this.authService.getToken())
    });
    return next.handle(tokenizedRequest);
  }
}
