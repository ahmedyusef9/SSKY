import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentNotesComponent } from './agent-notes.component';

describe('AgentNotesComponent', () => {
  let component: AgentNotesComponent;
  let fixture: ComponentFixture<AgentNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentNotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
