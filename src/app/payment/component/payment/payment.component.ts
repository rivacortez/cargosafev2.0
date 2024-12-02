import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {PaymentEntity} from "../../model/payment.entity";
import {PaymentService} from "../../service/payment.service";
import {CurrencyPipe, DatePipe, NgIf} from "@angular/common";
import {TripEntity} from "../../../trip/model/trip.entity";
import {TripService} from "../../../trip/service/trip.service";
import {DriverService} from "../../../drivers/services/driver.service";
import {VehiclesService} from "../../../vehicles/services/vehicles.service";

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    DatePipe,
    CurrencyPipe,

  ],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit {
  payment: PaymentEntity = new PaymentEntity();
  trip: TripEntity | undefined;
  driverName: string = '';
  vehiclePlate: string = '';

  constructor(
    private paymentService: PaymentService,
    private tripService: TripService,
    private driverService: DriverService,
    private vehicleService: VehiclesService
  ) {}

  ngOnInit(): void {
    this.loadTripDetails();
  }

  loadTripDetails(): void {
    const tripId = 1;
    this.tripService.getById(tripId).subscribe(
      trip => {
        this.trip = trip;
        this.loadDriverName(trip.driverId);
        this.loadVehiclePlate(trip.vehicleId);
      },
      error => console.error('Error loading trip details:', error)
    );
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

  onSubmit(): void {
    this.paymentService.processPayment(this.payment).subscribe(
      response => {
        console.log('Payment processed successfully', response);
      },
      error => {
        console.error('Error processing payment', error);
      }
    );
  }
}
