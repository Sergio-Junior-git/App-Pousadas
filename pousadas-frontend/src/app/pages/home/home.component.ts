import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../services/token.service';
import { Router } from '@angular/router';

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
    private router: Router
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
    this.tokenService.clear();
    this.router.navigate(['/login']);
  }
  
} 
