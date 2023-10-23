import { Component, OnInit, Input } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions'

import { LocationService } from '../service/location/location.service';
import { HttpClient } from '@angular/common/http';
// import { config } from 'dotenv';
// config()
// export const environment = {
//   production: false,
//   mapboxApi: process.env['MAPBOX_API'],
// };

@Component({
  selector: 'app-mapbox',
  templateUrl: './mapbox.component.html',
  styleUrls: ['./mapbox.component.css']
})
export class MapboxComponent implements OnInit {
  @Input() selectedLocation: any;
  location: any;
  startCordinates:[any,any] = [90.4078, 23.7925];
  endCordinates:[any,any] = [90.4078, 23.7925];
  inputFocus: string  = 'start';
  initialCenter: [number, number] = [90.4078, 23.7925];
  map!: mapboxgl.Map;
  marker: mapboxgl.Marker | null = null;

  constructor(private http: HttpClient, private locationService: LocationService) {}

  ngOnInit() {
    this.initializeMap();
  }

  private initializeMap() {
    this.map = new mapboxgl.Map({
      accessToken:'pk.eyJ1IjoiYXNpZnVycmFobWFucGlhbCIsImEiOiJjbG5qd29ldTEwMjdsMnBsazFsaW1xcm5rIn0.L5kKxav_0VTewsxlvWUS2g',
      container: 'map',
      style: 'mapbox://styles/asifurrahmanpial/clo1vea6q00hg01pfb6211d74',
      center: this.initialCenter,
      zoom: 15,
    });



    this.locationService.getOnFocus().subscribe((data: any) => {
      if(data === 'start'){
        this.locationService.getStartLocation().subscribe((data: any) => {
          this.initialCenter = [data.coordinates[0], data.coordinates[1]];
          this.startCordinates = [data.coordinates[0], data.coordinates[1]];
          (this.map as any).setCenter(this.initialCenter);
          this.updateMarkerPosition(this.initialCenter);
          this.inputFocus = 'start'
        });
      } else {
        this.locationService.getEndLocation().subscribe((data: any) => {
          this.initialCenter = [data.coordinates[0], data.coordinates[1]];
          this.endCordinates = [data.coordinates[0], data.coordinates[1]];
          (this.map as any).setCenter(this.initialCenter);
          this.updateMarkerPosition(this.initialCenter);
          this.inputFocus = 'end'
        })
      }
    })





    this.marker = new mapboxgl.Marker({ draggable: true })
      .setLngLat(this.initialCenter)
      .addTo(this.map);


    this.marker.on('dragend', () => {
      const newLocation = this.marker!.getLngLat();
      // this.locationService.setStartLocation({ coordinates: [newLocation.lng, newLocation.lat] });
      this.getPlaceName(newLocation.lng, newLocation.lat)
    });
  }





  updateMap() {
    if (this.map) {
      (this.map as any).setCenter(this.initialCenter);
      this.updateMarkerPosition(this.initialCenter);
    }
  }

  private updateMarkerPosition(coordinates: [number, number]) {
    if (this.marker) {
      this.marker.setLngLat(coordinates);
    }
  }

    private getPlaceName(lng:number,lat:number) {
      const accessToken = 'pk.eyJ1IjoiYXNpZnVycmFobWFucGlhbCIsImEiOiJjbG5qd29ldTEwMjdsMnBsazFsaW1xcm5rIn0.L5kKxav_0VTewsxlvWUS2g';
      const apiUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${accessToken}`;
      this.http.get(apiUrl).subscribe((data: any) => {
        const placeName = data.features[0].place_name;
        if (this.inputFocus === 'start'){
          this.locationService.setStartLocation({
            coordinates: [lng, lat],
            placeName: placeName
          })
        } else {
          this.locationService.setEndLocation({
            coordinates: [lng, lat],
            placeName: placeName
          })
        }
      });
    }
}
