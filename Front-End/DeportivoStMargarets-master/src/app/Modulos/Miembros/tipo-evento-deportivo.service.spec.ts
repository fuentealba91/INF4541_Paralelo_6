import { TestBed } from '@angular/core/testing';

import { TipoEventoDeportivoService } from './tipo-evento-deportivo.service';

describe('TipoEventoDeportivoService', () => {
  let service: TipoEventoDeportivoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoEventoDeportivoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
