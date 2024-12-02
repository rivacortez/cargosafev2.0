import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource
} from "@angular/material/table";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {AddRequestTripComponent} from "../add-request-trip/add-request-trip.component";
import {MatIcon} from "@angular/material/icon";
import {DatePipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {TripEntity} from "../../../trip/model/trip.entity";
import {TripService} from "../../../trip/service/trip.service";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {FormsModule} from "@angular/forms";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {RequestServiceEntity} from "../../model/request-service.entity";
import {RequestService} from "../../service/request.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {MatOption, MatSelect} from "@angular/material/select";
import {StatusService} from "../../service/status.service";
import {StatusEntity} from "../../model/status.entity";

@Component({
  selector: 'app-list-request-trip',
  standalone: true,
  imports: [
    AddRequestTripComponent,
    MatTable,
    MatHeaderCell,
    MatColumnDef,
    MatSortHeader,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    MatIcon,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    NgClass,
    MatRowDef,
    MatPaginator,
    MatSort,
    MatButton,
    MatCard,
    MatCardHeader,
    MatCardContent,
    FormsModule,
    MatFormField,
    NgIf,
    MatInput,
    MatIconButton,
    MatCardTitle,
    DatePipe,

    MatSelect,
    MatOption,
    NgForOf
  ],
  templateUrl: './list-request-trip.component.html',
  styleUrl: './list-request-trip.component.css'
})
export class ListRequestTripComponent  implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'holderName', 'loadDetail', 'destinationAddress', 'pickupAddress', 'unload_date', 'actions'];
  dataSource = new MatTableDataSource<RequestServiceEntity>();
  searchId: string = '';
  statuses: StatusEntity[] = [];
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private requestService: RequestService,
    private snackBar: MatSnackBar,
    private router: Router,
    private statusService: StatusService,
  ) {
    this.dataSource.filterPredicate = (data: RequestServiceEntity, filter: string) => {
      return data.id.toString() === filter;
    };
  }

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
      requests => this.dataSource.data = requests,
      error => this.handleError('Error loading requests', error)
    );
  }

  loadStatuses(): void {
    this.statusService.getAllStatuses().subscribe(
      statuses => this.statuses = statuses,
      error => this.handleError('Error loading statuses', error)
    );
  }



  updateStatus(trip: RequestServiceEntity, statusName: string): void {
    const statusId = this.statuses.find(status => status.name === statusName)?.id;
    if (statusId !== undefined) {
      this.requestService.updateStatus(trip.id, statusId).subscribe(
        () => {
          this.snackBar.open('Status updated successfully', 'Close', { duration: 2000 });
          this.loadRequests();
        },
        error => this.handleError('Error updating status', error)
      );
    }
  }

  private handleError(message: string, error: any): void {
    console.error(message, error);
    this.snackBar.open(message, 'Close', { duration: 2000 });
  }

  applyFilter(): void {
    this.dataSource.filter = this.searchId.trim().toLowerCase();
  }

  protected readonly isNaN = isNaN;
  protected readonly Date = Date;
}
