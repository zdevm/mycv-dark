import {
    AfterViewInit,
    Component,
    HostListener,
    Inject,
    NgZone,
    OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { Project } from '@interfaces/project';
import { LoadingScreenService } from '@services/loading-screen/loading-screen.service';
import {
    ProjectService,
    ProjectServiceToken,
} from '@services/project/project.service';
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
        private zone: NgZone
    ) {}

    ngOnInit(): void {
        this.fetchPreviousJobs().subscribe(
            (projects) => (this.projects = projects)
        );
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
