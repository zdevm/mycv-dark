import { Injectable } from '@angular/core';
import { ErrorResponse } from '@classes/error-response';
import { profile } from '@integrated/db';
import { Profile } from '@interfaces/profile';
import { ProfileService } from '@services/profile/profile.service';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
    providedIn: null,
})
export class IntegratedProfileService implements ProfileService {
    constructor() {}

    get(): Observable<Profile> {
        return profile
            ? of(profile)
            : throwError(() => new ErrorResponse(['Failed to find profile']));
    }
}
