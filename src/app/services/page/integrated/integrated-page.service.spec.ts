import { TestBed } from '@angular/core/testing';

import { IntegratedPageService } from './integrated-page.service';

describe('IntegratedPageService', () => {
  let service: IntegratedPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IntegratedPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
