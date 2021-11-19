import { TestBed } from '@angular/core/testing';

import { TipoReunionService } from './tipo-reunion.service';

describe('TipoReunionService', () => {
  let service: TipoReunionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoReunionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
