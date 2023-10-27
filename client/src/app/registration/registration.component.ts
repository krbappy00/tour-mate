import { UserService } from './../service/user/user.service';
import { AuthService } from './../service/auth.service';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { IUser } from '../interface/userInterface';



@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  baseUrl = 'http://localhost:5000/api/v1/user/register-user'
  formData:IUser = {
    _id:'',
    name:'',
    email:'',
    phone:0,
    password:'',
  }

  constructor(private http:HttpClient,private authService:AuthService,private userService:UserService){}
  onSubmit(){
     this.http.post(this.baseUrl, this.formData)
      .subscribe({
        next:(data:any)=>{
          this.authService.setToken(data.token)
          this.userService.setUser(data.data)
        },
        error:(error)=>{
          console.log(error)
        }
      });

  }


}
