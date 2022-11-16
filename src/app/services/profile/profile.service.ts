import { InjectionToken } from '@angular/core';
import { Profile } from '@interfaces/profile';
import { Observable } from 'rxjs';

export const ProfileServiceToken = new InjectionToken<ProfileService>(
    'Profile Service'
);
export interface ProfileService {
    get(): Observable<Profile>;
}
