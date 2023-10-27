import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUser } from 'src/app/interface/userInterface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject: BehaviorSubject<IUser | null> = new BehaviorSubject<IUser | null>(null);
  public user$: Observable<IUser | null> = this.userSubject.asObservable();
  constructor() {
    // Initialize the BehaviorSubject with user data from localStorage if available
    const userData = this.getUser();
    if (userData) {
      this.userSubject.next(userData);
    }
  }

  setUser(user: IUser) {
    const userSerialized = JSON.stringify(user)
    localStorage.removeItem('user')
    localStorage.setItem('user',userSerialized);
    this.userSubject.next(user);

  }

  getUser(): IUser | null {
    const localStorageData = localStorage.getItem('user');
    if (localStorageData) {
      try {
        const parsedData: IUser = JSON.parse(localStorageData);
        return parsedData;
      } catch (error) {
        console.error('Error parsing user data from local storage', error);
      }
    }
    return null;
  }

  removeUser():void{
    this.userSubject.next(null)
    localStorage.removeItem('user');
  }
}
