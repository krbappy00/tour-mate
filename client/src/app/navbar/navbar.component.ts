import { UserService } from './../service/user/user.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { IUser } from '../interface/userInterface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  currentUser:IUser | null = null;
  constructor(public authService:AuthService, public userService:UserService,private router:Router){}
  isMenuopend:boolean = false;
  checkUser():boolean{
    if(this.authService.isLoggedIn()){
      return true;
    }
    return false;
  }
  toggleMenu(){
    if(this.authService.isLoggedIn()){
      this.router.navigate(['/profile']);
      this.isMenuopend = false;
    }
    else{
      this.isMenuopend = !this.isMenuopend;
    }

  }
  logOut(){
    this.userService.removeUser()
    this.authService.logout()
  }
  ngOnInit(): void {
    this.currentUser = this.userService.getUser()
  }

}
