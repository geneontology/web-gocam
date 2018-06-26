import { TestBed, inject } from '@angular/core/testing';

import { PubmedrestService } from './pubmedrest.service';

describe('PubmedrestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PubmedrestService]
    });
  });

  it('should be created', inject([PubmedrestService], (service: PubmedrestService) => {
    expect(service).toBeTruthy();
  }));
});
