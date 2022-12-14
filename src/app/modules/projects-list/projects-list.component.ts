import {
    AfterViewInit,
    Component,
    HostListener,
    Inject,
    NgZone,
    OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { ErrorResponse } from '@classes/error-response';
import { Project } from '@interfaces/project';
import { ToastType } from '@interfaces/toast';
import { LoadingScreenService } from '@services/loading-screen/loading-screen.service';
import {
    ProjectService,
    ProjectServiceToken,
} from '@services/project/project.service';
import { ToastService } from '@services/toast/toast.service';
import { finalize, Observable } from 'rxjs';
import SwiperCore, { Navigation } from 'swiper';

SwiperCore.use([Navigation]);

@Component({
    selector: 'projects-list',
    templateUrl: './projects-list.component.html',
    styleUrls: ['./projects-list.component.scss'],
})
export class ProjectsListComponent implements OnInit, AfterViewInit {
    projects: Project[] = [];
    isMobile = false;
    readonly mdBreakpoint = 768;

    @HostListener('window:resize')
    onResize() {
        this.checkMobileSz();
    }

    constructor(
        @Inject(ProjectServiceToken) private projectService: ProjectService,
        private loadingScreenService: LoadingScreenService,
        private router: Router,
        private zone: NgZone,
        private toastService: ToastService
    ) {}

    ngOnInit(): void {
        this.fetchPreviousJobs().subscribe({
            next: (projects) => (this.projects = projects),
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

    ngAfterViewInit(): void {
        this.checkMobileSz();
    }

    fetchPreviousJobs(): Observable<Project[]> {
        this.setLoading(true);
        return this.projectService
            .retrieve()
            .pipe(finalize(() => this.setLoading(false)));
    }

    onDiscover(project: Project) {
        this.zone.run(() => {
            this.router.navigateByUrl(`/project/${project.id}`);
        });
    }

    private checkMobileSz() {
        this.isMobile = window.innerWidth < this.mdBreakpoint;
    }

    private setLoading(status: boolean) {
        this.loadingScreenService.show(status);
    }
}
