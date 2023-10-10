import { Component } from '@angular/core';
import { UserService } from '../service/user/user.service';
import { AuthService } from '../service/auth.service';
import { IUser } from '../interface/userInterface';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  constructor(public userService:UserService,public authService:AuthService){}
  user:IUser = {
    name: '',
    email: '',
    phone: undefined,
    password: ''
  }


}
