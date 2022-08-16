import { Component, OnInit } from '@angular/core';
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

  constructor(private readonly profileService: ProfileService) { }

  ngOnInit(): void {
    this.fetchProfile();
  }

  fetchProfile() {
    this.profileService.get().subscribe(profile => {
      this.firstName = profile.firstName;
      this.lastName = profile.lastName;
      this.occupation = profile.occupation;
      this.about = profile.about;
      this.image = profile.image;
    })
  }



}
