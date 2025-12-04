import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { User } from '../models/user.model';
import { AuthResponse } from '../models/auth-responde.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api = 'http://localhost:8080/auth';

  private USER_ID_KEY = 'userId';

  constructor(private http: HttpClient) {}

  public getUserId(): number | null {
    const idString = localStorage.getItem(this.USER_ID_KEY);
    // Retorna o ID como number ou null se não existir
    return idString ? Number(idString) : null;
  }

  private setUserId(id: number): void {
    localStorage.setItem(this.USER_ID_KEY, id.toString());
  }

  login(credentials: { email: string; senha: string }): Observable<AuthResponse> {
    // Adicione <AuthResponse> ao post
    return this.http.post<AuthResponse>(`${this.api}/login`, credentials).pipe(
      // O TypeScript agora sabe que 'response' tem 'userId'
      tap(response => {
        if (response && response.userId) {
          this.setUserId(response.userId);
        }
      })
    );
  }

 register(data: User): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.api}/register`, data).pipe(
      tap(response => {
        if (response && response.userId) {
          this.setUserId(response.userId);
        }
      })
    );
  }
}

