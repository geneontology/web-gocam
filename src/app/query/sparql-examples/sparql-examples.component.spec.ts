import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SparqlExamplesComponent } from './sparql-examples.component';

describe('SparqlExamplesComponent', () => {
  let component: SparqlExamplesComponent;
  let fixture: ComponentFixture<SparqlExamplesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SparqlExamplesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SparqlExamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
