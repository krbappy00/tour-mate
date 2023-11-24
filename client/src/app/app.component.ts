import { Component, OnInit } from '@angular/core';
import { SwPush } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private swPush: SwPush) {}
  private readonly public_key =
    'BFSlTgd4jZQCf71quwfwrrjcsEGLAwJMVuaXEnIAJ4HLfkb1EEcSVDjWdUA-QUpVbX7TIq-UH6Ryob__vB5flJI';
  ngOnInit(): void {
    // this.pushSubscription();
  }
  pushSubscription() {
    if (!this.swPush.isEnabled) {
      console.log('Notification is not enabled.');
      return;
    }
    this.swPush
      .requestSubscription({
        serverPublicKey: this.public_key,
      })
      .then((sub) => {
        console.log('without parse', sub);
        console.log(JSON.stringify(sub));
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
