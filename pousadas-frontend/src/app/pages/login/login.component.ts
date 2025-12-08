import { Component, Inject, OnInit, PLATFORM_ID  } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../services/token.service';
import { ActivatedRoute, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  email = '';
  senha = '';
  private returnUrl: string = '/';

  constructor(
    private auth: AuthService,
    private token: TokenService,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
  }
  

  ngOnInit(): void {
      // Mova a lógica de subscribe para o ngOnInit
      this.route.queryParams.subscribe(params => {
        this.returnUrl = params['returnUrl'] || '/';
      });
  }

  login() {
    this.token.clear();
  
      if (!isPlatformBrowser(this.platformId)) return;

      console.log('Payload de login:', {
      email: this.email,
      senha: this.senha
      });

      this.auth.login({
        email: this.email,
        senha: this.senha
      }).subscribe({
        next: (resp) => {
          if (resp.token) { // Verifica se resp.token não é undefined/null/string vazia
            this.token.setToken(resp.token);
          }
          this.router.navigate([this.returnUrl]);        },
        error: () => alert('Login inválido')
      });
    }

    regitrar() {
      this.router.navigate(['/register']);
    }
}
