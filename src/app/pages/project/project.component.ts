import { Component, Inject, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from '@interfaces/project';
import { LoadingScreenService } from '@services/loading-screen/loading-screen.service';
import {
    ProjectServiceToken,
    ProjectService,
} from '@services/project/project.service';
import { finalize, Observable, Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-project',
    templateUrl: './project.component.html',
    styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnDestroy {
    projectId?: string;
    project?: Project;
    private unsub$ = new Subject<void>();

    constructor(
        private readonly route: ActivatedRoute,
        private readonly loadingScreenService: LoadingScreenService,
        @Inject(ProjectServiceToken)
        private readonly projectService: ProjectService
    ) {
        this.listenParams();
    }

    ngOnDestroy(): void {
        this.unsub$.next();
        this.unsub$.complete();
    }

    fetchProject(id: string): Observable<Project> {
        this.setLoading(true);
        return this.projectService
            .getById(id)
            .pipe(finalize(() => this.setLoading(false)));
    }

    private setLoading(status: boolean) {
        this.loadingScreenService.show(status);
    }

    private listenParams() {
        this.route.params.pipe(takeUntil(this.unsub$)).subscribe((params) => {
            const id = params['id'];
            if (id && this.projectId !== id) {
                this.projectId = id;
                this.fetchProject(id).subscribe(
                    (project) => (this.project = project)
                );
            }
        });
    }
}
