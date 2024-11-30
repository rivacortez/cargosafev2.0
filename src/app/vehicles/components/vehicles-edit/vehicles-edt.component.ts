import {Component, Inject} from '@angular/core';
import {VehiclesEntity} from "../../model/vehicles.entity";
import {FormsModule} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {NgIf} from "@angular/common";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";

@Component({
  selector: 'app-vehicles-edit',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatButton,
    FormsModule,
    NgIf,
    MatLabel,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle
  ],
  templateUrl: './vehicles-edit.component.html',
  styleUrl: './vehicles-edit.component.css'
})
export class VehiclesEdit {
  vehicle: VehiclesEntity;

  constructor(
    public dialogRef: MatDialogRef<VehiclesEdit>,
    @Inject(MAT_DIALOG_DATA) public data: VehiclesEntity
  ) {
    this.vehicle = { ...data };
  }

  onSubmit(): void {
    this.dialogRef.close(this.vehicle);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
