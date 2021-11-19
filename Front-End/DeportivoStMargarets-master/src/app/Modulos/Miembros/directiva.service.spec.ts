import { TestBed } from '@angular/core/testing';

import { DirectivaService } from './directiva.service';

describe('DirectivaService', () => {
  let service: DirectivaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DirectivaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
