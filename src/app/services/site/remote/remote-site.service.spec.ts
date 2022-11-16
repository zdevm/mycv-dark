import { TestBed } from '@angular/core/testing';

import { RemoteSiteService } from './remote-site.service';

describe('RemoteSiteService', () => {
    let service: RemoteSiteService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(RemoteSiteService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
