import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryExamplesComponent } from './query-examples.component';

describe('QueryExamplesComponent', () => {
  let component: QueryExamplesComponent;
  let fixture: ComponentFixture<QueryExamplesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryExamplesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryExamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
