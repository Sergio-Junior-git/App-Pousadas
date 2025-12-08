import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../services/token.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  
  usuarioLogado = false;

  constructor(
    private tokenService: TokenService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Checa token ao iniciar
    this.usuarioLogado = !!this.tokenService.getToken();

    // Ou subscribe para updates de login/logout
    this.tokenService.loggedIn$.subscribe(logged => {
      this.usuarioLogado = logged;
    });
  }

  logout() {
    this.tokenService.clear(); // Limpa JWT e atualiza o estado de logado
    this.authService.clearUserId(); // <--- CHAMA O NOVO MÉTODO
    
    // 1. Tenta redirecionar para o login
    this.router.navigate(['/login']).then(() => {
        // 2. Se a navegação para o login não for suficiente (o que causa a tela branca), 
        // força o recarregamento. Isso garante que o Guard/Router avalie o novo estado 'deslogado'
        // corretamente e resolva qualquer problema de cache de rotas.
        window.location.reload(); 
    });
  }
  
} 
