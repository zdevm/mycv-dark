import { ChangeDetectorRef, Component, OnInit } from '@angular/core'
import { Job } from '@interfaces/job'
import { JobService } from '@services/job/job.service'
import { LoadingScreenService } from '@services/loading-screen/loading-screen.service'
import { finalize, Observable } from 'rxjs'
import SwiperCore, { Swiper } from 'swiper'

// SwiperCore.use();
@Component({
    selector: 'work-exp',
    templateUrl: './work-exp.component.html',
    styleUrls: ['./work-exp.component.scss'],
})
export class WorkExpComponent implements OnInit {
    jobs: Job[] = []
    swiper?: Swiper
    hasPrev = false
    hasNext = false

    constructor(
        private jobService: JobService,
        private loadingScreenService: LoadingScreenService,
        private cd: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.fetchPreviousJobs().subscribe((jobs) => {
            this.jobs = jobs
        })
    }

    onSwiper(s: Swiper) {
        this.swiper = s
        this.onSlideChange([s])
    }

    onSlideChange(e: Swiper[]) {
        const s = e[0]
        this.hasPrev = s.realIndex > 0
        this.hasNext = s.realIndex < s.slides.length - 1

        this.cd.detectChanges()
    }

    fetchPreviousJobs(): Observable<Job[]> {
        this.setLoading(true)
        return this.jobService
            .retrieve()
            .pipe(finalize(() => this.setLoading(false)))
    }

    private setLoading(status: boolean) {
        this.loadingScreenService.show(status)
    }
}
