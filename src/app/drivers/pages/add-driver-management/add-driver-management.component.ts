import {Component, EventEmitter, inject, OnInit, Output, ViewChild} from '@angular/core';
import {
    DriversEditComponent
} from "../../components/drivers-edit/drivers-edit.component";
import {DriverEntity} from "../../model/driver.entity";
import {FormsModule, NgForm} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {DriverService} from "../../services/driver.service";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {NgIf} from "@angular/common";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {ToolbarContentComponent} from "../../../public/components/toolbar-content/toolbar-content.component";
import {MatIcon} from "@angular/material/icon";
import {
  DialogSuccessfullyComponent
} from "../../../public/components/dialogs/dialog-successfully/dialog-successfully.component";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {VehiclesEntity} from "../../../vehicles/model/vehicles.entity";

@Component({
  selector: 'app-add-driver-management',
  standalone: true,
  imports: [
    DriversEditComponent,
    MatFormField,
    NgIf,
    MatInput,
    MatButton,
    MatCardTitle,
    MatCard,
    MatCardContent,
    FormsModule,
    ToolbarContentComponent,
    MatLabel,
    MatError,
    MatIcon
  ],
  templateUrl: './add-driver-management.component.html',
  styleUrl: './add-driver-management.component.css'
})
export class AddDriverManagementComponent  {
  driver: DriverEntity = new DriverEntity({});
  @Output() driverAddRequested = new EventEmitter<DriverEntity>();
  @ViewChild('driverForm', { static: false }) driverForm!: NgForm;

  private driverService: DriverService = inject(DriverService);
  private dialog: MatDialog = inject(MatDialog);
  private router: Router = inject(Router);



  onSubmit() {
    if (this.driverForm.form.valid) {
      console.log('Submitting vehicle data:', this.driver);
      this.driverService.create(this.driver).subscribe({
        next: (response) => {
          console.log('Driver created successfully:', response);
          this.driverAddRequested.emit(response);
          this.showSuccessDialog();
        },
        error: (error) => {
          console.error('Error creating Driver:', error);
          alert('An error occurred while creating the Driver. Please try again later.');
        }
      });
    } else {
      console.error('Invalid form data');
    }
  }


  private showSuccessDialog(): void {
    const dialogRef = this.dialog.open(DialogSuccessfullyComponent, {
      data: { message: 'Driver added successfully!' }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['/drivers/management']);
    });
  }

  onCancel(): void {
    this.router.navigate(['/management/drivers/new']);
  }
}
