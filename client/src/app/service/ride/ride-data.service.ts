import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RideDataService {

  constructor() { }
  private rideDataSubject = new BehaviorSubject<any>(null);
  private rideSearchSubject = new BehaviorSubject<any>(null);

  setRideData(e:any) {
    console.log("from ride service",e)
    this.rideDataSubject.next(e);
  }
  getRideData(){
    return this.rideDataSubject.asObservable();
  }
  setRideSearch(e:any) {
    this.rideSearchSubject.next(e);
  }
  getRideSearch(){
    return this.rideSearchSubject.asObservable();
  }

}
