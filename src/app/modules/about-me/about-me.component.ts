import { Component, OnInit } from '@angular/core';
import { LoadingScreenService } from '@services/loading-screen/loading-screen.service';
import { finalize } from 'rxjs';
import { ProfileService } from 'src/app/services/profile/profile.service';

@Component({
  selector: 'about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent implements OnInit {

  firstName?: string;
  lastName?: string;
  occupation?: string;
  about?: string;
  image?: string;

  constructor(private readonly profileService: ProfileService,
              private loadingScreenService: LoadingScreenService) { }

  ngOnInit(): void {
    this.fetchProfile().subscribe(profile => {
      this.firstName = profile.firstName;
      this.lastName = profile.lastName;
      this.occupation = profile.occupation;
      this.about = profile.about;
      this.image = profile.image;
    })
  }

  fetchProfile() {
    this.setLoading(true);
    return this.profileService.get()
                              .pipe(finalize(() => this.setLoading(false)));
  }

  private setLoading(status: boolean) {
    this.loadingScreenService.show(status);
  }

}
