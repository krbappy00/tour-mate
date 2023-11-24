import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private startLocationSubject: Subject<any> = new Subject<any>();
  private endLocationSubject: Subject<any> = new Subject<any>();
  private onFocus: Subject<any> = new Subject<any>();
  private onMapLoad: Subject<any> = new Subject<any>();
  private pickUpPoints1: Subject<any> = new Subject<any>();
  private pickUpPoints2: Subject<any> = new Subject<any>();
  private pickUpPoints3: Subject<any> = new Subject<any>();

  setMapLoad(e: any) {
    this.onMapLoad.next(e);
  }
  getMapLoad() {
    return this.onMapLoad.asObservable();
  }
  setStartLocation(location: any) {
    this.startLocationSubject.next(location);
  }
  setOnFocus(field: any) {
    this.onFocus.next(field);
  }
  getOnFocus() {
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
  setPickUpPoints1(points: any) {
    localStorage.removeItem('pickUpPoints1');
    localStorage.setItem('pickUpPoints1', JSON.stringify(points));
    this.pickUpPoints1.next(points);
  }
  getPickUpPoints1() {
    return this.pickUpPoints1.asObservable();
  }
  setPickUpPoints2(points: any) {
    localStorage.removeItem('pickUpPoints2');
    localStorage.setItem('pickUpPoints2', JSON.stringify(points));
    console.log('from 2 service', points);

    this.pickUpPoints2.next(points);
  }
  getPickUpPoints2() {
    return this.pickUpPoints2.asObservable();
  }
  setPickUpPoints3(points: any) {
    localStorage.removeItem('pickUpPoints3');
    localStorage.setItem('pickUpPoints3', JSON.stringify(points));
    console.log('from 1 service', points);

    this.pickUpPoints3.next(points);
  }
  getPickUpPoints3() {
    return this.pickUpPoints3.asObservable();
  }
}
