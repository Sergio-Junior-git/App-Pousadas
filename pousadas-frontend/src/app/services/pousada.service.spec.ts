import { TestBed } from '@angular/core/testing';

import { PousadaService } from './pousada.service';

describe('PousadaServiceService', () => {
  let service: PousadaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PousadaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
