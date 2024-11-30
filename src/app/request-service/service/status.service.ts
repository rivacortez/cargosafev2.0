import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {catchError, Observable, throwError} from "rxjs";
import {StatusEntity} from "../model/status.entity";

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  private basePath = `${environment.serverBasePath}/requestServices/status`;

  constructor(private http: HttpClient) {}

  getAllStatuses(): Observable<StatusEntity[]> {
    return this.http.get<StatusEntity[]>(this.basePath).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${error.error.message}`;
    } else {
      errorMessage = `Backend returned code ${error.status}, body was: ${JSON.stringify(error.error)}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
