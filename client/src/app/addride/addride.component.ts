import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { LocationService } from '../service/location/location.service';

@Component({
  selector: 'app-addride',
  templateUrl: './addride.component.html',
  styleUrls: ['./addride.component.css']
})
export class AddrideComponent {
  focus:string = '';
  startLocation: string | null = null;
  endLocation: string | null = null;

  startLocationsuggestions: any[] = [];
  endLocationsuggestions: any[] = [];

  onStartHide:boolean=false;
  onEndHide:boolean=false;

  constructor(private http: HttpClient,private locationService: LocationService) {}

  startOnFocus() {
    this.focus = 'start'
    this.locationService.setOnFocus(this.focus);
  }
  endOnFocus(){
    this.focus = 'end'
    this.locationService.setOnFocus(this.focus);
  }
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
   setStartLocation(e: any) {
    this.locationService.setStartLocation(e);
    this.startLocation = e.placeName;
    this.onStartHide = false;
    this.locationService.getStartLocation().subscribe((data: any) => {
      this.startLocation = data.placeName;
      this.onStartHide = false;
    });
  }

  setEndLocation(e:any){
    this.locationService.setEndLocation(e)
    this.endLocation =e.placeName
    this.onEndHide = false
    this.locationService.getEndLocation().subscribe((data: any) => {
      this.endLocation = data.placeName;
      this.onEndHide = false
    })


  }

  onSubmit(){

  }

}
