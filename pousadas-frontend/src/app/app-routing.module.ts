import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './guards/auth.guard';
import { PousadasListComponent } from './pages/pousadas/pousadas-list/pousadas-list.component';
import { RegisterComponent } from './pages/register/register.component';
import { PousadasCriarComponent } from './pages/pousadas/pousadas-criar/pousadas-criar.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PousadaDetalheComponent } from './pages/pousadas/pousada-detalhe/pousada-detalhe.component';
import { ReservasComponent } from './pages/reservas/reservas.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'home',
    canActivate: [authGuard],
    component: HomeComponent,    
    // ⬇️ ESTE É O BLOCO CHAVE: ROTAS FILHAS ⬇️
    children: [
      // A rota vazia (path: '') será o Dashboard quando você acessar /home
      {path: '', component: DashboardComponent},
      // ROTAS QUE ESTARÃO DENTRO DO LAYOUT (HomeComponent)
      { path: 'pousadas', component: PousadasListComponent },
      { path: 'pousadas/criar', component: PousadasCriarComponent },    
      { path: 'pousadas/:id', component: PousadaDetalheComponent }, 
      { path: 'reservas/minhas', component: ReservasComponent }, 
      // Você precisará criar as rotas para 'quartos' e 'reservas' (ex: { path: 'quartos', component: QuartosListComponent })
    ]
  },
  { path: '**', redirectTo: '/home' }



  
  // Rotas focadas no Hóspede (Busca, Detalhe, Checkout)
  // { path: 'busca', component: BuscaPousadasComponent },
  // { path: 'pousada/:id', component: PousadaDetalheComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
