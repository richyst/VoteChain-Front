import { TestBed, inject } from '@angular/core/testing';

import { ProcesandoService } from './procesando.service';

describe('ProcesandoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProcesandoService]
    });
  });

  it('should be created', inject([ProcesandoService], (service: ProcesandoService) => {
    expect(service).toBeTruthy();
  }));
});
