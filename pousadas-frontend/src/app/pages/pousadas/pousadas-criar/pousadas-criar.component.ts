import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PousadaService } from '../../../services/pousada.service';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';


@Component({
  selector: 'app-pousadas-criar',
  standalone: false,
  templateUrl: './pousadas-criar.component.html',
  styleUrl: './pousadas-criar.component.scss'
})
export class PousadasCriarComponent {

  form!: FormGroup;


  constructor(
    private fb: FormBuilder,
    private service: PousadaService,
    private router: Router
  ) {
    this.form = this.fb.group({
    nome: ['', Validators.required],
    descricao: [''],
    endereco: ['', Validators.required],
    telefone: ['', Validators.required],
    cidade: ['', Validators.required],
    estado: ['', Validators.required]
  });
  }

  salvar() {
   const usuario_id = this.getUserIdFromToken();
    if (!usuario_id) {
      alert('Usuário não logado');
      return;
    }

    const payload = {
      ...this.form.value,
      usuario: { id: usuario_id } // envia o ID do usuário logado
    };

    this.service.criar(payload)
      .subscribe(() => this.router.navigate(['/pousadas']));
  }

  private getUserIdFromToken(): number | null {
    const token = localStorage.getItem('jwt_token');
    if (!token) return null;

    try {
      const decoded: any = jwtDecode(token);
      console.log('Payload do JWT:', decoded);
      return decoded.id; // verifique o campo correto do JWT
    } catch (error) {
      console.error('Erro ao decodificar JWT', error);
      return null;
    }
  }
}
