import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatToolbar} from "@angular/material/toolbar";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {LanguageSwitcherComponent} from "../language-switcher/language-switcher.component";
import {Router, RouterLink} from "@angular/router";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {Subject, takeUntil} from "rxjs";
import {MatBadge} from "@angular/material/badge";
import {TripService} from "../../../trip/service/trip.service";
import {
  ListTripsEntrepreneurComponent
} from "../../../trip/components/list-trips-entrepreneur/list-trips-entrepreneur.component";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";

@Component({
  selector: 'app-toolbar-entrepreneur-content',
  standalone: true,
  imports: [
    MatToolbar,
    MatButton,
    MatIconButton,
    MatIcon,
    MatMenuTrigger,
    MatMenuItem,
    MatMenu,
    LanguageSwitcherComponent,
    RouterLink,
    NgIf,
    NgForOf,
    MatBadge,
    MatDialogModule,
    ListTripsEntrepreneurComponent,
    NgClass
  ],
  templateUrl: './toolbar-entrepreneur-content.component.html',
  styleUrl: './toolbar-entrepreneur-content.component.css'
})
export class ToolbarEntrepreneurContentComponent implements OnInit, OnDestroy {
  notificationCount: number = 0;
  isNotificationPanelExpanded: boolean  = false;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private tripService: TripService,
    private router: Router,

    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadTrips();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  loadTrips(): void {
    this.tripService.getAll().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe({
      next: (trips) => {
        this.notificationCount = trips.length;
      },
      error: (err) => {
        console.error('Failed to load trips', err);
      }
    });
  }

  logout() {

    this.router.navigate(['/sign-in']).then();
  }

  openTripsDialog(): void {
    this.dialog.open(ListTripsEntrepreneurComponent, {
      width: '400px',
      height: '500px',
      panelClass: 'custom-dialog-container'
    });
  }

  toggleNotificationPanelWidth(): void {
    this.isNotificationPanelExpanded = !this.isNotificationPanelExpanded;
  }

  onNotificationDeleted(): void {
    this.notificationCount--;
  }

}
