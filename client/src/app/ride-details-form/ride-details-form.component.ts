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
  minDate: string;
  // RIDE FORM INPUT
  date= new Date();
  time= this.date.getHours() + ":" + this.date.getMinutes()
  seat =0;
  price=0;
  allowPet=false
  allowSmoking=false
  allowAlcohol=false



  constructor(private locationService:LocationService){
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
  }

  ngOnInit() {
    this.locationService.setMapLoad(true)
  }
  onSubmit(){
    console.log(this.date, this.time, this.seat, this.price, this.allowPet, this.allowSmoking, this.allowAlcohol)
  }

}
