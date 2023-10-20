import { LocationService } from './../service/location/location.service';

import { AfterViewInit, Component, Input, OnChanges, OnInit, Renderer2, SimpleChanges } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import { CoordinatesService } from '../service/coordinates.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit,AfterViewInit {
  mapContainer: any;
  constructor(private coor:CoordinatesService,private locationService:LocationService,private renderer: Renderer2) {}

  initialCenter: [number, number] = [90.414391, 23.746466];
  map!: mapboxgl.Map; // Declare a map variable
  isDataSet = false;
  @Input() showRoute = false;
 @Input() startCoordinates!: [number, number]
 @Input() endCoordinates!: [number, number]

  ngOnInit() {
    this.locationService.getStartLocation().subscribe((data) => {
      this.startCoordinates =data.coordinates
      localStorage.removeItem('startPlaceName')
      localStorage.removeItem('startCoordinates')
      localStorage.setItem('startPlaceName',JSON.stringify(data.placeName))
      localStorage.setItem('startCoordinates',JSON.stringify(this.startCoordinates))
    });
    this.locationService.getEndLocation().subscribe((data) => {
      this.endCoordinates = data.coordinates
      localStorage.removeItem('endPlaceName')
      localStorage.removeItem('endCoordinates')
      localStorage.setItem('endPlaceName',JSON.stringify(data.placeName))
      localStorage.setItem('endCoordinates',JSON.stringify(this.endCoordinates))

    });


  }
  ngAfterViewInit(): void {
    this.locationService.getMapLoad().subscribe((data) => {
      if(data){
        this.tryRenderMap()
      }
    })

  }

  tryRenderMap() {
    if (this.startCoordinates && this.endCoordinates) {
      this.mapRender();
    } else {
      console.log("Data is not set yet");
    }
  }


  private mapRender(){
    const mapElement = document.getElementById('map');
    if (mapElement) {
      mapElement.innerHTML = '';
    }
    this.map = new mapboxgl.Map({
      accessToken: 'pk.eyJ1IjoiYXNpZnVycmFobWFucGlhbCIsImEiOiJjbG5qd29ldTEwMjdsMnBsazFsaW1xcm5rIn0.L5kKxav_0VTewsxlvWUS2g',
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: this.initialCenter,
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
