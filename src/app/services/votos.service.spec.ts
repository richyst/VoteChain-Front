import { TestBed, inject } from '@angular/core/testing';

import { VotosService } from './votos.service';

describe('VotosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VotosService]
    });
  });

  it('should be created', inject([VotosService], (service: VotosService) => {
    expect(service).toBeTruthy();
  }));
});
