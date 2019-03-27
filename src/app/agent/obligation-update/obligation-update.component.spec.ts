import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObligationUpdateComponent } from './obligation-update.component';

describe('ObligationUpdateComponent', () => {
  let component: ObligationUpdateComponent;
  let fixture: ComponentFixture<ObligationUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObligationUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObligationUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
