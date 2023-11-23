import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user/user.service';
import { MessageService } from '../service/message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
})
export class MessageComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private user: UserService,
    private message: MessageService
  ) {}
  messages: any;
  currentUser: any = this.user.getUser();
  showMessage: any;
  ngOnInit(): void {
    if (this.currentUser) {
      const params = new HttpParams().set('userId', this.currentUser._id);
      this.http
<<<<<<< Updated upstream
        .get('http://localhost:5000/api/v1/user/get-all-messages', {
          params,
        })
=======
        .get(
          'https://tour-mate-at6p.onrender.com/api/v1/user/get-all-messages',
          {
            params,
          }
        )
>>>>>>> Stashed changes
        .subscribe((data: any) => {
          this.message.setMessage(data.data);
          this.messages = this.message.getMessage();
          console.log(this.messages);
          if (this.messages) {
            this.showMessage = this.messages.filter(
              (m: any) => m?.senderName === 'Own message'
            );
          }
          console.log(this.showMessage);
        });
    }
  }

  onClick(id: any) {
    console.log(id);
    this.showMessage = this.messages.find((m: any) => m.senderId === id);
  }
}
