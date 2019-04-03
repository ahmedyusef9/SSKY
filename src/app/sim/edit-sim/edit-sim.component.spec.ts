import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSimComponent } from './edit-sim.component';

describe('EditSimComponent', () => {
  let component: EditSimComponent;
  let fixture: ComponentFixture<EditSimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
