import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevDocumentationComponent } from './dev-documentation.component';

describe('DevDocumentationComponent', () => {
  let component: DevDocumentationComponent;
  let fixture: ComponentFixture<DevDocumentationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevDocumentationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevDocumentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
