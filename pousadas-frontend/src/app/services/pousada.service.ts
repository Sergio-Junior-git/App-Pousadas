import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pousada } from '../models/pousada.model';

@Injectable({
  providedIn: 'root'
})
export class PousadaService {
  private api = 'http://localhost:8080/pousadas';

  constructor(private http: HttpClient) {}

  listar(): Observable<Pousada[]> {
    return this.http.get<Pousada[]>(this.api);
  }

  buscarPorId(id: number): Observable<Pousada> {
    return this.http.get<Pousada>(`${this.api}/${id}`);
  }

  criar(pousada: Pousada): Observable<Pousada> {
    return this.http.post<Pousada>(this.api, pousada);
  }

  atualizar(id: number, pousada: Pousada): Observable<Pousada> {
    return this.http.put<Pousada>(`${this.api}/${id}`, pousada);
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}
