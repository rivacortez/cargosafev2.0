import {Component, EventEmitter, Inject, Input, Output, ViewChild} from '@angular/core';
import {DriverEntity} from "../../model/driver.entity";
import {FormsModule, NgForm} from "@angular/forms";
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {NgIf} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";
import {ToolbarContentComponent} from "../../../public/components/toolbar-content/toolbar-content.component";
import {MatColumnDef, MatTable} from "@angular/material/table";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";

@Component({
  selector: 'app-drivers-edit',
  standalone: true,
  imports: [
    MatCardHeader,
    MatCard,
    FormsModule,
    MatCardContent,
    MatFormField,
    MatInput,
    MatCardActions,
    MatButton,
    NgIf,
    MatCardTitle,
    MatLabel,
    MatError,
    MatIconModule,
    ToolbarContentComponent,
    MatTable,
    MatColumnDef,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions

  ],
  templateUrl: './drivers-edit.component.html',
  styleUrl: './drivers-edit.component.css'
})
export class DriversEditComponent {
  driver: DriverEntity;


  constructor(
    public dialogRef: MatDialogRef<DriversEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DriverEntity
  ) {
    this.driver = { ...data };
  }

  onSubmit(): void {
    this.dialogRef.close(this.driver);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
