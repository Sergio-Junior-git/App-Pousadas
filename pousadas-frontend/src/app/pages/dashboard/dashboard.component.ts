import { Component, OnInit } from '@angular/core';
import { PousadaService } from '../../services/pousada.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  // Variável para capturar o valor do input de destino
  cidadeBusca: string = ''; 

  constructor(
    private pousadaService: PousadaService // Injetamos o Service
  ) { }

  ngOnInit(): void {
    // Lógica de inicialização (se houver)
  }

  // Método chamado ao clicar em "Buscar"
  iniciarBusca(): void {
    if (this.cidadeBusca.trim()) {
      // O PousadaService deve ter um método para navegar para /pousadas
      // passando o termo de busca como query parameter.
      this.pousadaService.redirectToPousadas(this.cidadeBusca);
    } else {
      // Se a busca estiver vazia, apenas navega para a lista completa.
      this.pousadaService.redirectToPousadas(''); 
    }
  }
}
