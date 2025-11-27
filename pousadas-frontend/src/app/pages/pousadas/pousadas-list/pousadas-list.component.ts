import { Component } from '@angular/core';
import { Pousada } from '../../../models/pousada.model';
import { PousadaService } from '../../../services/pousada.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pousadas-list',
  standalone: false,
  templateUrl: './pousadas-list.component.html',
  styleUrl: './pousadas-list.component.scss'
})
export class PousadasListComponent {
  displayedColumns = ['id', 'nome', 'endereco', 'cidade', 'telefone', 'acoes'];
  pousadas: Pousada[] = [];

  constructor(
    private pousadaService: PousadaService,
    private router: Router  
) {}

  ngOnInit(): void {
    this.carregarPousadas();
  }

  carregarPousadas() {
    this.pousadaService.listar().subscribe(data => {
      this.pousadas = data;
    });
  }

  criar() {
    this.router.navigate(['/pousadas/criar']);
  }

    editar(id: number) {
    this.router.navigate(['/pousadas/editar', id]);
  }

  deletar(id: number) {
    this.pousadaService.deletar(id).subscribe(() => {
      this.carregarPousadas();
    });
  }
}
