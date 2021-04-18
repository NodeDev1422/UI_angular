import { TestBed } from '@angular/core/testing';

import { AuthRestrictService } from './auth-restrict.service';

describe('AuthRestrictService', () => {
  let service: AuthRestrictService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthRestrictService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
