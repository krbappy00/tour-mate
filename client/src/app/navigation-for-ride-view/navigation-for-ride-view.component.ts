import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import mapboxgl from 'mapbox-gl';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import { LocationService } from '../service/location/location.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-navigation-for-ride-view',
  templateUrl: './navigation-for-ride-view.component.html',
  styleUrls: ['./navigation-for-ride-view.component.css'],
})
export class NavigationForRideViewComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private locationService: LocationService,
    private http: HttpClient
  ) {}
  startCoordinates: any;
  endCoordinates: any;
  map!: mapboxgl.Map;
  pickupPoints: any[] = [];
  disableMapClick: boolean = false;
  isRider: any;
  id: any;
  rideDataForPickUpPointCollection: any;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.startCoordinates = JSON.parse(params['start']);
      this.endCoordinates = JSON.parse(params['end']);
      this.isRider = params['isRider'];
      console.log(this.isRider);
      if (params['id']) {
        this.id = JSON.parse(params['id']);
        console.log(this.id);
      }
      if (this.startCoordinates && this.endCoordinates) {
        this.mapRender();
      }
    });
    if (this.id.id === '0') {
      this.pickupPoints = this.generateInitialPickupPoints();
    } else {
      this.http
        .get(`http://localhost:5000/api/v1/ride/getRideById/${this.id.id}`)
        .subscribe((data: any) => {
          this.rideDataForPickUpPointCollection = data;
          this.pickupPoints = this.generateRidePickUpPoint();
        });
    }
  }
  generateInitialPickupPoints() {
    const startLng = this.startCoordinates[0];
    const startLat = this.startCoordinates[1];
    const offset = 0.003;

    return [
      {
        lngLat: [startLng + offset, startLat + offset],
        name: 'Pickup Point 1',
      },
      {
        lngLat: [startLng - offset, startLat + offset],
        name: 'Pickup Point 2',
      },
      { lngLat: [startLng, startLat - offset], name: 'Pickup Point 3' },
    ];
  }
  generateRidePickUpPoint() {
    return [
      {
        lngLat: this.rideDataForPickUpPointCollection.data.pickUpPoints1,
        name: 'Pickup Point 1',
      },
      {
        lngLat: this.rideDataForPickUpPointCollection.data.pickUpPoints2,
        name: 'Pickup Point 2',
      },
      {
        lngLat: this.rideDataForPickUpPointCollection.data.pickUpPoints3,
        name: 'Pickup Point 3',
      },
    ];
  }
  clickHandler = (e: any) => {
    // Do nothing (or handle as needed)
  };

  private mapRender() {
    const mapElement = document.getElementById('map');
    if (mapElement) {
      mapElement.innerHTML = '';
    }
    this.map = new mapboxgl.Map({
      accessToken:
        'pk.eyJ1IjoiYXNpZnVycmFobWFucGlhbCIsImEiOiJjbG5qd29ldTEwMjdsMnBsazFsaW1xcm5rIn0.L5kKxav_0VTewsxlvWUS2g',
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: this.startCoordinates,
      zoom: 15,
    });
    this.map.on('load', () => {
      const directions = new MapboxDirections({
        accessToken:
          'pk.eyJ1IjoiYXNpZnVycmFobWFucGlhbCIsImEiOiJjbG5qd29ldTEwMjdsMnBsazFsaW1xcm5rIn0.L5kKxav_0VTewsxlvWUS2g',
        unit: 'metric',
        profile: 'mapbox/driving-traffic',
        alternatives: true,
      });
      this.map.on('click', (e: any) => {
        e.preventDefault();
        e.stopPropagation();
      });

      directions.setOrigin(this.startCoordinates);
      directions.setDestination(this.endCoordinates);
      this.map.addControl(directions, 'top-left');
      const geocoderControl = document.querySelector('.mapboxgl-ctrl-top-left');
      if (geocoderControl instanceof HTMLElement) {
        geocoderControl.style.display = 'none';
      }
      this.pickupPoints.forEach((pickupPoint, index) => {
        const el = document.createElement('div');
        el.className = 'pickup-marker';
        el.style.backgroundImage = `url('../../assets/icons8-car.gif')`;
        el.style.width = '50px';
        el.style.height = '50px';
        const markerText = document.createElement('p');
        markerText.innerHTML = `${pickupPoint.name}`;
        markerText.style.position = 'absolute';
        markerText.style.top = '-27px';
        markerText.style.left = '50%';
        markerText.style.color = '#054652';
        markerText.style.width = '100px';
        markerText.style.textAlign = 'center';
        markerText.style.transform = 'translateX(-50%)';
        markerText.style.backgroundColor = 'white';
        markerText.style.padding = '5px';
        markerText.style.borderRadius = '5px';
        el.appendChild(markerText);
        if (this.id.id === '0') {
          const marker = new mapboxgl.Marker(el, { draggable: true })
            .setLngLat(pickupPoint.lngLat)
            .addTo(this.map);
          marker.on('dragend', () => {
            const lngLat = marker.getLngLat();
            this.pickupPoints[index].lngLat = [lngLat.lng, lngLat.lat];
            if (this.pickupPoints[index].name == 'Pickup Point 1') {
              this.pickupPoints[0].lngLat = [lngLat.lng, lngLat.lat];
              this.locationService.setPickUpPoints1(this.pickupPoints[0]);
            }
            if (this.pickupPoints[index].name == 'Pickup Point 2') {
              this.pickupPoints[1].lngLat = [lngLat.lng, lngLat.lat];
              this.locationService.setPickUpPoints2(this.pickupPoints[1]);
            }
            if (this.pickupPoints[index].name == 'Pickup Point 3') {
              this.pickupPoints[2].lngLat = [lngLat.lng, lngLat.lat];
              this.locationService.setPickUpPoints3(this.pickupPoints[2]);
            }
          });
        } else {
          const marker = new mapboxgl.Marker(el, { draggable: false })
            .setLngLat(pickupPoint.lngLat)
            .addTo(this.map);
        }
      });
    });
  }
}
