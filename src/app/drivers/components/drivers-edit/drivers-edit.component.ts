import {
  AfterViewInit,
  Component,
  ElementRef,

  Inject,

  ViewChild
} from '@angular/core';
import { FormsModule, NgForm } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { NgIf } from "@angular/common";
import { gsap } from "gsap";
import {ThemeService} from "../../../../shared/services/theme.service";

@Component({
  selector: 'app-drivers-edit',
  standalone: true,
  imports: [
    FormsModule,
    MatIconModule,

  ],
  templateUrl: './drivers-edit.component.html',
  styleUrl: './drivers-edit.component.css'
})
export class DriversEditComponent   implements AfterViewInit {
  isDarkMode = false;
  driver!: any;
  @ViewChild('modalContainer') modalContainer!: ElementRef;

  constructor(
    public dialogRef: MatDialogRef<DriversEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private themeService: ThemeService
  ) {
    this.driver = {};
    this.isDarkMode = this.themeService.getActiveTheme() === 'dark';
  }

  ngAfterViewInit() {
    this.animateModalIn();
  }

  onCancel(): void {
    this.animateModalOut();
  }

  onSubmit(): void {
    this.animateModalOut();
    this.dialogRef.close(this.driver);
  }



  private animateModalIn() {
    const { top, left, width, height } = this.data.position;

    const initialClipPath = `circle(10px at ${left + width / 2}px ${top + height / 2}px)`;
    const finalClipPath = `circle(100%)`;

    gsap.set(this.modalContainer.nativeElement, {
      clipPath: initialClipPath,
      opacity: 1,
    });

    gsap.to(this.modalContainer.nativeElement, {
      duration: 0.8,
      clipPath: finalClipPath,
      ease: 'power2.out',
    });
  }

  private animateModalOut() {
    const { top, left, width, height } = this.data.position;

    const finalClipPath = `circle(10px at ${left + width / 2}px ${top + height / 2}px)`;

    gsap.to(this.modalContainer.nativeElement, {
      duration: 0.5,
      clipPath: finalClipPath,
      ease: 'power2.in',
      onComplete: () => {
        this.dialogRef.close();
      },
    });
  }
}
