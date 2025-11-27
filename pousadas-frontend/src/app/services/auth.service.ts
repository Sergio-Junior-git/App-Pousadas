import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; senha: string }): Observable<any> {
    return this.http.post(`${this.api}/login`, credentials);
  }

  register(data: User) {
    return this.http.post<any>(`${this.api}/register`, data);
  }
}
