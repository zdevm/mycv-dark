import { Injectable } from '@angular/core';
import { Profile } from 'src/app/interfaces/profile';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService extends HttpService {

  constructor() {
    super('profile');
  }

  get() {
    return this.http.get<Profile>(this.url);
  }

}
