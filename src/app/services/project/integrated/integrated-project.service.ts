import { Injectable } from '@angular/core';
import { ErrorResponse } from '@classes/error-response';
import { projects } from '@integrated/db';
import { Project } from '@interfaces/project';
import { ProjectService } from '@services/project/project.service';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class IntegratedProjectService implements ProjectService {
    constructor() {}

    retrieve(): Observable<Project[]> {
        return of(projects);
    }

    getById(id: string): Observable<Project> {
        const project = projects.find((project) => project.id === id);
        return project
            ? of(project)
            : throwError(() => new ErrorResponse(['Failed to find page']));
    }
}
