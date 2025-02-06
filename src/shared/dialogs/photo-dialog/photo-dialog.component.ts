import {AfterViewInit, Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { gsap } from 'gsap';
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";


@Component({
  selector: 'app-photo-dialog',
  standalone: true,
  imports: [
    MatIcon,
    MatIconButton

  ],
  templateUrl: './photo-dialog.component.html',
  styleUrl: './photo-dialog.component.css'
})
export class PhotoDialogComponent   implements AfterViewInit {
  constructor(
    public dialogRef: MatDialogRef<PhotoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { photoUrl: string }
  ) {}

  ngAfterViewInit() {
    this.animateEntrance();
  }

  private animateEntrance() {
    gsap.to('.enlarged-photo', {
      duration: 0.5,
      opacity: 1,
      ease: 'back.out(1.2)'
    });
  }
}
