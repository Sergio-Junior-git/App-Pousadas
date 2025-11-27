import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor( private tokenService: TokenService,
  @Inject(PLATFORM_ID) private platformId: Object) {}

intercept(req: HttpRequest<any>, next: HttpHandler) {
  if (!isPlatformBrowser(this.platformId)) {
    return next.handle(req);
  }

  const token = this.tokenService.getToken();

  if (token) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }

  return next.handle(req);
  }
}

