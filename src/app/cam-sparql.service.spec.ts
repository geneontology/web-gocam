import { TestBed, inject } from '@angular/core/testing';

import { CamSparqlService } from './cam-sparql.service';

describe('CamSparqlService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CamSparqlService]
    });
  });

  it('should be created', inject([CamSparqlService], (service: CamSparqlService) => {
    expect(service).toBeTruthy();
  }));
});
