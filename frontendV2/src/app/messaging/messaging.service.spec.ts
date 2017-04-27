import { TestBed, inject } from '@angular/core/testing';

import { MessagingService } from './messaging.service';

describe('MessagingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessagingService]
    });
  });

  it('should ...', inject([MessagingService], (service: MessagingService) => {
    expect(service).toBeTruthy();
  }));
});
