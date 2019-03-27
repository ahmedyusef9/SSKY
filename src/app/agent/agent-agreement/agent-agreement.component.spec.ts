import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentAgreementComponent } from './agent-agreement.component';

describe('AgentAgreementComponent', () => {
  let component: AgentAgreementComponent;
  let fixture: ComponentFixture<AgentAgreementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentAgreementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentAgreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
