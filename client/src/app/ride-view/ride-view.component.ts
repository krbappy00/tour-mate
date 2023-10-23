import { Component, OnInit } from '@angular/core';
import { RideDataService } from '../service/ride/ride-data.service';

@Component({
  selector: 'app-ride-view',
  templateUrl: './ride-view.component.html',
  styleUrls: ['./ride-view.component.css']
})
export class RideViewComponent implements OnInit {
  constructor(private rideService:RideDataService) { }
  searchRideData:any[] = []
  serachRideStartEndName = {}
  range(n: number): number[] {
    return [...Array(n).keys()];
  }
  ngOnInit(): void {
    this.rideService.getRideData().subscribe(data => {
      if(data){
        localStorage.removeItem('rideData')
        localStorage.setItem('rideData',JSON.stringify(data.data))

      }
    })
    const rideData:any | null = (localStorage.getItem('rideData'))
    this.searchRideData = JSON.parse(rideData);

    this.rideService.getRideSearch().subscribe(data=>{
      this.serachRideStartEndName = data;
      console.log(data)
    })
  }

}
