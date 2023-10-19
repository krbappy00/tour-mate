import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoordinatesService {

  constructor() { }
  private startLocationCoordinates: Subject<any> = new Subject<any>();
  private endLocationCoordinates: Subject<any> = new Subject<any>();
  setStart(c:any){
    this.startLocationCoordinates.next(c)
  }
  setEnd(c:any){
    this.endLocationCoordinates.next(c)
  }
  getStart(){
    return this.startLocationCoordinates.asObservable()
  }
  getEnd(){
    return this.endLocationCoordinates.asObservable()
  }
}
