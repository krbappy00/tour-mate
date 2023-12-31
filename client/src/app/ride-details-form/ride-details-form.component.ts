import { LocationService } from './../service/location/location.service';
import { Component, Input, OnInit } from '@angular/core';
import { NavigationComponent } from '../navigation/navigation.component';
import { CoordinatesService } from '../service/coordinates.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { timestamp } from 'rxjs';

@Component({
  selector: 'app-ride-details-form',
  templateUrl: './ride-details-form.component.html',
  styleUrls: ['./ride-details-form.component.css'],
})
export class RideDetailsFormComponent implements OnInit {
  mapboxAccessToken =
    'pk.eyJ1IjoiYXNpZnVycmFobWFucGlhbCIsImEiOiJjbG5qd29ldTEwMjdsMnBsazFsaW1xcm5rIn0.L5kKxav_0VTewsxlvWUS2g';
  // [x: string]: any;
  rideDistance: any;
  travelProfile = 'mapbox/driving';
  @Input() startCoordinates!: [number, number];
  @Input() endCoordinates!: [number, number];
  startNav!: [number, number];
  endNav!: [number, number];
  isLoading = false;
  minDate: string;
  date = new Date();
  estimatedPrice: number = 0;
  suggestedPrice = 0;
  baseUrl = 'https://scarlet-bass-hose.cyclic.app/api/v1/ride/register-ride';

  // RIDE FORM INPUT
  rideData: any = {
    userId: '',
    date: new Date(),
    time: '',
    seat: 0,
    price: this.estimatedPrice,
    allowPet: false,
    allowSmoking: false,
    allowAlcohol: false,
    startCoordinates: {
      type: 'Point',
      coordinates: this.startCoordinates,
    },
    endCoordinates: {
      type: 'Point',
      coordinates: this.endCoordinates,
    },
    startPlaceName: '',
    endPlaceName: '',
    pickUpPoints1: [],
    pickUpPoints2: [],
    pickUpPoints3: [],
  };

  constructor(
    private locationService: LocationService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.startNav = JSON.parse(params['start']);
      this.endNav = JSON.parse(params['end']);
    });
    if (this.startNav && this.endNav) {
      const rideStartCoordinates = `${this.startNav[0]},${this.startNav[1]}`;
      const rideEndCoordinates = `${this.endNav[0]},${this.endNav[1]}`;
      const rideDistanceUrl = `https://api.mapbox.com/directions/v5/${this.travelProfile}/${rideStartCoordinates};${rideEndCoordinates}?access_token=${this.mapboxAccessToken}`;
      this.http.get(rideDistanceUrl).subscribe((data: any) => {
        this.rideDistance = data.routes[0].distance / 1000;
        if (this.rideDistance < 10) {
          this.estimatedPrice = this.rideDistance * 15;
        }
        if (this.rideDistance > 10 && this.rideDistance < 20) {
          this.estimatedPrice = this.rideDistance * 12;
        }
        if (this.rideDistance > 20 && this.rideDistance < 30) {
          this.estimatedPrice = this.rideDistance * 10;
        }
        if (this.rideDistance > 30 && this.rideDistance < 40) {
          this.estimatedPrice = this.rideDistance * 8;
        }
        if (this.rideDistance > 40 && this.rideDistance < 50) {
          this.estimatedPrice = this.rideDistance * 6;
        }
        if (this.rideDistance > 50 && this.rideDistance < 60) {
          this.estimatedPrice = this.rideDistance * 5;
        }
        if (this.rideDistance > 60 && this.rideDistance < 70) {
          this.estimatedPrice = this.rideDistance * 4;
        }
        if (this.rideDistance > 70 && this.rideDistance < 80) {
          this.estimatedPrice = this.rideDistance * 3;
        }
        if (this.rideDistance > 80 && this.rideDistance < 1090) {
          this.estimatedPrice = this.rideDistance * 2.5;
        }
        // const price = parseInt(this.estimatedPrice);

        this.rideData.price = this.estimatedPrice - (this.estimatedPrice % 10);
        this.suggestedPrice = this.estimatedPrice - (this.estimatedPrice % 10);
      });
    }

    this.locationService.setMapLoad(true);
    this.locationService.getStartLocation().subscribe((data: any) => {
      this.rideData.startPlaceName = data.placeName;
      this.rideData.startCoordinates = data.coordinates;
    });
    this.locationService.getEndLocation().subscribe((data: any) => {
      this.rideData.endPlaceName = data.placeName;
      this.rideData.endCoordinates = data.coordinates;
    });
  }
  viewNavigation() {
    const start = JSON.stringify(this.startNav);
    const end = JSON.stringify(this.endNav);
    const isRider = true;
    const id = JSON.stringify({ id: '0' });

    this.router.navigate([
      '/navigationForDetailsView',
      start,
      end,
      isRider,
      id,
    ]);
  }
  onSubmit() {
    this.isLoading = true;
    const pickUpPoints1 = localStorage.getItem('pickUpPoints1');
    if (pickUpPoints1) {
      const pickUp = JSON.parse(pickUpPoints1);
      this.rideData.pickUpPoints1 = pickUp.lngLat;
      console.log(this.rideData.pickUpPoints1);
    }
    const pickUpPoints2 = localStorage.getItem('pickUpPoints2');
    if (pickUpPoints2) {
      const pickUp = JSON.parse(pickUpPoints2);
      this.rideData.pickUpPoints2 = pickUp.lngLat;
      console.log(this.rideData.pickUpPoints2);
    }
    const pickUpPoints3 = localStorage.getItem('pickUpPoints3');
    if (pickUpPoints3) {
      const pickUp = JSON.parse(pickUpPoints3);
      this.rideData.pickUpPoints3 = pickUp.lngLat;
      console.log(this.rideData.pickUpPoints3);
    }

    const startPlaceName = localStorage.getItem('startPlaceName');
    const endPlaceName = localStorage.getItem('endPlaceName');
    const startCoordinates = localStorage.getItem('startCoordinates');
    const endCoordinates = localStorage.getItem('endCoordinates');
    const user = localStorage.getItem('user');
    if (
      startPlaceName &&
      endPlaceName &&
      startCoordinates &&
      endCoordinates &&
      user
    ) {
      this.rideData.startPlaceName = JSON.parse(startPlaceName);
      this.rideData.endPlaceName = JSON.parse(endPlaceName);
      this.rideData.startCoordinates.coordinates = JSON.parse(startCoordinates);
      this.rideData.endCoordinates.coordinates = JSON.parse(endCoordinates);
      const userObj = JSON.parse(user);
      this.rideData.userId = userObj._id;
    }
    console.log(this.rideData);
    this.http.post(this.baseUrl, this.rideData).subscribe({
      next: (data: any) => {
        this.isLoading = false;
        this.router.navigate(['profile']);
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }
}
