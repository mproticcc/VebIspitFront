import { TestBed } from '@angular/core/testing';

import { AktivnostiService } from './aktivnosti.service';

describe('AktivnostiService', () => {
  let service: AktivnostiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AktivnostiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
