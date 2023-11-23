import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private http: HttpClient) {}

  makePayment(price: number, seat: number, rideData: any): Observable<any> {
    const url = 'http://localhost:5000/api/v1/payment/create-checkout-session';
    return this.http.post(url, {
      price: price,
      seat: seat,
      rideData: rideData,
    });
  }
}
