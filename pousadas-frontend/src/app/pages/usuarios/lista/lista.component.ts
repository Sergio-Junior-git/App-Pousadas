import { Component, OnInit  } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { MatDialog } from '@angular/material/dialog';
import { FormComponent } from '../form/form.component';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-lista',
  standalone: false,
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.scss'
})
export class ListaComponent {
  usuarios: User[] = [];
  colunas = ['nomeUsuario', 'email', 'telefone', 'tipoUsuario', 'acoes'];

  constructor(
    private usuarioService: UsuarioService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.carregar();
  }

  carregar() {
    this.usuarioService.listar().subscribe(data => this.usuarios = data);
  }

  novo() {
    const ref = this.dialog.open(FormComponent, { width: '450px' });

    ref.afterClosed().subscribe(result => {
      if (result) this.carregar();
    });
  }

  editar(usuario: User) {
    const ref = this.dialog.open(FormComponent, {
      width: '450px',
      data: usuario
    });

    ref.afterClosed().subscribe(result => {
      if (result) this.carregar();
    });
  }

  remover(usuario: User) {
    if (confirm(`Deseja excluir o usuário ${usuario.nomeUsuario}?`)) {
      this.usuarioService.deletar(usuario.userId!).subscribe(() => this.carregar());
    }
  }
}
