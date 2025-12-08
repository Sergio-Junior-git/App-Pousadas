import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';
import { Reserva, ReservaService } from '../../services/reserva/reserva.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-reservas',
  standalone: false,
  templateUrl: './reservas.component.html',
  styleUrl: './reservas.component.scss'
})
export class ReservasComponent implements OnInit{
  reservas: Reserva[] = [];
  loading = true;
  userId: number | null = null;

  constructor(
    private authService: AuthService,
    private reservaService: ReservaService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    
    if (this.userId) {
      this.carregarReservas(this.userId);
    } else {
      this.snackBar.open('Sua sessão expirou. Faça login novamente.', 'Fechar', { duration: 5000 });
      this.loading = false;
      
      // *** MODIFICAÇÃO AQUI ***
      // Redireciona para o login e passa a URL atual (/reservas) como 'returnUrl'
      this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url } }); 
    }
  }

  carregarReservas(userId: number) {
    this.reservaService.buscarReservasPorUsuario(userId).subscribe({
      next: (data) => {
        this.reservas = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar reservas:', err);
        this.snackBar.open('Não foi possível carregar suas reservas.', 'Fechar', { duration: 5000 });
        this.loading = false;
      }
    });
  }

  // Função utilitária para obter a classe de estilo
  getStatusClass(status: string): string {
    switch (status) {
      case 'CONFIRMADA': return 'bg-green-100 text-green-800';
      case 'PENDENTE': return 'bg-yellow-100 text-yellow-800';
      case 'CANCELADA': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  irParaPousadas() {
    this.router.navigate(['/pousadas']);
  }
}
