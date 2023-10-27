import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from '../service/payment.service';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.css']
})
export class CardDetailsComponent implements OnInit {
  constructor(private route:ActivatedRoute,private router:Router,private payment:PaymentService) { }
  rideData: any;
  paymentHandler:any = null
  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.rideData = JSON.parse(params['data']);
    });
  }
  navigateToMap(){
    const start = JSON.stringify(this.rideData.startCoordinates.coordinates);
    const end = JSON.stringify(this.rideData.endCoordinates.coordinates)
    this.router.navigate(['/navigationForDetailsView',start,end]);
  }
  makePayment(){
    this.payment.makePayment(this.rideData.price * this.rideData.searchSeatQuantity,this.rideData).subscribe((data)=>{
      const url = data.data;
      window.location.href = url;
    })

  }

}
