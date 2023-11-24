import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private messageSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public message$: Observable<any> = this.messageSubject.asObservable();
  constructor() {
    // Initialize the BehaviorSubject with user data from localStorage if available
    const messageData = this.getMessage();
    if (messageData) {
      this.messageSubject.next(messageData);
    }
  }
  setMessage(message: any) {
    const userSerialized = JSON.stringify(message);
    localStorage.removeItem('message');
    localStorage.setItem('message', userSerialized);
    this.messageSubject.next(message);
  }

  getMessage(): any {
    const localStorageData = localStorage.getItem('message');
    if (localStorageData) {
      try {
        const parsedData: any = JSON.parse(localStorageData);
        return parsedData;
      } catch (error) {
        console.error('Error parsing user data from local storage', error);
      }
    }
    return null;
  }
}
