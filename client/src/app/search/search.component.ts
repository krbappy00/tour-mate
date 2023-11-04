import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { RideDataService } from '../service/ride/ride-data.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  constructor(private http:HttpClient,private rideService:RideDataService,private router: Router){}

  startLocationsuggestions:any[]=[]
  endLocationsuggestions:any[]=[]

  onStartHide = false;
  onEndHide =false;

  startCoordinatesLong:Number = 0;
  startCoordinatesLat:Number = 0;
  endCoordinatesLong:Number =0;
  endCoordinatesLat:Number =0

  startLocation: string | null = null;
  endLocation: string | null = null;

  seat = 1;
  date = new Date();
   // You can adjust the locale and format as needed
  baseUrl = 'http://localhost:5000/api/v1/ride/search-ride'

  isLoading = false;

  searchStartLocations() {
    // Make a request to Mapbox Geocoding API to get location suggestions
    const accessToken = 'pk.eyJ1IjoiYXNpZnVycmFobWFucGlhbCIsImEiOiJjbG5qd29ldTEwMjdsMnBsazFsaW1xcm5rIn0.L5kKxav_0VTewsxlvWUS2g';
    const apiUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${this.startLocation}.json?access_token=${accessToken}`;

    this.http.get(apiUrl).subscribe((data: any) => {
      this.startLocationsuggestions = data.features.map((feature: any) =>{
        return {placeName:feature.place_name,coordinates:feature.geometry.coordinates}
      });
      this.onStartHide = true

    });
  }
  setStartLocation(e: any) {
    this.startCoordinatesLong = e.coordinates[0]
    this.startCoordinatesLat = e.coordinates[1]
    this.startLocation = e.placeName;
    this.onStartHide = false;
  }
  searchEndLocations() {
    // Make a request to Mapbox Geocoding API to get location suggestions
    const accessToken = 'pk.eyJ1IjoiYXNpZnVycmFobWFucGlhbCIsImEiOiJjbG5qd29ldTEwMjdsMnBsazFsaW1xcm5rIn0.L5kKxav_0VTewsxlvWUS2g';
    const apiUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${this.endLocation}.json?access_token=${accessToken}`;

    this.http.get(apiUrl).subscribe((data: any) => {
      this.endLocationsuggestions = data.features.map((feature: any) =>{
        return {placeName:feature.place_name,coordinates:feature.geometry.coordinates}
      });
      this.onEndHide = true

    });
  }
  setEndLocation(e: any) {
    this.endCoordinatesLong = e.coordinates[0]
    this.endCoordinatesLat = e.coordinates[1]
    this.endLocation = e.placeName;
    this.onEndHide = false;
  }

  onSubmit(){
    this.isLoading = true;
    const dateString = this.date.toString();
    const params = new HttpParams()
      .set('startLong', this.startCoordinatesLong.toString())
      .set('startLat', this.startCoordinatesLat.toString())
      .set('endLong',this.endCoordinatesLong.toString())
      .set('endLat', this.endCoordinatesLat.toString())
      .set('date', dateString )
      .set('seats', this.seat.toString());

    this.rideService.setRideSearch({startLocation:this.startLocation,endLocation:this.endLocation,date:this.date,seat:this.seat})
    this.http.get(this.baseUrl, { params }).subscribe((data) => {
      this.isLoading = false;
      this.rideService.setRideData(data)
      this.router.navigate(['viewRides'])
    });
  }

}

