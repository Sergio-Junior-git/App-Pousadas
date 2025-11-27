import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './guards/auth.guard';
import { PousadasListComponent } from './pages/pousadas/pousadas-list/pousadas-list.component';
import { RegisterComponent } from './pages/register/register.component';
import { PousadasCriarComponent } from './pages/pousadas/pousadas-criar/pousadas-criar.component';
import { PousadaEditComponent } from './pages/pousadas/pousada-edit/pousada-edit.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    canActivate: [authGuard],
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
  },
  { path: 'login', component: LoginComponent },
  { path: 'pousadas', component: PousadasListComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'pousadas/criar', component: PousadasCriarComponent },
  { path: 'pousadas/editar/:id', component: PousadaEditComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
