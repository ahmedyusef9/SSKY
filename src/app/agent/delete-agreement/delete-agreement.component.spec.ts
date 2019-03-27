import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAgreementComponent } from './delete-agreement.component';

describe('DeleteAgreementComponent', () => {
  let component: DeleteAgreementComponent;
  let fixture: ComponentFixture<DeleteAgreementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteAgreementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteAgreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
