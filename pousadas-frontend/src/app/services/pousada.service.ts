import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pousada } from '../models/pousada.model';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class PousadaService {
  private api = 'http://localhost:8080/pousadas';

  constructor(private http: HttpClient, private router: Router) {}

  listar(filtros?: { cidade?: string }): Observable<Pousada[]> {
        let params = new HttpParams();

        // Adiciona o parâmetro 'cidade' se ele existir no objeto de filtros
        if (filtros && filtros.cidade) {
            params = params.set('cidade', filtros.cidade);
        }

        // O request GET agora envia os parâmetros
        return this.http.get<Pousada[]>(this.api, { params: params });
  }

  // NOVO MÉTODO: Redireciona e força a recarga da lista
  redirectToPousadas(cidade: string) {
    this.router.navigate(['/home/pousadas'], { queryParams: { cidade: cidade } });
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
