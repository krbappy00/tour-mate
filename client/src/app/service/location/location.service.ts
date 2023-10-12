import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private startLocationSubject: Subject<any> = new Subject<any>();
  private endLocationSubject: Subject<any> = new Subject<any>();

  setStartLocation(location: any) {
    console.log("location from markerset",location)
    this.startLocationSubject.next(location);
    console.log(this.startLocationSubject)
  }

  setEndLocation(location: any) {
    this.endLocationSubject.next(location);
  }

  getStartLocation(): Observable<any> {
    return this.startLocationSubject.asObservable();
  }

  getEndLocation(): Observable<any> {
    return this.endLocationSubject.asObservable();
  }
}
