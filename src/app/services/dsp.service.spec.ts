import { TestBed } from '@angular/core/testing';

import { DspService } from './dsp.service';

describe('DspService', () => {
  let service: DspService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DspService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
