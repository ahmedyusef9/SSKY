import { TestBed } from '@angular/core/testing';

import { AgentOrderService } from './agent-order.service';

describe('AgentOrderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AgentOrderService = TestBed.get(AgentOrderService);
    expect(service).toBeTruthy();
  });
});
