import { TestBed } from '@angular/core/testing'

import { TopNavService } from './top-nav.service'

describe('TopNavService', () => {
    let service: TopNavService

    beforeEach(() => {
        TestBed.configureTestingModule({})
        service = TestBed.inject(TopNavService)
    })

    it('should be created', () => {
        expect(service).toBeTruthy()
    })
})
