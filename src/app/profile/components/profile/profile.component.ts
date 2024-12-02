import {Component, OnInit} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {CommonModule, NgForOf, NgIf, NgStyle} from "@angular/common";
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
import {NgxDropzoneModule} from "ngx-dropzone";

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
    MatTab,
    NgxDropzoneModule,
    NgForOf,
    CommonModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  profile: ProfileEntity | null = null;
  currentUsername: string = '';
  fullName: string = '';

  files: File[] = [];


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private profileService: ProfileService,
    private authenticationService: AuthenticationService
  ) {
    this.profileForm = this.formBuilder.group({
      profileImageUrl: [''],
      biography: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      street: ['', Validators.required],
        number: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.authenticationService.currentUserId.subscribe(userId => {
      this.loadUserProfile(userId);
    });
  }

  loadUserProfile(profileId: number): void {
    if (!profileId) {
      console.error('Invalid profile ID');
      this.snackBar.open('Invalid user ID', 'Close', {duration: 3000});
      return;
    }

    this.profileService.getById(profileId).subscribe({
      next: (profile) => {
        this.profile = profile;
        this.fullName = `${profile.firstName} ${profile.lastName}`;
        this.profileForm.patchValue(profile);
      },
      error: () => {
        this.snackBar.open('Error fetching profile data', 'Close', {duration: 3000});
      }
    });
  }



  onUpdate(): void {
    if (this.files.length > 0) {
      const filedata = this.files[0];
      const data = new FormData();
      data.append('file', filedata);
      data.append('upload_preset', 'urlcloudinaryprofile');
      data.append('cloud_name', 'du35rv7mm');

      this.profileService.uploadImg(data).subscribe({
        next: (result: any) => {
          this.profileForm.patchValue({ profileImageUrl: result.url });
          this.updateProfile();
        },
        error: (error) => {
          console.error('Error uploading image:', error);
          this.snackBar.open('Error uploading image', 'Close', { duration: 3000 });
        }
      });
    } else {
      this.updateProfile();
    }
  }

  updateProfile(): void {
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
        this.profileForm.patchValue(response);
      },
      error: (error) => {
        console.error('Error updating profile:', error);
        this.snackBar.open('Error updating profile', 'Close', { duration: 3000 });
      }
    });
  }

  onSelect(event: any): void {
    this.files.push(...event.target.files);
    if (this.files.length > 0) {
      const filedata = this.files[0];
      const data = new FormData();
      data.append('file', filedata);
      data.append('upload_preset', 'urlcloudinaryprofile');
      data.append('cloud_name', 'du35rv7mm');

      this.profileService.uploadImg(data).subscribe({
        next: (result: any) => {
          this.profileForm.patchValue({ profileImageUrl: result.url });
          this.updateProfile();
        },
        error: (error) => {
          console.error('Error uploading image:', error);
          this.snackBar.open('Error uploading image', 'Close', { duration: 3000 });
        }
      });
    }
  }

  onRemove(event: any): void {
    this.files.splice(this.files.indexOf(event), 1);
  }
}
