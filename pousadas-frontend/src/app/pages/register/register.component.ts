import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../services/token.service';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
    user: User = {
      nomeUsuario: '',
      email: '',
      telefone: '',
      senha: '',
      tipoUsuario: 'HOSPEDE'
    };

    constructor(
    private auth: AuthService,
    private token: TokenService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  register() {
    this.token.clear();
    if (!isPlatformBrowser(this.platformId)) return;

    this.auth.register(this.user).subscribe({
      next: (resp) => {
        if (resp.token) {
          this.token.setToken(resp.token);
        } // backend já retorna token
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error(err);
        alert("Erro ao registrar");
      }
    });
  }
}
