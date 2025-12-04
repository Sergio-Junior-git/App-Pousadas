import { Component } from '@angular/core';
import { Pousada } from '../../../models/pousada.model';
import { PousadaService } from '../../../services/pousada.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pousadas-list',
  standalone: false,
  templateUrl: './pousadas-list.component.html',
  styleUrl: './pousadas-list.component.scss'
})
export class PousadasListComponent {

  pousadasEncontradas: Pousada[] = [];
  cidadeBusca: string = '';
  // Outros filtros: datas, capacidade, etc.

  constructor(
    private route: ActivatedRoute,
    private pousadaService: PousadaService, // Este service deve fazer a requisição HTTP
    private router: Router
  ) { }

  ngOnInit(): void {
    // 1. Monitora mudanças nos parâmetros de busca (query params)
    this.route.queryParams.subscribe(params => {
      this.cidadeBusca = params['cidade'] || ''; // Pega o parâmetro 'cidade' da URL
      // Se houver dados de busca, chama o método
      this.buscarPousadas(); 
    });
  }

  // 2. Método principal de busca
  buscarPousadas(): void {
    // Cria um objeto de filtros
    const filtros = {
      cidade: this.cidadeBusca
      // Adicione outros filtros aqui (checkin, checkout, etc.)
    };

    // Chama o serviço HTTP (o GET modificado no seu Java)
    this.pousadaService.listar(filtros).subscribe({
      next: (data: Pousada[]) => {
        this.pousadasEncontradas = data;
      },
      error: (err: any) => {
        console.error('Erro ao buscar pousadas:', err);
        this.pousadasEncontradas = []; // Limpa em caso de erro
        // Tratar erro (exibir mensagem ao usuário)
      }
    });
  }

  // 3. Método para ser chamado pelo formulário de filtro na barra lateral
  aplicarNovaBusca(): void {
    // 1. Redireciona para a rota com o novo parâmetro de consulta.
    // Isso irá re-executar o this.route.queryParams.subscribe() no ngOnInit
    // e chamar this.buscarPousadas().
    this.router.navigate(
      [], // Navegar para a rota atual
      { 
        relativeTo: this.route, 
        queryParams: { cidade: this.cidadeBusca }, 
        queryParamsHandling: 'merge' // Mantém outros queryParams, se houver
      }
    );
    
    // OU, se você não quiser usar a rota para o filtro:
    // this.buscarPousadas();
  }

}