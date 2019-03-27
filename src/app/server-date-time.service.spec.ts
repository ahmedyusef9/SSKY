import { TestBed } from '@angular/core/testing';

import { ServerDateTimeService } from './server-date-time.service';

describe('ServerDateTimeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServerDateTimeService = TestBed.get(ServerDateTimeService);
    expect(service).toBeTruthy();
  });
});
