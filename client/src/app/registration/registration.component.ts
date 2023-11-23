import { UserService } from './../service/user/user.service';
import { AuthService } from './../service/auth.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { IUser } from '../interface/userInterface';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  baseUrl = 'http://localhost:5000/api/v1/user/register-user';

  formData: IUser = {
    name: '',
    email: '',
    phone: 0,
    password: '',
  };
  isLoading = false;
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router
  ) {}
  ngOnInit(): void {}
  onSubmit() {
    this.isLoading = true;
    this.http.post(this.baseUrl, this.formData).subscribe({
      next: (data: any) => {
        this.isLoading = false;
        this.authService.setToken(data.token);
        this.userService.setUser(data.data);
        console.log(data.data);
        this.showSuccess();
        this.router.navigate(['']);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  showSuccess() {
    this.toastr.success(`Wellcome ${this.formData.name}`);
  }
}
