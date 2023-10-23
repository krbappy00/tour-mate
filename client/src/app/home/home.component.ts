import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../service/user/user.service';
import { IUser } from '../interface/userInterface';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  bg:string = "../../assets/banner.svg"
  constructor(public userService:UserService){}

  ngOnInit(): void {

}
}
