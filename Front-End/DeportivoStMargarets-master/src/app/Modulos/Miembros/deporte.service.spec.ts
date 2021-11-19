import { TestBed } from '@angular/core/testing';

import { DeporteService } from './deporte.service';

describe('DeporteService', () => {
  let service: DeporteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeporteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
