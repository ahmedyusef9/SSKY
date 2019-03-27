import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockPackagesComponent } from './block-packages.component';

describe('BlockPackagesComponent', () => {
  let component: BlockPackagesComponent;
  let fixture: ComponentFixture<BlockPackagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockPackagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockPackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
