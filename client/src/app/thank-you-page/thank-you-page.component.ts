import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-thank-you-page',
  templateUrl: './thank-you-page.component.html',
  styleUrls: ['./thank-you-page.component.css'],
})
export class ThankYouPageComponent implements OnInit {
  constructor(private http: HttpClient) {}
  url = 'https://scarlet-bass-hose.cyclic.app/api/v1/ride/notification';

  ngOnInit(): void {
    this.http.get(this.url).subscribe((data) => {
      console.log(data);
    });
  }
}
