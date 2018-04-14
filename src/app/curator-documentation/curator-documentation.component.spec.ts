import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuratorDocumentationComponent } from './curator-documentation.component';

describe('CuratorDocumentationComponent', () => {
  let component: CuratorDocumentationComponent;
  let fixture: ComponentFixture<CuratorDocumentationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuratorDocumentationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuratorDocumentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
