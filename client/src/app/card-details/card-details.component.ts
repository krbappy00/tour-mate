import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from '../service/payment.service';
import { UserService } from '../service/user/user.service';
import { SwPush } from '@angular/service-worker';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.css'],
})
export class CardDetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private payment: PaymentService,
    private http: HttpClient,
    private userService: UserService,
    private _swPush: SwPush
  ) {}
  currentUser: any = {};
  seat: number = 1;
  rideData: any;
  paymentHandler: any = null;
  baseUrl: string = 'http://localhost:5000/api/v1/ride/bookedRide';
  isLoading = false;

  ngOnInit() {
    this.currentUser = this.userService.getUser();
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.rideData = JSON.parse(params['data']);
    });
    this.requestSubscription();
  }
  requestSubscription = () => {
    if (!this._swPush.isEnabled) {
      console.log('Notification is not enabled.');
      return;
    }

    this._swPush
      .requestSubscription({
        serverPublicKey:
          'BOIWtSfqFXtICkWqFgQG_vpkLtp9V-ZeJmTQXNoi00mmFjKurJhcTVG-osQMgRJa_WvlywyPJNQxXXYJwtC9MBE',
      })
      .then((_) => {
        console.log(JSON.stringify(_));
      })
      .catch((_) => console.log);
  };
  navigateToMap() {
    const start = JSON.stringify(this.rideData.startCoordinates.coordinates);
    const end = JSON.stringify(this.rideData.endCoordinates.coordinates);
    const isRider = false;
    const id = JSON.stringify({ id: this.rideData._id });
    this.router.navigate([
      '/navigationForDetailsView',
      start,
      end,
      isRider,
      id,
    ]);
  }
  makePayment() {
    this.isLoading = true;
    const bookedRide = {
      userId: this.currentUser._id,
      rideId: this.rideData._id,
      bookedSeat: this.seat,
    };
    this.payment
      .makePayment(this.rideData.price * this.seat, this.seat, this.rideData)
      .subscribe((data) => {
        const url = data.data;
        window.location.href = url;
        this.http.post(this.baseUrl, bookedRide).subscribe((data) => {
          this.isLoading = false;
        });
      });
  }
  decreaseSeat() {
    this.seat = this.seat - 1;
  }
  increaseSeat() {
    this.seat = this.seat + 1;
  }
  navigateToRiderProfile() {
    this.router.navigate(['riderProfile/' + this.rideData.user._id]);
  }
}
