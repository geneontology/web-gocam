import { TestBed, inject } from '@angular/core/testing';

import { SparqlrService } from './sparqlr.service';

describe('SparqlrService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SparqlrService]
    });
  });

  it('should be created', inject([SparqlrService], (service: SparqlrService) => {
    expect(service).toBeTruthy();
  }));
});
