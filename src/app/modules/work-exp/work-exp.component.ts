import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { ErrorResponse } from '@classes/error-response';
import { Job } from '@interfaces/job';
import { ToastType } from '@interfaces/toast';
import { JobService, JobServiceToken } from '@services/job/job.service';
import { LoadingScreenService } from '@services/loading-screen/loading-screen.service';
import { ToastService } from '@services/toast/toast.service';
import { finalize, Observable } from 'rxjs';
import SwiperCore, { Swiper } from 'swiper';

// SwiperCore.use();
@Component({
    selector: 'work-exp',
    templateUrl: './work-exp.component.html',
    styleUrls: ['./work-exp.component.scss'],
})
export class WorkExpComponent implements OnInit {
    jobs: Job[] = [];
    swiper?: Swiper;
    hasPrev = false;
    hasNext = false;

    constructor(
        @Inject(JobServiceToken) private readonly jobService: JobService,
        private readonly loadingScreenService: LoadingScreenService,
        private readonly cd: ChangeDetectorRef,
        private readonly toastService: ToastService
    ) {}

    ngOnInit(): void {
        this.fetchPreviousJobs().subscribe({
            next: (jobs) => {
                this.jobs = jobs;
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

    onSwiper(s: Swiper) {
        this.swiper = s;
        this.onSlideChange([s]);
    }

    onSlideChange(e: Swiper[]) {
        const s = e[0];
        this.hasPrev = s.realIndex > 0;
        this.hasNext = s.realIndex < s.slides.length - 1;

        this.cd.detectChanges();
    }

    fetchPreviousJobs(): Observable<Job[]> {
        this.setLoading(true);
        return this.jobService
            .retrieve()
            .pipe(finalize(() => this.setLoading(false)));
    }

    private setLoading(status: boolean) {
        this.loadingScreenService.show(status);
    }
}
