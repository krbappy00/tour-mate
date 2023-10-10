import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { UserService } from '../service/user/user.service';
export interface FormData {
  email:string
  password:string
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  baseUrl = 'http://localhost:5000/api/v1/user/login'
  formData:FormData = {
    email:'',
    password:'',
  }
  constructor(private http:HttpClient,private authService:AuthService,private userService:UserService){}
  onLogin(){
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