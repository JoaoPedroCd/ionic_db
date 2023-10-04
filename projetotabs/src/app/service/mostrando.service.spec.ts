import { TestBed } from '@angular/core/testing';

import { MostrandoService } from './mostrando.service';

describe('MostrandoService', () => {
  let service: MostrandoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MostrandoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
