import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private api = 'http://localhost:8080/usuarios';

  constructor(private http: HttpClient) {}

  listar(): Observable<User[]> {
    return this.http.get<User[]>(this.api);
  }

  buscar(id: number): Observable<User> {
    return this.http.get<User>(`${this.api}/${id}`);
  }

  criar(user: User): Observable<User> {
    return this.http.post<User>(this.api, user);
  }

  atualizar(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.api}/${id}`, user);
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
  
}
