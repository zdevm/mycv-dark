import { TestBed } from '@angular/core/testing';

import { RemotePageService } from './remote-page.service';

describe('RemotePageService', () => {
    let service: RemotePageService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(RemotePageService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
