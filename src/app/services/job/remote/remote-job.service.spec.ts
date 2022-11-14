import { TestBed } from '@angular/core/testing';

import { RemoteJobService } from './remote-job.service';

describe('RemoteJobService', () => {
    let service: RemoteJobService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(RemoteJobService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
