import {AfterViewInit, Component, inject, OnInit, ViewChild} from '@angular/core';
import {VehiclesEntity} from "../../model/vehicles.entity";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort,MatSortHeader} from "@angular/material/sort";
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from "@angular/material/table";
import {VehiclesService} from "../../services/vehicles.service";

import {MatIcon, MatIconModule} from "@angular/material/icon";
import {NgClass} from "@angular/common";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatInput} from "@angular/material/input";
import {MatCard, MatCardTitle} from "@angular/material/card";
import {ToolbarContentComponent} from "../../../public/components/toolbar-content/toolbar-content.component";
import {VehiclesEdit} from "../../components/vehicles-edit/vehicles-edt.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-vehicles-management',
  standalone: true,
    imports: [
        VehiclesEdit,
        MatTable,
        MatSort,
        MatColumnDef,
        MatHeaderCell,
        MatSortHeader,
        MatCell,
        MatHeaderCellDef,
        MatCellDef,
        MatIcon,
        MatHeaderRow,
        NgClass,
        MatRowDef,
        MatHeaderRowDef,
        MatRow,
        MatPaginator,
        MatIconModule,
        MatIconButton,
        MatFormField,
        FormsModule,
        MatInput,
        MatButton,
        MatLabel,
        MatCardTitle,
        MatCard,
        ToolbarContentComponent
    ],
  templateUrl: './vehicles-management.component.html',
  styleUrl: './vehicles-management.component.css'
})
export class VehiclesManagementComponent implements OnInit, AfterViewInit {
  vehicleData: VehiclesEntity = new VehiclesEntity({});
  columnsToDisplay: string[] = ['id', 'model', 'plate', 'maxLoad', 'volume', 'photo', 'actions'];
  dataSource: MatTableDataSource<VehiclesEntity> = new MatTableDataSource();
  editMode: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private vehicleService: VehiclesService = inject(VehiclesService);
  private dialog: MatDialog = inject(MatDialog);

  ngOnInit(): void {
    this.getAllVehicles();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onEditItem(item: VehiclesEntity): void {
    this.editMode = true;
    this.vehicleData = item;
    this.openEditDialog(item);
  }

  onDeleteItem(item: VehiclesEntity): void {
    this.deleteVehicle(item.id);
  }

  onAddVehicle(): void {
    this.editMode = false;
    this.vehicleData = new VehiclesEntity({});
    this.openEditDialog(this.vehicleData);
  }

  onVehicleAddRequested(item: VehiclesEntity): void {
    this.vehicleData = item;
    this.createVehicle();
    this.resetEditState();
  }

  onVehicleUpdateRequested(item: VehiclesEntity): void {
    this.vehicleData = item;
    this.updateVehicle();
    this.resetEditState();
  }

  private resetEditState(): void {
    this.vehicleData = new VehiclesEntity({});
    this.editMode = false;
  }

  private getAllVehicles(): void {
    this.vehicleService.getAll().subscribe((response: VehiclesEntity[]) => {
      this.dataSource.data = response;
    });
  }

  private createVehicle(): void {
    this.vehicleService.create(this.vehicleData).subscribe((response: VehiclesEntity) => {
      this.dataSource.data.push(response);
      this.dataSource.data = [...this.dataSource.data];
    });
  }

  private updateVehicle(): void {
    this.vehicleService.update(this.vehicleData.id, this.vehicleData).subscribe((response: VehiclesEntity) => {
      const index = this.dataSource.data.findIndex(vehicle => vehicle.id === response.id);
      this.dataSource.data[index] = response;
      this.dataSource.data = [...this.dataSource.data];
    });
  }

  private deleteVehicle(id: number): void {
    this.vehicleService.delete(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(vehicle => vehicle.id !== id);
      this.dataSource._updateChangeSubscription();
    });
  }

  private openEditDialog(vehicle: VehiclesEntity): void {
    const dialogRef = this.dialog.open(VehiclesEdit, {
      width: '400px',
      data: vehicle
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (this.editMode) {
          this.vehicleData = result;
          this.updateVehicle();
        } else {
          this.vehicleData = result;
          this.createVehicle();
        }
      }
    });
  }

}
