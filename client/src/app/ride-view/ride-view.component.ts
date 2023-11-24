import { Component, OnInit } from '@angular/core';
import { RideDataService } from '../service/ride/ride-data.service';
import { IUser } from '../interface/userInterface';
import { UserService } from '../service/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ride-view',
  templateUrl: './ride-view.component.html',
  styleUrls: ['./ride-view.component.css'],
})
export class RideViewComponent implements OnInit {
  constructor(private rideService: RideDataService, private router: Router) {}
  searchRideData: any[] = [];
  serachRideStartEndName: any = {};
  range(n: number): number[] {
    return [...Array(n).keys()];
  }
  bookedSeatNumber = 0;
  radioButtonValue: string = '';
  ngOnInit(): void {
    this.rideService.getRideData().subscribe((data: any) => {
      if (data && data.data.length > 0) {
        this.searchRideData = data.data.map((ride: any) => {
          if (ride.bookedSeat) {
            this.bookedSeatNumber = ride.bookedSeat;
            if (ride.bookedSeat == ride.seat || ride.bookedSeat > ride.seat) {
              return {
                ...ride,
                booked: true,
                bookedSeatNumber: ride.bookedSeat,
              };
            } else {
              return { ...ride, booked: false };
            }
          } else {
            return { ...ride, booked: false };
          }
        });
        localStorage.removeItem('rideData');
        localStorage.setItem('rideData', JSON.stringify(this.searchRideData));
      } else {
      }
    });

    this.rideService.getRideSearch().subscribe((data) => {
      this.serachRideStartEndName = data || {};
    });
    if (this.searchRideData === null || this.searchRideData.length == 0) {
      const ride: any = localStorage.getItem('rideData');
      const obj = JSON.parse(ride);
      this.searchRideData = obj;
    }
  }
  navigateToCardView(rideData: any) {
    rideData.searchSeatQuantity = 1;
    const data = JSON.stringify(rideData);
    this.router.navigate(['/rideDetailsView', rideData._id, data]);
  }
  onRadioChange(event: any) {
    this.radioButtonValue = event.target.value;
    console.log(this.radioButtonValue);
    if (this.radioButtonValue == 'time') {
      this.searchRideData = this.searchRideData.sort((a: any, b: any) => {
        const [hoursa, minutesa] = a.time.split(':');
        const [hoursb, minutesb] = b.time.split(':');
        const timeA: any = new Date(0, 0, 0, hoursa, minutesa);
        const timeB: any = new Date(0, 0, 0, hoursb, minutesb);

        return timeA - timeB;
      });
    }
    if (this.radioButtonValue == 'price') {
      this.searchRideData = this.searchRideData.sort((a: any, b: any) => {
        return a.price - b.price;
      });
    }
    if (this.radioButtonValue == 'distance') {
      this.searchRideData = this.searchRideData.sort((a: any, b: any) => {
        return a.distance - b.distance;
      });
    }
    if (this.radioButtonValue == 'end_closest') {
      this.searchRideData = this.searchRideData.sort((a: any, b: any) => {
        return a.distanceFromUserStart - b.distanceFromUserStart;
      });
    }
    if (this.radioButtonValue == 'start_closest') {
      this.searchRideData = this.searchRideData.sort((a: any, b: any) => {
        return a.distanceFromUserEnd - b.distanceFromUserEnd;
      });
    }
  }
}
