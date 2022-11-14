import { TestBed } from '@angular/core/testing';

import { RemoteProjectService } from './remote-project.service';

describe('RemoteProjectService', () => {
    let service: RemoteProjectService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(RemoteProjectService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
