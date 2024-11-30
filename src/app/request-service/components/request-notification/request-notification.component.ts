import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {RequestServiceEntity} from "../../model/request-service.entity";
import {RequestService} from "../../service/request.service";
import {DatePipe, NgForOf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {Router} from "@angular/router";

@Component({
  selector: 'app-request-notification',
  standalone: true,
  imports: [
    NgForOf,
    DatePipe,
    MatIcon
  ],
  templateUrl: './request-notification.component.html',
  styleUrl: './request-notification.component.css'
})
export class RequestNotificationComponent implements OnInit {
  requests: RequestServiceEntity[] = [];
  @Output() notificationDeleted = new EventEmitter<void>();

  constructor(private requestService: RequestService, private router: Router) {}

  ngOnInit(): void {
    this.loadRequests();
  }

  loadRequests(): void {
    this.requestService.getAllRequests().subscribe(
      (data: RequestServiceEntity[]) => {
        this.requests = data;
      },
      error => {
        console.error('Error loading requests:', error);
      }
    );
  }

  viewMore(): void {
    this.router.navigate(['/list-request-trip']);
  }

  deleteNotification(index: number): void {
    this.requests.splice(index, 1);
    this.notificationDeleted.emit();
  }

  protected readonly Date = Date;
  protected readonly isNaN = isNaN;
}
