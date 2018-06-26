import { TestBed, inject } from '@angular/core/testing';

import { PubmedRestService } from './pubmed-rest.service';

describe('PubmedRestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PubmedRestService]
    });
  });

  it('should be created', inject([PubmedRestService], (service: PubmedRestService) => {
    expect(service).toBeTruthy();
  }));
});
