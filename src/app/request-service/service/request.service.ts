import { Injectable } from '@angular/core';
import {BaseService} from "../../../shared/services/base.service";
import {RequestServiceEntity} from "../model/request-service.entity";
import {catchError, Observable, Subject, tap, throwError} from "rxjs";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {NotificationService} from "./notification.service";

@Injectable({
  providedIn: 'root'
})
export class RequestService extends BaseService<RequestServiceEntity> {
  constructor(http: HttpClient, private notificationService: NotificationService) {
    super();
    this.http = http;
    this.resourceEndpoint = '/requestServices';
  }
  getAllRequests(): Observable<RequestServiceEntity[]> {
    return this.http.get<RequestServiceEntity[]>(this.resourcePath()).pipe(
      catchError(this.handleError)
    );
  }

  updateStatus(id: number, statusId: number): Observable<any> {
    const url = `${this.resourcePath()}/${id}/status`;
    return this.http.put(url, { statusId }, this.httOptions).pipe(
      tap(() => this.notificationService.showNotification(
        'Status updated',
        'The status has been updated successfully.',
        'success'
      )),
      catchError(this.handleError)
    );
  }

   handleErrorUpdate(error: HttpErrorResponse) {
    console.error('Error updating status', error);
    return throwError(() => new Error('Error updating status'));
  }

  saveRequestServiceTrip(trip: RequestServiceEntity): Observable<any> {
    return this.http.post(this.resourcePath(), trip, this.httOptions).pipe(
      tap(() => this.notificationService.showNotification(
        'Solicitud guardada',
        'The trip has been saved successfully.',
        'success'
      )),
      catchError(this.handleError)
    );
  }

  override handleError(error: HttpErrorResponse) {
    console.error('Error saving trip', error);
    return throwError(() => new Error('Error saving trip'));
  }

  private acceptedTrips: Set<number> = new Set<number>();

  addTrip(tripId: number): void {
    this.acceptedTrips.add(tripId);
  }

  hasTrip(tripId: number): boolean {
    return this.acceptedTrips.has(tripId);
  }

  rejectRequest(id: number): Observable<any> {
    const url = `${this.basePath}/status`;
    const statusUpdate = { id: id, status: 'rejected', requestServiceTripId: id };
    return this.http.post(url, statusUpdate, this.httOptions).pipe(
      tap(() => this.notificationService.showNotification(
        'Bad request',
        'The trip you requested has been rejected.',
        'error'

      )),
      catchError(this.handleError)
    );
  }



}
