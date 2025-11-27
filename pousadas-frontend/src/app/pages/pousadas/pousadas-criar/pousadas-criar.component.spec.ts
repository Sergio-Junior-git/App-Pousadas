import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PousadasCriarComponent } from './pousadas-criar.component';

describe('PousadasCriarComponent', () => {
  let component: PousadasCriarComponent;
  let fixture: ComponentFixture<PousadasCriarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PousadasCriarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PousadasCriarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
