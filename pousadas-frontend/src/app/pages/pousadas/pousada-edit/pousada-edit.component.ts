import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PousadaService } from '../../../services/pousada.service';

@Component({
  selector: 'app-pousada-edit',
  standalone: false,
  templateUrl: './pousada-edit.component.html',
  styleUrl: './pousada-edit.component.scss'
})
export class PousadaEditComponent {

}
