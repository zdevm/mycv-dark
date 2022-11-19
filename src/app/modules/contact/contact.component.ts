import { Component, Inject, OnInit } from '@angular/core';
import { ErrorResponse } from '@classes/error-response';
import { Profile } from '@interfaces/profile';
import { ToastType } from '@interfaces/toast';
import { LoadingScreenService } from '@services/loading-screen/loading-screen.service';
import {
    ProfileService,
    ProfileServiceToken,
} from '@services/profile/profile.service';
import { ToastService } from '@services/toast/toast.service';
import { finalize } from 'rxjs';

@Component({
    selector: 'contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
    profile?: Profile;

    constructor(
        @Inject(ProfileServiceToken)
        private readonly profileService: ProfileService,
        private readonly loadingScreenService: LoadingScreenService,
        private readonly toastService: ToastService
    ) {}

    ngOnInit(): void {
        this.fetchProfile().subscribe({
            next: (profile) => (this.profile = profile),
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
