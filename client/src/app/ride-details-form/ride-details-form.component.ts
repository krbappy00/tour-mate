import { LocationService } from './../service/location/location.service';
import { Component, Input, OnInit } from '@angular/core';
import { NavigationComponent } from '../navigation/navigation.component';
import { CoordinatesService } from '../service/coordinates.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ride-details-form',
  templateUrl: './ride-details-form.component.html',
  styleUrls: ['./ride-details-form.component.css']
})
export class RideDetailsFormComponent implements OnInit {
  @Input() startCoordinates!: [number, number] ;
  @Input() endCoordinates!: [number, number] ;
  showMap = false;
  constructor(private locationService:LocationService){
  }

  ngOnInit() {
    this.locationService.setMapLoad(true)
  }
  showMapon(){
    this.showMap =true;

  }

}
