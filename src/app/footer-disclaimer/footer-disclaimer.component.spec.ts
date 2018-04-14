import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterDisclaimerComponent } from './footer-disclaimer.component';

describe('FooterDisclaimerComponent', () => {
  let component: FooterDisclaimerComponent;
  let fixture: ComponentFixture<FooterDisclaimerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterDisclaimerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterDisclaimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
