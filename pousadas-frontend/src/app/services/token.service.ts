import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private readonly TOKEN_KEY = 'jwt_token';
  private loggedIn = new BehaviorSubject<boolean>(!!this.getToken());

  
  loggedIn$ = this.loggedIn.asObservable();

  setToken(token: string) {
    if (typeof window === 'undefined') return;
    localStorage.setItem(this.TOKEN_KEY, token);
    this.loggedIn.next(true);
  }
  
  getToken() {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(this.TOKEN_KEY);
  }

  clear() {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(this.TOKEN_KEY);
    this.loggedIn.next(false);
  }

}
