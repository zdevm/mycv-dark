import { Injectable } from '@angular/core';
import { projects } from '@integrated/db';
import { Project } from '@interfaces/project';
import { ProjectService } from '@services/project/project.service';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class IntegratedProjectService implements ProjectService {
    constructor() {}

    retrieve(): Observable<Project[]> {
        throw of(projects);
    }

    getById(id: string): Observable<Project> {
        throw new Error('Method not implemented.');
    }
}
