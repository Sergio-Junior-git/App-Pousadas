import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PousadasListComponent } from './pousadas-list.component';

describe('PousadasListComponent', () => {
  let component: PousadasListComponent;
  let fixture: ComponentFixture<PousadasListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PousadasListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PousadasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
