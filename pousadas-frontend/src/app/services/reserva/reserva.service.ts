import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Interface para a requisição de reserva
export interface ReservaRequest {
  dataCheckin: Date | null | undefined;
  dataCheckout: Date | null | undefined;
  quarto: { quartosId: number };
  usuario: { userId: number }; 
}

// Interface para a resposta do backend ao listar
export interface Reserva {
    reservaId: number;
    dataCheckin: string; // Virá como string ISO
    dataCheckout: string;
    status: string; // Ex: 'CONFIRMADA', 'PENDENTE', 'CANCELADA'
    quarto: {
        quartosId: number;
        numero: string;
        pousada: {
            pousadaId: number;
            nome: string;
            cidade: string;
        }
    }; 
    usuario: { userId: number };
}

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  private apiUrl = 'http://localhost:8080/reservas'

  constructor(private http: HttpClient) { }

  criarReserva(reservaData: ReservaRequest): Observable<any> {
    // O Angular envia o Date como String (ISO format), que o Spring Boot consegue converter para LocalDate.
    return this.http.post(this.apiUrl, reservaData);
  }

  // NOVO MÉTODO: Busca reservas por ID do usuário (backend: /reservas/usuario/{userId})
  buscarReservasPorUsuario(userId: number): Observable<Reserva[]> {
      return this.http.get<Reserva[]>(`${this.apiUrl}/usuario/${userId}`);
  }
}