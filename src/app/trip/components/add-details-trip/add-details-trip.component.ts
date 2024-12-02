import {Component, OnInit} from '@angular/core';
import {TripEntity} from "../../model/trip.entity";
import {DriverEntity} from "../../../drivers/model/driver.entity";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TripService} from "../../service/trip.service";
import {DriverService} from "../../../drivers/services/driver.service";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {ActivatedRoute, Router} from "@angular/router";
import {VehiclesEntity} from "../../../vehicles/model/vehicles.entity";
import {VehiclesService} from "../../../vehicles/services/vehicles.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-add-details-trip',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf,
    DatePipe,
    NgIf,
    MatIconButton,
    MatIcon,
    MatCardTitle,
    MatCard,
    MatTable,
    MatHeaderCell,
    MatColumnDef,
    MatCell,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRowDef,
    MatRow,
    MatButton,
    MatCardHeader,
    MatCardContent,
    MatPaginator,
    FormsModule,
    MatSort
  ],
  templateUrl: './add-details-trip.component.html',
  styleUrl: './add-details-trip.component.css'
})
export class AddDetailsTripComponent implements OnInit {
  trips: TripEntity[] = [];
  drivers: DriverEntity[] = [];
  vehicles: VehiclesEntity[] = [];
  tripForm: FormGroup;
  displayedColumns: string[] = ['id', 'type', 'destination', 'unload_date','actions',];
  searchId: string = '';
  constructor(
    private tripService: TripService,
    private driverService: DriverService,
    private vehicleService: VehiclesService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.tripForm = this.fb.group({
      driverId: [''],
      vehicleId: [''],
      destinationDate: [''],
      totalAmount: ['']
    });
  }

  ngOnInit(): void {
    this.loadTrips();
    this.loadDrivers();
    this.loadVehicles();
  }

  loadTrips(): void {
    this.tripService.getAll().subscribe(
      trips => this.trips = trips,
      error => console.error('Error loading trips:', error)
    );
  }

  loadDrivers(): void {
    this.tripService.getAll().subscribe(
      trips => {
        const usedDriverIds = trips.map(trip => trip.driverId);
        this.driverService.getAll().subscribe(
          drivers => this.drivers = drivers.filter(driver => !usedDriverIds.includes(driver.id)),
          error => console.error('Error loading drivers:', error)
        );
      },
      error => console.error('Error loading trips:', error)
    );
  }

  loadVehicles(): void {
    this.tripService.getAll().subscribe(
      trips => {
        const usedVehicleIds = trips.map(trip => trip.vehicleId);
        this.vehicleService.getAll().subscribe(
          vehicles => this.vehicles = vehicles.filter(vehicle => !usedVehicleIds.includes(vehicle.id)),
          error => console.error('Error loading vehicles:', error)
        );
      },
      error => console.error('Error loading trips:', error)
    );
  }



  openAssignDialog(trip: TripEntity): void {
    this.router.navigate(['/trip/details', trip.id]);
  }

  applyFilter(): void {
    if (this.searchId) {
      this.trips = this.trips.filter(trip => trip.id.toString().includes(this.searchId));
    } else {
      this.loadTrips();
    }
  }
}
