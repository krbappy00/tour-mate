import { AuthGuard } from './../authGuard/authGuard';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { UserService } from '../service/user/user.service';
import { Router } from '@angular/router';
import { SwPush } from '@angular/service-worker';
export interface FormData {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  baseUrl = 'https://tour-mate-at6p.onrender.com/api/v1/user/login';

  private readonly public_key =
    'BFSlTgd4jZQCf71quwfwrrjcsEGLAwJMVuaXEnIAJ4HLfkb1EEcSVDjWdUA-QUpVbX7TIq-UH6Ryob__vB5flJI';
  formData: any = {
    email: '',
    password: '',
    endpoint: '',
    p256dh: '',
    auth: '',
  };
  isLoading = false;
  constructor(
    private swPush: SwPush,
    private http: HttpClient,
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}
  async onLogin() {
    this.isLoading = true;
    console.log('hit');
    if (!this.swPush.isEnabled) {
      this.http.post(this.baseUrl, this.formData).subscribe({
        next: (data: any) => {
          this.authService.setToken(data.token);
          this.userService.setUser(data.data);
          if (data.status === 'success') {
            this.isLoading = false;
            this.router.navigate(['']);
          }
        },
        error: (error) => {
          console.log(error);
        },
      });
    } else {
      try {
        await this.swPush
          .requestSubscription({
            serverPublicKey: this.public_key,
          })
          .then((sub: any) => {
            const stringify = JSON.stringify(sub);
            const parseRes = JSON.parse(stringify);
            console.log(
              'singel',
              parseRes.keys.auth,
              parseRes.keys.p256dh,
              parseRes.endpoint
            );
            this.formData.endpoint = parseRes.endpoint;
            this.formData.auth = parseRes.keys.auth;
            this.formData.p256dh = parseRes.keys.p256dh;
          });
        this.http.post(this.baseUrl, this.formData).subscribe({
          next: (data: any) => {
            this.authService.setToken(data.token);
            this.userService.setUser(data.data);
            if (data.status === 'success') {
              this.isLoading = false;
              this.router.navigate(['']);
            }
          },
          error: (error) => {
            console.log(error);
          },
        });
      } catch (err) {
        console.log(err);
      }
    }
  }
}
