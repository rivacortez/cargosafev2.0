import {Component, OnInit} from '@angular/core';
import {TripEntity} from "../../model/trip.entity";
import {ActivatedRoute, Router} from "@angular/router";
import {TripService} from "../../service/trip.service";
import {CurrencyPipe, DatePipe, NgForOf, NgIf} from "@angular/common";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatInput} from "@angular/material/input";
import {
  MatDatepicker, MatDatepickerActions,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "@angular/material/datepicker";
import {MatButton} from "@angular/material/button";
import {DriverEntity} from "../../../drivers/model/driver.entity";
import {VehiclesEntity} from "../../../vehicles/model/vehicles.entity";
import {DriverService} from "../../../drivers/services/driver.service";
import {VehiclesService} from "../../../vehicles/services/vehicles.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatNativeDateModule} from "@angular/material/core";
import {ToolbarContentComponent} from "../../../public/components/toolbar-content/toolbar-content.component";
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-details-trip',
  standalone: true,
  imports: [
    NgIf,
    DatePipe,
    CurrencyPipe,
    ReactiveFormsModule,
    MatFormField,
    MatSelect,
    MatOption,
    MatInput,
    MatDatepicker,
    MatDatepickerToggle,
    MatDatepickerInput,
    MatButton,
    NgForOf,
    MatLabel,
    MatDatepickerModule,
    MatNativeDateModule,
    ToolbarContentComponent,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatIcon,
    MatCardActions,
    MatCardTitle,
    DatePipe,
    FormsModule
  ],
  templateUrl: './details-trip.component.html',
  styleUrl: './details-trip.component.css'
})
export class DetailsTripComponent implements OnInit {
  trips: TripEntity[] = [];
  drivers: DriverEntity[] = [];
  vehicles: VehiclesEntity[] = [];
  tripForm: FormGroup;
  trip: TripEntity | undefined;
  driverName: string = '';
  vehiclePlate: string = '';
  constructor(
    private route: ActivatedRoute,
    private tripService: TripService,
    private driverService: DriverService,
    private vehicleService: VehiclesService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.tripForm = this.fb.group({
      driverId: ['', Validators.required],
      vehicleId: ['', Validators.required],
      destinationDate: ['', Validators.required],
      totalAmount: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.loadTripDetails();
    this.loadDrivers();
    this.loadVehicles();
  }

  loadTripDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.tripService.getById(id).subscribe(
        trip => {
          this.trip = trip;
          this.tripForm.patchValue(trip);
          this.loadDriverName(trip.driverId);
          this.loadVehiclePlate(trip.vehicleId);
        },
        error => console.error('Error loading trip details:', error)
      );
    }
  }

  loadDriverName(driverId: number): void {
    this.driverService.getById(driverId).subscribe(
      driver => this.driverName = driver.name,
      error => console.error('Error loading driver name:', error)
    );
  }

  loadVehiclePlate(vehicleId: number): void {
    this.vehicleService.getById(vehicleId).subscribe(
      vehicle => this.vehiclePlate = vehicle.plate,
      error => console.error('Error loading vehicle plate:', error)
    );
  }

  loadDrivers(): void {
    this.driverService.getAll().subscribe(
      drivers => this.drivers = drivers,
      error => console.error('Error loading drivers:', error)
    );
  }

  loadVehicles(): void {
    this.vehicleService.getAll().subscribe(
      vehicles => this.vehicles = vehicles,
      error => console.error('Error loading vehicles:', error)
    );
  }

  onSubmit(): void {
    if (this.trip && this.tripForm.valid) {
      const updatedTrip = {
        ...this.trip,
        ...this.tripForm.value
      };
      this.tripService.update(this.trip.id, updatedTrip).subscribe(
        () => {
          this.snackBar.open('Trip details updated successfully', 'Close', { duration: 2000 });
          this.loadTripDetails();
        },
        error => console.error('Error updating trip details:', error)
      );
    }
  }

  loadTrips(): void {
    this.tripService.getAll().subscribe(
      trips => this.trips = trips,
      error => console.error('Error loading trips:', error)
    );
  }

  assignDetails(trip: TripEntity): void {
    if (this.tripForm.valid) {
      const updatedTrip = {
        ...trip,
        driverId: this.tripForm.value.driverId,
        vehicleId: this.tripForm.value.vehicleId,
        destinationDate: this.tripForm.value.destinationDate,
        totalAmount: this.tripForm.value.totalAmount
      };
      this.tripService.update(trip.id, updatedTrip).subscribe(
        () => {
          this.snackBar.open('Trip details updated successfully', 'Close', { duration: 2000 });
          this.loadTrips();
        },
        error => console.error('Error updating trip details:', error)
      );
    }
  }

  onCancel() {
    this.router.navigate(['/add-trip-details']);
  }

  goBack(): void {
    this.router.navigate(['/add-trip-details']);
  }

  openAssignDialog(trip: TripEntity): void {

  }
}
