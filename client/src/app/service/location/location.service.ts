import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private startLocationSubject: Subject<any> = new Subject<any>();
  private endLocationSubject: Subject<any> = new Subject<any>();
  private onFocus: Subject<any> = new Subject<any>();
  private onMapLoad: Subject<any> = new Subject<any>();

  setMapLoad(e:any) {
    this.onMapLoad.next(e);
  }
  getMapLoad(){
    return this.onMapLoad.asObservable();
  }
  setStartLocation(location: any) {
    this.startLocationSubject.next(location);
  }
  setOnFocus(field: any) {
    this.onFocus.next(field);
  }
  getOnFocus(){
    return this.onFocus.asObservable();
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
