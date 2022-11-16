import { TestBed } from '@angular/core/testing';

import { IntegratedProfileService } from './integrated-profile.service';

describe('IntegratedProfileService', () => {
    let service: IntegratedProfileService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(IntegratedProfileService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
