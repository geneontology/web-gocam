import { TestBed, inject } from '@angular/core/testing';

import { GosparqlService } from './gosparql.service';

describe('GosparqlService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GosparqlService]
    });
  });

  it('should be created', inject([GosparqlService], (service: GosparqlService) => {
    expect(service).toBeTruthy();
  }));
});
