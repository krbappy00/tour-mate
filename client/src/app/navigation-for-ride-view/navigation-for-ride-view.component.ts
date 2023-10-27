import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as mapboxgl from 'mapbox-gl';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';

@Component({
  selector: 'app-navigation-for-ride-view',
  templateUrl: './navigation-for-ride-view.component.html',
  styleUrls: ['./navigation-for-ride-view.component.css']
})
export class NavigationForRideViewComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}
  startCoordinates:any
  endCoordinates:any
  map!: mapboxgl.Map; // Declare a map variable
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id']; // Retrieve the id from the route parameter
      this.startCoordinates = JSON.parse(params['start']);
      this.endCoordinates = JSON.parse(params['end']);
      console.log(this.startCoordinates,this.endCoordinates,"from navigation")
      this.mapRender()
    });
  }
  private mapRender(){
    this.map = new mapboxgl.Map({
      accessToken: 'pk.eyJ1IjoiYXNpZnVycmFobWFucGlhbCIsImEiOiJjbG5qd29ldTEwMjdsMnBsazFsaW1xcm5rIn0.L5kKxav_0VTewsxlvWUS2g',
      container: 'map',
      style: 'mapbox://styles/asifurrahmanpial/clo1vea6q00hg01pfb6211d74',
      center: this.startCoordinates,
      zoom: 15,
    });
    this.map.on('load', () => {

      const directions = new MapboxDirections({
        accessToken: 'pk.eyJ1IjoiYXNpZnVycmFobWFucGlhbCIsImEiOiJjbG5qd29ldTEwMjdsMnBsazFsaW1xcm5rIn0.L5kKxav_0VTewsxlvWUS2g',
        unit: 'metric',
        profile: 'mapbox/driving-traffic',
        alternatives: true
      });

      directions.setOrigin(this.startCoordinates);
      directions.setDestination(this.endCoordinates)
      this.map.addControl(directions, 'top-left');
      const geocoderControl = document.querySelector('.mapboxgl-ctrl-top-left');
      if (geocoderControl instanceof HTMLElement) {
        geocoderControl.style.display = 'none';
      }
    })
    }
}
