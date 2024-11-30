import { Injectable } from '@angular/core';
import {BaseService} from "../../../shared/services/base.service";
import {TripEntity} from "../model/trip.entity";
import {catchError, Observable, retry} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TripService extends BaseService<TripEntity> {

  constructor() {
    super();
    this.resourceEndpoint = '/trips';
  }

  public override create(trip: TripEntity): Observable<TripEntity> {
    return this.http.post<TripEntity>(this.resourcePath(), trip, this.httOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  public override update(id: number, trip: TripEntity): Observable<TripEntity> {
    return this.http.put<TripEntity>(`${this.resourcePath()}/${id}`, trip, this.httOptions);
  }

  public getAllTrips(): Observable<TripEntity[]> {
    return this.http.get<TripEntity[]>(this.resourcePath(), this.httOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
