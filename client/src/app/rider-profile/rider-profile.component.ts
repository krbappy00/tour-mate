import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IUser } from '../interface/userInterface';

@Component({
  selector: 'app-rider-profile',
  templateUrl: './rider-profile.component.html',
  styleUrls: ['./rider-profile.component.css'],
})
export class RiderProfileComponent implements OnInit {
  constructor(private route: ActivatedRoute, private http: HttpClient) {}
  id: string = '';
  url: string = 'http://localhost:5000/api/v1/user/get-user';
  riderProfileData: any;
  isLoading = false;
  totalRide = 0;
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
      console.log(data);
      this.riderProfileData = data.data;
      this.totalRide = data.totalRide;
      this.isLoading = false;
    });
  }
}
