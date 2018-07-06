import { TestBed, inject } from '@angular/core/testing';

import { PimaticService } from './pimatic.service';

describe('NgPimaticService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PimaticService]
    });
  });

  it('should be created', inject([PimaticService], (service: PimaticService) => {
    expect(service).toBeTruthy();
  }));
});
