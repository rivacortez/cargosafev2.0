import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DatePipe, NgForOf} from "@angular/common";
import {TripEntity} from "../../model/trip.entity";
import {TripService} from "../../service/trip.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-list-trips-entrepreneur',
  standalone: true,
  imports: [
    NgForOf,
    DatePipe,
    MatIcon,

  ],
  templateUrl: './list-trips-entrepreneur.component.html',
  styleUrl: './list-trips-entrepreneur.component.css'
})
export class ListTripsEntrepreneurComponent implements OnInit {
  trips: TripEntity[] = [];
  @Output() notificationDeleted = new EventEmitter<void>();
  constructor(
    private tripService: TripService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTrips();
  }

  loadTrips(): void {
    this.tripService.getAll().subscribe(
      trips => this.trips = trips,
      error => this.handleError('Error loading trips', error)
    );
  }

  private handleError(message: string, error: any): void {
    console.error(message, error);
    this.snackBar.open(message, 'Cerrar', { duration: 2000 });
  }

  viewMore(): void {
    this.router.navigate(['/list-request-history']);
  }

  deleteNotification(index: number): void {
    this.trips.splice(index, 1);
    this.notificationDeleted.emit();
  }
}
