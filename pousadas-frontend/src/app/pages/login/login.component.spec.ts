import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs'; // Para simular o Observable
import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../services/token.service';

// Crie mocks (simulações) para os serviços
const mockAuthService = {
  login: () => of({ token: 'mock-token' })
};

const mockTokenService = {
  clear: jasmine.createSpy('clear'),
  setToken: jasmine.createSpy('setToken')
};

const mockRouter = {
  navigate: jasmine.createSpy('navigate')
};

// Crie um mock para ActivatedRoute que contenha queryParams com o método subscribe
const mockActivatedRoute = {
  queryParams: of({ returnUrl: '/reservas' }) // Simula que returnUrl existe
};


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Importe os módulos necessários para o template (mat-card, mat-input, ngModel)
      imports: [
        FormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        NoopAnimationsModule // Para evitar erros de animação nos testes
      ],
      declarations: [LoginComponent],
      // Forneça os mocks para os serviços que o componente injeta
      providers: [
        // O Angular injetará estas simulações em vez dos serviços reais
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter },
        { provide: 'PLATFORM_ID', useValue: 'browser' }, // Simula o PLATFORM_ID
        { provide: AuthService, useValue: mockAuthService },
        { provide: TokenService, useValue: mockTokenService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Você pode adicionar mais testes aqui para cobrir a lógica de login e redirecionamento
});