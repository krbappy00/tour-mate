import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user/user.service';
import { AuthService } from '../service/auth.service';
import { IUser } from '../interface/userInterface';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  constructor(public userService:UserService | null,public authService:AuthService,private http:HttpClient){}
  ngOnInit(): void {

    }


  user:IUser = {
    _id:'',
    name: '',
    email: '',
    phone:0,
    password: '',
    profile_pic_url: ''
  }
  cloud_name:string = "drsbymkpw";
  preset_key:string = "image_upload";
  baseUrl = 'http://localhost:5000/api/v1/user/update-profilePicture'
    handleImage (event:any){

    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', this.preset_key);
     this.http.post(`https://api.cloudinary.com/v1_1/${this.cloud_name}/image/upload`, formData).subscribe((data:any)=>{
      const userJson = localStorage.getItem('user')
      if(userJson){
        const userObj =JSON.parse(userJson)
        this.http.patch(this.baseUrl,{url:data.url,userId:userObj._id}).subscribe((data:any)=>{
          console.log(data)
          this.userService?.setUser(data.data)
          this.user.profile_pic_url = data.data.profile_pic_url;
        })
      }

    })

  }


}
