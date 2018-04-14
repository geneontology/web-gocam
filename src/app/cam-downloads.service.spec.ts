import { TestBed, inject } from '@angular/core/testing';

import { CamDownloadsService } from './cam-downloads.service';

describe('CamDownloadsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CamDownloadsService]
    });
  });

  it('should be created', inject([CamDownloadsService], (service: CamDownloadsService) => {
    expect(service).toBeTruthy();
  }));
});
