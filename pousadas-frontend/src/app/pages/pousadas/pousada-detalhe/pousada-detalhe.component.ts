import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PousadaService } from '../../../services/pousada.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReservaRequest, ReservaService } from '../../../services/reserva/reserva.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-pousada-detalhe',
  standalone: false,
  templateUrl: './pousada-detalhe.component.html',
  styleUrl: './pousada-detalhe.component.scss'
})
export class PousadaDetalheComponent implements OnInit {
  pousada: any = null; // Vamos tipar como any por enquanto ou use sua interface Pousada
  loading = true;

  // Formulário de datas
  range = new FormGroup({
    start: new FormControl<Date | null>(null, Validators.required),
    end: new FormControl<Date | null>(null, Validators.required),
  });

  constructor(
    private route: ActivatedRoute,
    private pousadaService: PousadaService,
    private snackBar: MatSnackBar,
    private router: Router,
    private reservaService: ReservaService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.carregarPousada(Number(id));
    }
  }

  carregarPousada(id: number) {
    this.pousadaService.buscarPorId(id).subscribe({
      next: (res) => {
        this.pousada = res;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  reservar(quartoId: number) {
    // 1. Validação das Datas
    if (this.range.invalid || !this.range.value.start || !this.range.value.end) {
        this.snackBar.open('Selecione as datas de check-in e check-out', 'Fechar', { duration: 3000 });
        return;
    }

    // 2. Obter o ID do Usuário Logado
    const userId = this.authService.getUserId(); 

    if (!userId) {
        this.snackBar.open('Você precisa estar logado para fazer uma reserva.', 'Fechar', { duration: 5000 });
        this.router.navigate(['/login']); // Redireciona para o login
        return;
    }

    // 3. Montar o Objeto de Reserva
    const reservaData: ReservaRequest = {
        // Datas no formato Date (o Angular converte para ISO String no HTTP)
        dataCheckin: this.range.value.start,
        dataCheckout: this.range.value.end,
        // Associa a Reserva ao Quarto e ao Usuário
        quarto: { quartosId: quartoId },
        usuario: { userId: userId } 
    };

    // 4. Enviar para o Backend
    this.reservaService.criarReserva(reservaData).subscribe({
        next: (res) => {
            this.snackBar.open('✅ Reserva realizada com sucesso!', 'OK', { duration: 5000 });
            // Redireciona para a página onde o usuário verá a reserva
            this.router.navigate(['/reservas/minhas']); 
        },
        error: (err) => {
            console.error('Erro ao reservar:', err);
            
            let errorMessage = 'Falha ao processar a reserva.';
            
            // Tratamento específico do CONFLICT (409) lançado pelo seu ReservaService Java
            if (err.status === 409) { 
                // Assumindo que o Spring está retornando a mensagem de erro no corpo da resposta
                errorMessage = err.error || 'Quarto indisponível nas datas selecionadas.';
            } else if (err.status === 404) {
                errorMessage = 'Usuário ou Quarto não encontrado no sistema.';
            }

            this.snackBar.open(`❌ ${errorMessage}`, 'Fechar', { duration: 7000 });
        }
    });
}
}
