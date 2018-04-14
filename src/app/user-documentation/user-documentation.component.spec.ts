import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDocumentationComponent } from './user-documentation.component';

describe('UserDocumentationComponent', () => {
  let component: UserDocumentationComponent;
  let fixture: ComponentFixture<UserDocumentationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDocumentationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDocumentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
