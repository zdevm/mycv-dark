import { Component, Inject, OnInit } from '@angular/core';
import { LoadingScreenService } from '@services/loading-screen/loading-screen.service';
import { finalize } from 'rxjs';
import {
    ProfileService,
    ProfileServiceToken,
} from '@services/profile/profile.service';
import { ErrorResponse } from '@classes/error-response';
import { ToastType } from '@interfaces/toast';
import { ToastService } from '@services/toast/toast.service';

@Component({
    selector: 'about-me',
    templateUrl: './about-me.component.html',
    styleUrls: ['./about-me.component.scss'],
})
export class AboutMeComponent implements OnInit {
    firstName?: string;
    lastName?: string;
    occupation?: string;
    about?: string;
    image?: string;

    constructor(
        @Inject(ProfileServiceToken)
        private readonly profileService: ProfileService,
        private readonly loadingScreenService: LoadingScreenService,
        private readonly toastService: ToastService
    ) {}

    ngOnInit(): void {
        this.fetchProfile().subscribe({
            next: (profile) => {
                this.firstName = profile.firstName;
                this.lastName = profile.lastName;
                this.occupation = profile.occupation;
                this.about = profile.about;
                this.image = profile.image;
            },
            error: (err: ErrorResponse) => {
                this.toastService.show({
                    type: ToastType.Text,
                    body: err.message,
                    customClass: 'bg-danger',
                    autoHide: true,
                });
            },
        });
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
