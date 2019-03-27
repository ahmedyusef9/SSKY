import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentMembersComponent } from './agent-members.component';

describe('AgentMembersComponent', () => {
  let component: AgentMembersComponent;
  let fixture: ComponentFixture<AgentMembersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentMembersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
