import { TestBed } from '@angular/core/testing';

import { FgoService } from './fgo.service';

describe('FgoService', () => {
  let service: FgoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FgoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
