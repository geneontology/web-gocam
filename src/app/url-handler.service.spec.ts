import { TestBed, inject } from '@angular/core/testing';

import { UrlHandlerService } from './url-handler.service';

describe('UrlHandlerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UrlHandlerService]
    });
  });

  it('should be created', inject([UrlHandlerService], (service: UrlHandlerService) => {
    expect(service).toBeTruthy();
  }));
});
