import { Component, OnInit } from '@angular/core';
import { Project } from '@interfaces/project';
import { ProjectService } from '@services/project/project.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss']
})
export class ProjectsListComponent implements OnInit {
  projects: Project[] = [];

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.fetchPreviousJobs().subscribe(projects => this.projects = projects);
  }

  fetchPreviousJobs(): Observable<Project[]> {
    return this.projectService.retrieve();
  }

}
