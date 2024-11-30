import { Injectable } from '@angular/core';
import {BaseService} from "../../../shared/services/base.service";
import {PaymentEntity} from "../model/payment.entity";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PaymentService  extends BaseService<PaymentEntity> {

  constructor( http: HttpClient) {
    super();
    this.resourceEndpoint = '/payments';
  }

  processPayment(payment: PaymentEntity): Observable<any> {
    return this.http.post<any>(this.resourcePath(), payment, this.httOptions)
      .pipe(catchError(this.handleError));
  }
}
