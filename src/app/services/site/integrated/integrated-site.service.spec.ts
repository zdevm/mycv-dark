import { TestBed } from '@angular/core/testing';

import { IntegratedSiteService } from './integrated-site.service';

describe('IntegratedSiteService', () => {
  let service: IntegratedSiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IntegratedSiteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
