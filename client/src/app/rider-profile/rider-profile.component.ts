import { Subject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IUser } from '../interface/userInterface';
import { UserService } from '../service/user/user.service';

@Component({
  selector: 'app-rider-profile',
  templateUrl: './rider-profile.component.html',
  styleUrls: ['./rider-profile.component.css'],
})
export class RiderProfileComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private user: UserService
  ) {}
  id: string = '';
<<<<<<< Updated upstream
  url: string = 'http://localhost:5000/api/v1/user/get-user';
=======
  url: string = 'https://tour-mate-at6p.onrender.com/api/v1/user/get-user';
>>>>>>> Stashed changes
  riderProfileData: any;
  isLoading = false;
  totalRide = 0;
  currentUser: any;
  showModal = false;
  message = '';
  ngOnInit(): void {
    this.isLoading = true;
    this.route.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.id = id;
      }
    });
    const params = new HttpParams().set('userId', this.id);
    this.http.get(this.url, { params }).subscribe((data: any) => {
      this.riderProfileData = data.data;
      this.totalRide = data.totalRide;
      this.isLoading = false;
    });
    this.currentUser = this.user.getUser();
  }
  onSend() {
    console.log(this.message);
    this.http
      .post('http://localhost:5000/api/v1/user/send-message', {

        senderId: this.currentUser._id,
        senderName: this.currentUser.name,
        recevierId: this.id,
        message: this.message,
      })
      .subscribe((data: any) => {
        console.log('onSend', data);
        this.showModal = false;
      });
  }
  sendMessage() {
    this.showModal = true;
  }
  toggleModal() {
    this.showModal = !this.showModal;
  }
}
