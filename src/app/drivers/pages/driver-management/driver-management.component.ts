import {AfterViewInit, Component, inject, OnInit, ViewChild} from '@angular/core';
import {DriverEntity} from "../../model/driver.entity";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from "@angular/material/table";
import {DriverService} from "../../services/driver.service";
import {
  DriversEditComponent
} from "../../components/drivers-edit/drivers-edit.component";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {NgClass} from "@angular/common";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatInput} from "@angular/material/input";
import {MatCard, MatCardTitle} from "@angular/material/card";
import {ToolbarContentComponent} from "../../../public/components/toolbar-content/toolbar-content.component";
import {MatDialog} from "@angular/material/dialog";
import {VehiclesEntity} from "../../../vehicles/model/vehicles.entity";

@Component({
  selector: 'app-driver-management',
  standalone: true,
  imports: [
    DriversEditComponent,
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
  templateUrl: './driver-management.component.html',
  styleUrl: './driver-management.component.css'
})
export class DriverManagementComponent implements OnInit, AfterViewInit {
  driverData: DriverEntity = new DriverEntity({});
  columnsToDisplay: string[] = ['id', 'name', 'dni', 'contactNum', 'license', 'photoUrl', 'actions'];
  dataSource: MatTableDataSource<DriverEntity> = new MatTableDataSource();
  editMode: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private driverService: DriverService = inject(DriverService);
  private dialog: MatDialog = inject(MatDialog);

  ngOnInit(): void {
    this.getAllDrivers();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onEditItem(item: DriverEntity): void {
    this.editMode = true;
    this.driverData = item;
    this.openEditDialog(item);
  }

  onDeleteItem(item: DriverEntity): void {
    this.deleteDriver(item.id);
  }

  onAddDriver(): void {
    this.editMode = false;
    this.driverData = new DriverEntity({});
    this.openEditDialog(this.driverData);
  }

  private resetEditState(): void {
    this.driverData = new DriverEntity({});
    this.editMode = false;
  }

  private getAllDrivers(): void {
    this.driverService.getAll().subscribe((response: DriverEntity[]) => {
      this.dataSource.data = response;
    });
  }

  private createDriver(): void {
    this.driverService.create(this.driverData).subscribe((response: DriverEntity) => {
      this.dataSource.data.push(response);
      this.dataSource.data = [...this.dataSource.data];
    });
  }

  private updateDriver(): void {
    this.driverService.update(this.driverData.id, this.driverData).subscribe({
      next: (response: DriverEntity) => {
        const index = this.dataSource.data.findIndex(driver => driver.id === response.id);
        if (index !== -1) {
          this.dataSource.data[index] = response;
          this.dataSource.data = [...this.dataSource.data];
        }
        console.log('Driver Response: ', response);
      },
      error: (error) => {
        console.error('Error updating driver:', error);
      }
    });
  }

  private deleteDriver(id: number): void {
    this.driverService.delete(id).subscribe({
      next: () => {
        this.dataSource.data = this.dataSource.data.filter(driver => driver.id !== id);
        this.dataSource.data = [...this.dataSource.data];
        console.log('Driver deleted successfully');
      },
      error: (error) => {
        console.error('Error deleting driver:', error);
      }
    });
  }

  private openEditDialog(driver: DriverEntity): void {
    const dialogRef = this.dialog.open(DriversEditComponent, {
      width: '400px',
      data: driver
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (this.editMode) {
          this.driverData = result;
          this.updateDriver();
        } else {
          this.driverData = result;
          this.createDriver();
        }
      }
    });
  }
}
