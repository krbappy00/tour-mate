import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { LocationService } from '../service/location/location.service';

@Component({
  selector: 'app-addride',
  templateUrl: './addride.component.html',
  styleUrls: ['./addride.component.css']
})
export class AddrideComponent {
  startLocation: string = '';
  endLocation: string = '';

  startLocationsuggestions: any[] = [];
  endLocationsuggestions: any[] = [];

  onStartHide:boolean=true;
  onEndHide:boolean=true;

  constructor(private http: HttpClient,private locationService: LocationService) {}

  searchLocations() {
    // Make a request to Mapbox Geocoding API to get location suggestions
    const accessToken = 'pk.eyJ1IjoiYXNpZnVycmFobWFucGlhbCIsImEiOiJjbG5qd29ldTEwMjdsMnBsazFsaW1xcm5rIn0.L5kKxav_0VTewsxlvWUS2g';
    const apiUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${this.startLocation}.json?access_token=${accessToken}`;

    this.http.get(apiUrl).subscribe((data: any) => {
      // console.log(data)
      this.startLocationsuggestions = data.features.map((feature: any) =>{
        return {placeName:feature.place_name,coordinates:feature.geometry.coordinates}
      });
      // console.log("start",this.startLocationsuggestions)
      this.onStartHide = true

    });
  }
  searchEndLocation() {
    // Make a request to Mapbox Geocoding API to get location suggestions
    const accessToken = 'pk.eyJ1IjoiYXNpZnVycmFobWFucGlhbCIsImEiOiJjbG5qd29ldTEwMjdsMnBsazFsaW1xcm5rIn0.L5kKxav_0VTewsxlvWUS2g';
    const apiUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${this.endLocation}.json?access_token=${accessToken}`;

    this.http.get(apiUrl).subscribe((data: any) => {
      this.endLocationsuggestions = data.features.map((feature: any) => {
        return {placeName:feature.place_name,coordinates:feature.geometry.coordinates}
      });
      this.onEndHide = true

    });
  }
  setStartLocation(e:any){
    this.startLocation = e.placeName;
    this.locationService.setStartLocation(e)
    this.onStartHide = false;

  }
  setEndLocation(e:any){
    this.endLocation = e.placeName;
    this.locationService.setEndLocation(e)
    this.onEndHide = false

  }

  onSubmit(){

  }

}
