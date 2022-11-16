import { InjectionToken } from '@angular/core';
import { Project } from '@interfaces/project';
import { Observable } from 'rxjs';

export const ProjectServiceToken = new InjectionToken<ProjectService>(
    'ProjectService'
);

export interface ProjectService {
    retrieve(): Observable<Project[]>;

    getById(id: string): Observable<Project>;
}
