import { Component, OnInit } from '@angular/core';
import { Profile } from '@interfaces/profile';
import { ProfileService } from '@services/profile/profile.service';

@Component({
  selector: 'contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  profile?: Profile;

  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
    this.fetchProfile().subscribe(profile => this.profile = profile);
  }

  fetchProfile() {
    return this.profileService.get();
  }

}
