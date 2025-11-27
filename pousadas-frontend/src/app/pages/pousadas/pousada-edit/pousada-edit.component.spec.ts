import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PousadaEditComponent } from './pousada-edit.component';

describe('PousadaEditComponent', () => {
  let component: PousadaEditComponent;
  let fixture: ComponentFixture<PousadaEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PousadaEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PousadaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
