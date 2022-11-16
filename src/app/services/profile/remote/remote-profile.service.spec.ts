import { TestBed } from '@angular/core/testing';

import { RemoteProfileService } from './remote-profile.service';

describe('RemoteProfileService', () => {
    let service: RemoteProfileService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(RemoteProfileService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
