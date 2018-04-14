import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsageTypeComponent } from './usage-type.component';

describe('UsageTypeComponent', () => {
  let component: UsageTypeComponent;
  let fixture: ComponentFixture<UsageTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsageTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsageTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
