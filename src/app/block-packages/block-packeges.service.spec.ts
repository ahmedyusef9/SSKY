import { TestBed } from '@angular/core/testing';

import { BlockPackegesService } from './block-packeges.service';

describe('BlockPackegesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BlockPackegesService = TestBed.get(BlockPackegesService);
    expect(service).toBeTruthy();
  });
});
