import { LocationService } from './../service/location/location.service';
import { Component, Input, OnInit } from '@angular/core';
import { NavigationComponent } from '../navigation/navigation.component';
import { CoordinatesService } from '../service/coordinates.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { timestamp } from 'rxjs';

@Component({
  selector: 'app-ride-details-form',
  templateUrl: './ride-details-form.component.html',
  styleUrls: ['./ride-details-form.component.css']
})
export class RideDetailsFormComponent implements OnInit {

  [x: string]: any;
  @Input() startCoordinates!: [number, number] ;
  @Input() endCoordinates!: [number, number] ;
  minDate: string;
  date= new Date()
  baseUrl = 'http://localhost:5000/api/v1/ride/register-ride'
  // RIDE FORM INPUT
  rideData: any = {
    userId: '',
    date: new Date(),
    time: '',
    seat :0,
    price:0,
    allowPet:false,
    allowSmoking:false,
    allowAlcohol:false,
    startCoordinates: {
      type: 'Point',
      coordinates: this.startCoordinates
    },
    endCoordinates: {
      type: 'Point',
      coordinates: this.endCoordinates
    },
    startPlaceName:'',
    endPlaceName:''
  }

  constructor(private locationService:LocationService,private http:HttpClient,private router:Router) {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
  }

  ngOnInit() {
    this.locationService.setMapLoad(true)
    this.locationService.getStartLocation().subscribe((data: any) => {
      this.rideData.startPlaceName = data.placeName
      this.rideData.startCoordinates = data.coordinates
    })
    this.locationService.getEndLocation().subscribe((data: any) => {
      this.rideData.endPlaceName = data.placeName
      this.rideData.endCoordinates = data.coordinates
    })
  }
  onSubmit(){
    const startPlaceName = localStorage.getItem('startPlaceName')
    const endPlaceName = localStorage.getItem('endPlaceName')
    const startCoordinates = localStorage.getItem('startCoordinates')
    const endCoordinates = localStorage.getItem('endCoordinates')
    const user = localStorage.getItem('user')
    if(startPlaceName && endPlaceName && startCoordinates && endCoordinates && user){
      this.rideData.startPlaceName = JSON.parse(startPlaceName)
      this.rideData.endPlaceName = JSON.parse(endPlaceName)
      this.rideData.startCoordinates.coordinates = JSON.parse(startCoordinates)
      this.rideData.endCoordinates.coordinates = JSON.parse(endCoordinates)
      const userObj= JSON.parse(user)
      this.rideData.userId = userObj._id

    }
    console.log(this.rideData)
    this.http.post(this.baseUrl, this.rideData)
      .subscribe({
        next:(data:any)=>{
          console.log(data)
        },
        error:(error: any)=>{
          console.log(error)
        }
      });
  }


}
