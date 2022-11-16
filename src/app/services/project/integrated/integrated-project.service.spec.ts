import { TestBed } from '@angular/core/testing';

import { IntegratedProjectService } from './integrated-project.service';

describe('IntegratedProjectService', () => {
  let service: IntegratedProjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IntegratedProjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
