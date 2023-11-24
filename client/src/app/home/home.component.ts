import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../service/user/user.service';
import { IUser } from '../interface/userInterface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RideDataService } from '../service/ride/ride-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  bg: string = '../../assets/banner.svg';
  isLoading = false;
  isLoadingA = false;
  isLoadingB = false;
  isLoadingC = false;
  isLoadingD = false;
  isLoadingE = false;

  isLoadingf = false;
  isLoadingg = false;
  isLoadingh = false;
  isLoadingi = false;
  isLoadingj = false;
  isLoadingk = false;
  constructor(
    public userService: UserService,
    private http: HttpClient,
    private rideService: RideDataService,
    private router: Router
  ) {}
  Url = 'https://scarlet-bass-hose.cyclic.app/api/v1/ride/getRideByTwoLocation';
  sUrl =
    'https://scarlet-bass-hose.cyclic.app/api/v1/ride/getRideBySingleSource';
  ngOnInit(): void {}

  handleDhakaChittagoan() {
    this.isLoading = true;
    const dhakaCoordinates = [90.389015, 23.7644025];
    const chittagongCoordinates = [91.826048, 22.336471];
    const params = new HttpParams()
      .set('startLong', dhakaCoordinates[0].toString())
      .set('startLat', dhakaCoordinates[1].toString())
      .set('endLong', chittagongCoordinates[0].toString())
      .set('endLat', chittagongCoordinates[1].toString());
    this.http.get(this.Url, { params }).subscribe((data) => {
      this.rideService.setRideData(data);
      this.isLoading = false;
      this.router.navigate(['viewRides']);
    });
  }
  handleDhakaRangpur() {
    this.isLoadingA = true;
    const dhakaCoordinates = [90.389015, 23.7644025];
    const rangpurCoordinates = [89.241459, 25.7569808];
    const params = new HttpParams()
      .set('startLong', dhakaCoordinates[0].toString())
      .set('startLat', dhakaCoordinates[1].toString())
      .set('endLong', rangpurCoordinates[0].toString())
      .set('endLat', rangpurCoordinates[1].toString());
    this.http.get(this.Url, { params }).subscribe((data) => {
      this.rideService.setRideData(data);
      this.isLoadingA = false;
      this.router.navigate(['viewRides']);
    });
  }
  handleDhakaSylhet() {
    this.isLoadingB = true;
    const dhakaCoordinates = [90.389015, 23.7644025];
    const sylhetCoordinates = [91.885208, 24.901765];
    const params = new HttpParams()
      .set('startLong', dhakaCoordinates[0].toString())
      .set('startLat', dhakaCoordinates[1].toString())
      .set('endLong', sylhetCoordinates[0].toString())
      .set('endLat', sylhetCoordinates[1].toString());
    this.http.get(this.Url, { params }).subscribe((data) => {
      this.rideService.setRideData(data);
      this.isLoadingB = false;

      this.router.navigate(['viewRides']);
    });
  }
  handleDhakaRajshahi() {
    this.isLoadingC = true;

    const dhakaCoordinates = [90.389015, 23.7644025];
    const rajshahiCoordinates = [88.5921038, 24.3715513];
    const params = new HttpParams()
      .set('startLong', dhakaCoordinates[0].toString())
      .set('startLat', dhakaCoordinates[1].toString())
      .set('endLong', rajshahiCoordinates[0].toString())
      .set('endLat', rajshahiCoordinates[1].toString());
    this.http.get(this.Url, { params }).subscribe((data) => {
      this.rideService.setRideData(data);
      this.isLoadingC = false;

      this.router.navigate(['viewRides']);
    });
  }
  handleDhakaCox() {
    this.isLoadingD = true;

    const dhakaCoordinates = [90.389015, 23.7644025];
    const coxCoordinates = [91.994554, 21.454777];
    const params = new HttpParams()
      .set('startLong', dhakaCoordinates[0].toString())
      .set('startLat', dhakaCoordinates[1].toString())
      .set('endLong', coxCoordinates[0].toString())
      .set('endLat', coxCoordinates[1].toString());
    this.http.get(this.Url, { params }).subscribe((data) => {
      this.rideService.setRideData(data);
      this.isLoadingD = false;

      this.router.navigate(['viewRides']);
    });
  }
  handleDhakaNoakhali() {
    this.isLoadingE = true;

    const dhakaCoordinates = [90.389015, 23.7644025];
    const noakhaliCoordinates = [91.094892, 22.856696];
    const params = new HttpParams()
      .set('startLong', dhakaCoordinates[0].toString())
      .set('startLat', dhakaCoordinates[1].toString())
      .set('endLong', noakhaliCoordinates[0].toString())
      .set('endLat', noakhaliCoordinates[1].toString());
    this.http.get(this.Url, { params }).subscribe((data) => {
      this.rideService.setRideData(data);
      this.isLoadingE = false;
      this.router.navigate(['viewRides']);
    });
  }

  // Singel destination

  handleCox() {
    this.isLoadingf = true;
    const dhakaCoordinates = [90.389015, 23.7644025];
    const coxCoordinates = [91.994554, 21.454777];
    const params = new HttpParams()
      .set('startLong', dhakaCoordinates[0].toString())
      .set('startLat', dhakaCoordinates[1].toString())
      .set('endLong', coxCoordinates[0].toString())
      .set('endLat', coxCoordinates[1].toString());
    this.http.get(this.sUrl, { params }).subscribe((data) => {
      this.rideService.setRideData(data);
      this.isLoadingf = false;
      this.router.navigate(['viewRides']);
    });
  }
  handleKuakata() {
    this.isLoadingg = true;
    const dhakaCoordinates = [90.389015, 23.7644025];
    const kuakataCoordinates = [90.121864, 21.815024];
    const params = new HttpParams()
      .set('startLong', dhakaCoordinates[0].toString())
      .set('startLat', dhakaCoordinates[1].toString())
      .set('endLong', kuakataCoordinates[0].toString())
      .set('endLat', kuakataCoordinates[1].toString());
    this.http.get(this.sUrl, { params }).subscribe((data) => {
      this.rideService.setRideData(data);
      this.isLoadingg = false;
      this.router.navigate(['viewRides']);
    });
  }
  handleSundarban() {
    this.isLoadingh = true;
    const dhakaCoordinates = [90.389015, 23.7644025];
    const sundarbanCoordinates = [89.563759, 22.817166];
    const params = new HttpParams()
      .set('startLong', dhakaCoordinates[0].toString())
      .set('startLat', dhakaCoordinates[1].toString())
      .set('endLong', sundarbanCoordinates[0].toString())
      .set('endLat', sundarbanCoordinates[1].toString());
    this.http.get(this.sUrl, { params }).subscribe((data) => {
      this.rideService.setRideData(data);
      this.isLoadingh = false;
      this.router.navigate(['viewRides']);
    });
  }
  handleSaint() {
    this.isLoadingi = true;
    const dhakaCoordinates = [90.389015, 23.7644025];
    const saintCoordinates = [92.281604, 20.905711];
    const params = new HttpParams()
      .set('startLong', dhakaCoordinates[0].toString())
      .set('startLat', dhakaCoordinates[1].toString())
      .set('endLong', saintCoordinates[0].toString())
      .set('endLat', saintCoordinates[1].toString());
    this.http.get(this.sUrl, { params }).subscribe((data) => {
      this.rideService.setRideData(data);
      this.isLoadingi = false;
      this.router.navigate(['viewRides']);
    });
  }
  handleBandarban() {
    this.isLoadingj = true;

    const dhakaCoordinates = [90.389015, 23.7644025];
    const bandarbanCoordinates = [92.22175, 22.197289];
    const params = new HttpParams()
      .set('startLong', dhakaCoordinates[0].toString())
      .set('startLat', dhakaCoordinates[1].toString())
      .set('endLong', bandarbanCoordinates[0].toString())
      .set('endLat', bandarbanCoordinates[1].toString());
    this.http.get(this.sUrl, { params }).subscribe((data) => {
      this.rideService.setRideData(data);
      this.isLoadingj = false;
      this.router.navigate(['viewRides']);
    });
  }
  handleSylhet() {
    this.isLoadingk = true;

    const dhakaCoordinates = [90.389015, 23.7644025];
    const sylhetCoordinates = [91.885208, 24.901765];
    const params = new HttpParams()
      .set('startLong', dhakaCoordinates[0].toString())
      .set('startLat', dhakaCoordinates[1].toString())
      .set('endLong', sylhetCoordinates[0].toString())
      .set('endLat', sylhetCoordinates[1].toString());
    this.http.get(this.sUrl, { params }).subscribe((data) => {
      this.rideService.setRideData(data);
      this.isLoadingk = false;
      this.router.navigate(['viewRides']);
    });
  }
}
