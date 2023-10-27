import { Component, OnInit } from '@angular/core';
import { RideDataService } from '../service/ride/ride-data.service';
import { IUser } from '../interface/userInterface';
import { UserService } from '../service/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ride-view',
  templateUrl: './ride-view.component.html',
  styleUrls: ['./ride-view.component.css']
})
export class RideViewComponent implements OnInit {
  constructor(private rideService:RideDataService,private router:Router) { }

  searchRideData:any[] = []
  serachRideStartEndName:any = {}
  isLoading = false;
  range(n: number): number[] {
    return [...Array(n).keys()];
  }
  ngOnInit(): void {
    this.isLoading = true
    this.rideService.getRideData().subscribe(data => {
      if(data){
        this.searchRideData = data.data;
        this.isLoading=false;
      }
    })
    this.rideService.getRideSearch().subscribe(data=>{
      this.serachRideStartEndName = data;
    })
  }
  navigateToCardView(rideData: any) {
    rideData.searchSeatQuantity = this.serachRideStartEndName.seat;
    const data = JSON.stringify(rideData);
    this.router.navigate(['/rideDetailsView', rideData._id, data]);
  }

}
