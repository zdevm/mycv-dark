import { TestBed } from '@angular/core/testing';

import { IntegratedJobService } from './integrated-job.service';

describe('IntegratedJobService', () => {
  let service: IntegratedJobService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IntegratedJobService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
