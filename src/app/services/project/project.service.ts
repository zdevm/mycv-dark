import { Injectable } from '@angular/core';
import { Project } from '@interfaces/project';
import { HttpService } from '@services/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService extends HttpService {

  constructor() {
    super('projects')
  }

  retrieve() {
    return this.http.get<Project[]>(this.url);
  }


}
