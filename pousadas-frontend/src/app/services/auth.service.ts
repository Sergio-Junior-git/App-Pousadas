import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { User } from '../models/user.model';
import { AuthResponse } from '../models/auth-responde.model';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api = 'http://localhost:8080/auth';

  private USER_ID_KEY = 'userId';

  constructor(private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object) {}

  public getUserId(): number | null {
    // *** 2. PROTEGER LEITURA DO LOCALSTORAGE ***
    if (!isPlatformBrowser(this.platformId)) {
        return null; 
    }
    const idString = localStorage.getItem(this.USER_ID_KEY);
    // Retorna o ID como number ou null se não existir
    return idString ? Number(idString) : null;
  }

  private setUserId(id: number): void {
    // *** 3. PROTEGER ESCRITA DO LOCALSTORAGE ***
    if (!isPlatformBrowser(this.platformId)) {
        return; 
    }
    localStorage.setItem(this.USER_ID_KEY, id.toString());
  }

  public clearUserId(): void {
    // 3. Proteger a remoção com o check de SSR
    if (!isPlatformBrowser(this.platformId)) {
        return; 
    }
    localStorage.removeItem(this.USER_ID_KEY);
  }

  login(credentials: { email: string; senha: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.api}/login`, credentials).pipe(
      tap(response => {
        // *** 4. CORREÇÃO PRINCIPAL: LER O ID DO OBJETO ANINHADO 'usuario' ***
        // O backend retorna { token, usuario: { userId, ... } }
        if (response && response.usuario && response.usuario.userId) {
          this.setUserId(response.usuario.userId);
        }
      })
    );
  }

  register(data: User): Observable<AuthResponse> {
    // Para o registro, o backend também retorna LoginResponse
    return this.http.post<AuthResponse>(`${this.api}/register`, data).pipe(
      tap(response => {
        if (response && response.usuario && response.usuario.userId) {
          this.setUserId(response.usuario.userId);
        }
      })
    );
  }
}


