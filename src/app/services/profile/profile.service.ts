import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject, tap } from 'rxjs';
import { Profile } from 'src/app/interfaces/profile';
import { HttpService } from '../http/http.service';

@Injectable({
    providedIn: 'root',
})
export class ProfileService extends HttpService {
    private cachedProfile$?: ReplaySubject<Profile>;

    constructor() {
        super('profile');
    }

    get() {
        if (this.cachedProfile$) {
            return this.cachedProfile$.asObservable();
        }
        this.cachedProfile$ = new ReplaySubject<Profile>();
        return this.http.get<Profile>(this.url).pipe(
            tap((profile) => {
                this.cachedProfile$!.next(profile);
                this.cachedProfile$!.complete();
            })
        );
    }
}
