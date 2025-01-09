import { TestBed } from '@angular/core/testing';

import { PhoneBookServiceService } from './phone-book-service.service';

describe('PhoneBookServiceService', () => {
  let service: PhoneBookServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhoneBookServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
