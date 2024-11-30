import { Injectable } from '@angular/core';
import {BaseService} from "../../../shared/services/base.service";
import {DriverEntity} from "../model/driver.entity";
import {catchError, Observable, retry} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DriverService extends BaseService<DriverEntity> {
  constructor() {
    super();
    this.resourceEndpoint = '/drivers';
  }

  public override create(driver: DriverEntity): Observable<DriverEntity> {
    return this.http.post<DriverEntity>(this.resourcePath(), driver, this.httOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  public override update(driverId: number, driver: DriverEntity): Observable<DriverEntity> {
    return this.http.put<DriverEntity>(`${this.resourcePath()}/${driverId}`, driver, this.httOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  public override delete(driverId: number): Observable<void> {
    return this.http.delete<void>(`${this.resourcePath()}/${driverId}`, this.httOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  public override getAll(): Observable<DriverEntity[]> {
    return this.http.get<DriverEntity[]>(this.resourcePath(), this.httOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
