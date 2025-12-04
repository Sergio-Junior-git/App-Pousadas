import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PousadaDetalheComponent } from './pousada-detalhe.component';

describe('PousadaDetalheComponent', () => {
  let component: PousadaDetalheComponent;
  let fixture: ComponentFixture<PousadaDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PousadaDetalheComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PousadaDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
