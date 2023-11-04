import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RideDataService {
  constructor() {}
  private rideDataSubject = new BehaviorSubject<any>(null);
  private rideSearchSubject = new BehaviorSubject<any>(null);

  setRideData(e: any) {
    this.rideDataSubject.next(e);
  }
  getRideData() {
    return this.rideDataSubject.asObservable();
  }
  setRideSearch(e: any) {
    // localStorage.removeItem('rideSearch')
    // localStorage.setItem('rideSearch', JSON.stringify(e));
    this.rideSearchSubject.next(e);
  }
  getRideSearch() {
    // const searchData = localStorage.getItem('rideSearch')
    // if(searchData){
    //   return JSON.parse(searchData)
    // }
    return this.rideSearchSubject.asObservable();
  }
}
