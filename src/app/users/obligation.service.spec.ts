import { TestBed } from '@angular/core/testing';

import { ObligationService } from './obligation.service';

describe('ObligationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ObligationService = TestBed.get(ObligationService);
    expect(service).toBeTruthy();
  });
});
