import { Component, Inject, OnInit } from '@angular/core';
import { Profile } from '@interfaces/profile';
import { LoadingScreenService } from '@services/loading-screen/loading-screen.service';
import {
    ProfileService,
    ProfileServiceToken,
} from '@services/profile/profile.service';
import { finalize } from 'rxjs';

@Component({
    selector: 'contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
    profile?: Profile;

    constructor(
        @Inject(ProfileServiceToken) private profileService: ProfileService,
        private loadingScreenService: LoadingScreenService
    ) {}

    ngOnInit(): void {
        this.fetchProfile().subscribe((profile) => (this.profile = profile));
    }

    fetchProfile() {
        this.setLoading(true);
        return this.profileService
            .get()
            .pipe(finalize(() => this.setLoading(false)));
    }

    private setLoading(status: boolean) {
        this.loadingScreenService.show(status);
    }
}
