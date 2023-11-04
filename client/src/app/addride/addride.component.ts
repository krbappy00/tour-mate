import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { LocationService } from '../service/location/location.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addride',
  templateUrl: './addride.component.html',
  styleUrls: ['./addride.component.css'],
})
export class AddrideComponent {
  focus: string = '';

  startLocation: string | null = null;
  endLocation: string | null = null;

  @Input() startCoordinates!: [number, number];
  @Input() endCoordinates!: [number, number];
  @Input() showRoute = false;

  startLocationsuggestions: any[] = [];
  endLocationsuggestions: any[] = [];

  onStartHide: boolean = false;
  onEndHide: boolean = false;
  rideData: any;

  constructor(
    private http: HttpClient,
    private locationService: LocationService,
    private router: Router
  ) {}

  startOnFocus() {
    this.focus = 'start';
    this.locationService.setOnFocus(this.focus);
  }
  endOnFocus() {
    this.focus = 'end';
    this.locationService.setOnFocus(this.focus);
  }
  searchLocations() {
    const accessToken =
      'pk.eyJ1IjoiYXNpZnVycmFobWFucGlhbCIsImEiOiJjbG5qd29ldTEwMjdsMnBsazFsaW1xcm5rIn0.L5kKxav_0VTewsxlvWUS2g';
    const apiUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${this.startLocation}.json?access_token=${accessToken}`;

    this.http.get(apiUrl).subscribe((data: any) => {
      // console.log(data)
      this.startLocationsuggestions = data.features.map((feature: any) => {
        return {
          placeName: feature.place_name,
          coordinates: feature.geometry.coordinates,
        };
      });
      // console.log("start",this.startLocationsuggestions)
      this.onStartHide = true;
    });
  }
  searchEndLocation() {
    const accessToken =
      'pk.eyJ1IjoiYXNpZnVycmFobWFucGlhbCIsImEiOiJjbG5qd29ldTEwMjdsMnBsazFsaW1xcm5rIn0.L5kKxav_0VTewsxlvWUS2g';
    const apiUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${this.endLocation}.json?access_token=${accessToken}`;

    this.http.get(apiUrl).subscribe((data: any) => {
      this.endLocationsuggestions = data.features.map((feature: any) => {
        return {
          placeName: feature.place_name,
          coordinates: feature.geometry.coordinates,
        };
      });
      this.onEndHide = true;
    });
  }
  setStartLocation(e: any) {
    this.locationService.setStartLocation(e);
    this.startCoordinates = e.coordinates;
    this.startLocation = e.placeName;
    this.onStartHide = false;
    this.locationService.getStartLocation().subscribe((data: any) => {
      this.startLocation = data.placeName;
      this.onStartHide = false;
    });
  }

  setEndLocation(e: any) {
    this.locationService.setEndLocation(e);
    this.endCoordinates = e.coordinates;
    this.endLocation = e.placeName;
    this.onEndHide = false;
    this.locationService.getEndLocation().subscribe((data: any) => {
      this.endLocation = data.placeName;
      this.onEndHide = false;
    });
  }

  onSubmit() {
    const start = JSON.stringify(this.startCoordinates);
    const end = JSON.stringify(this.endCoordinates);
    this.router.navigate(['/rideDetails', start, end]);
  }
}
