import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsuarioService } from '../../../services/usuario.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-form',
  standalone: false,
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
    user: User = {
    nomeUsuario: '',
    email: '',
    telefone: '',
    senha: '',
    tipoUsuario: 'HOSPEDE'
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: User | null,
    private dialogRef: MatDialogRef<FormComponent>,
    private usuarioService: UsuarioService
  ) {
    if (data) {
      this.user = { ...data };
    }
  }

  salvar() {
    if (this.data) {
      this.usuarioService.atualizar(this.data.userId!, this.user)
        .subscribe(() => this.dialogRef.close(true));
    } else {
      this.usuarioService.criar(this.user)
        .subscribe(() => this.dialogRef.close(true));
    }
  }

}
