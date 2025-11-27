import { Component, Inject, PLATFORM_ID  } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../services/token.service';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email = '';
  senha = '';

  constructor(
    private auth: AuthService,
    private token: TokenService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

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
          this.token.setToken(resp.token);
          this.router.navigate(['/']);
        },
        error: () => alert('Login inválido')
      });
    }
}
