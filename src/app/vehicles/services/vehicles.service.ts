import { Injectable } from '@angular/core';

import {VehiclesEntity} from "../model/vehicles.entity";
import {BaseService} from "../../../shared/services/base.service";
import {catchError, Observable, retry} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class VehiclesService extends BaseService<VehiclesEntity> {
  constructor() {
    super();
    this.resourceEndpoint = '/vehicles';
  }

  public override create(vehicle: VehiclesEntity): Observable<VehiclesEntity> {
    return this.http.post<VehiclesEntity>(this.resourcePath(), vehicle, this.httOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  public override update(vehicleId: number, vehicle: VehiclesEntity): Observable<VehiclesEntity> {
    return this.http.put<VehiclesEntity>(`${this.resourcePath()}/${vehicleId}`, vehicle, this.httOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  public override delete(vehicleId: number): Observable<void> {
    return this.http.delete<void>(`${this.resourcePath()}/${vehicleId}`, this.httOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  public override getAll(): Observable<VehiclesEntity[]> {
    return this.http.get<VehiclesEntity[]>(this.resourcePath(), this.httOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
