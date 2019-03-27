import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentObligationComponent } from './agent-obligation.component';

describe('AgentObligationComponent', () => {
  let component: AgentObligationComponent;
  let fixture: ComponentFixture<AgentObligationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentObligationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentObligationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
