import {Component, OnInit} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {NgIf, NgStyle} from "@angular/common";
import {ProfileEntity} from "../../model/profile.entity";
import {ProfileService} from "../../service/profile.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {
  ToolbarEntrepreneurContentComponent
} from "../../../public/components/toolbar-entrepreneur-content/toolbar-entrepreneur-content.component";
import {Router} from "@angular/router";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {AuthenticationService} from "../../../iam/services/authentication.service";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    MatCard,
    NgIf,
    MatCardHeader,
    MatCardContent,
    NgStyle,
    MatCardTitle,
    ReactiveFormsModule,
    MatFormField,
    MatButton,
    MatInput,
    MatLabel,
    ToolbarEntrepreneurContentComponent,
    MatCardSubtitle,
    MatTabGroup,
    MatTab
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  profile: ProfileEntity | null = null;
  currentUsername: string = '';
  fullName: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private profileService: ProfileService,
    private authenticationService: AuthenticationService
  ) {
    this.profileForm = this.formBuilder.group({
      avatar: [''],
      bio: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      street: ['', Validators.required],
      number: ['', Validators.required],
      city: ['', Validators.required],
      postalCode: ['', Validators.required],
      country: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.authenticationService.currentUserId.subscribe(userId => {
      this.loadUserProfile(userId);
    });
  }

  loadUserProfile(profileId: number): void {
    if (profileId === 0) {
      console.error('Invalid profile ID');
      return;
    }
    this.profileService.getById(profileId).subscribe({
      next: (profile) => {
        this.profile = profile;
        this.fullName = `${profile.firstName} ${profile.lastName}`;
        this.profileForm.patchValue({
          avatar: profile.avatar,
          bio: profile.bio,
          firstName: profile.firstName,
          lastName: profile.lastName,
          email: profile.email,
          street: profile.street,
          number: profile.number,
          city: profile.city,
          postalCode: profile.postalCode,
          country: profile.country
        });
      },
      error: (error) => {
        console.error('Error fetching profile:', error);
        this.snackBar.open('Error fetching profile data', 'Close', {duration: 3000});
      }
    });
  }

  onUpdate(): void {
    if (this.profileForm.invalid) {
      return;
    }
    const updatedProfile = new ProfileEntity(this.profileForm.value);
    const profileId = this.profile?.id || 0;
    if (profileId === 0) {
      console.error('Profile ID is invalid');
      return;
    }
    this.profileService.update(profileId, updatedProfile).subscribe({
      next: (response) => {
        this.snackBar.open('Profile updated successfully', 'Close', { duration: 3000 });
        this.fullName = `${response.firstName} ${response.lastName}`;
        this.profileForm.patchValue({
          avatar: response.avatar,
          bio: response.bio,
          firstName: response.firstName,
          lastName: response.lastName,
          email: response.email,
          street: response.street,
          number: response.number,
          city: response.city,
          postalCode: response.postalCode,
          country: response.country
        });
      },
      error: (error) => {
        console.error('Error updating profile:', error);
        this.snackBar.open('Error updating profile', 'Close', { duration: 3000 });
      }
    });
  }

}
