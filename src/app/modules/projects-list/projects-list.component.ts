import { Component, OnInit } from '@angular/core';
import { Project } from '@interfaces/project';
import { LoadingScreenService } from '@services/loading-screen/loading-screen.service';
import { ProjectService } from '@services/project/project.service';
import { finalize, Observable } from 'rxjs';

@Component({
  selector: 'projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss']
})
export class ProjectsListComponent implements OnInit {
  projects: Project[] = [];

  constructor(private projectService: ProjectService,
              private loadingScreenService: LoadingScreenService) { }

  ngOnInit(): void {
    this.fetchPreviousJobs().subscribe(projects => this.projects = projects);
  }

  fetchPreviousJobs(): Observable<Project[]> {
    this.setLoading(true);
    return this.projectService.retrieve()
                              .pipe(finalize(() => this.setLoading(false)));
  }

  private setLoading(status: boolean) {
    this.loadingScreenService.show(status);
  }

}
