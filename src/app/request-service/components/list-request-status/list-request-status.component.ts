
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {
  MatCell,
  MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource
} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {RequestServiceEntity} from "../../model/request-service.entity";
import {RequestService} from "../../service/request.service";
import {MatCard, MatCardTitle} from "@angular/material/card";
import {DatePipe, NgForOf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {StatusEntity} from "../../model/status.entity";
import {StatusService} from "../../service/status.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatFormField} from "@angular/material/form-field";
import {MatOption} from "@angular/material/core";
import {MatSelect} from "@angular/material/select";



@Component({
  selector: 'app-list-request-status',
  standalone: true,
  imports: [
    MatPaginator,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatHeaderRowDef,
    MatCellDef,
    MatCell,
    MatHeaderCell,
    MatHeaderCellDef,
    MatColumnDef,
    MatTable,
    MatCardTitle,
    MatCard,
    MatSort,
    DatePipe,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,

    MatFormField,
    MatOption,
    MatSelect,
    NgForOf
  ],
  templateUrl: './list-request-status.component.html',
  styleUrl: './list-request-status.component.css'
})
export class ListRequestStatusComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'holderName', 'loadDetail', 'destinationAddress', 'pickupAddress', 'unload_date', 'result'];
  dataSource = new MatTableDataSource<RequestServiceEntity>();
  statuses: StatusEntity[] = [];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  searchId: string = '';
  constructor(
    private requestService: RequestService,
    private statusService: StatusService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadRequests();
    this.loadStatuses();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  loadRequests(): void {
    this.requestService.getAll().subscribe(
      requests => {
        this.dataSource.data = requests;
        console.log('Requests loaded:', requests);
      },
      error => this.handleError('Error loading requests', error)
    );
  }

  loadStatuses(): void {
    this.statusService.getAllStatuses().subscribe(
      statuses => {
        if (statuses && statuses.length > 0) {
          this.statuses = statuses;
        } else {
          console.error('No statuses found');
        }
      },
      error => {
        console.error('Error loading statuses', error);
      }
    );
  }


  getStatusName(statusId: number): string {
    const status = this.statuses.find(status => status.id === statusId);
    return status ? status.name : 'Unknown';
  }

  private handleError(message: string, error: any): void {
    console.error(message, error);
    this.snackBar.open(message, 'Close', { duration: 2000 });
  }
  applyFilter(): void {
    this.dataSource.filter = this.searchId.trim().toLowerCase();
  }

}
