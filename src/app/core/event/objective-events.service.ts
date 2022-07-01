import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { FacilityCaptureEvent, FacilityDefenseEvent, PointCaptureEvent, PointDefenseEvent } from './event.model';

@Injectable({
  providedIn: 'root'
})
export class ObjectiveEventsService {
  
  constructor() { }

  private facilityCaptureSubject: Subject<FacilityCaptureEvent> = new Subject<FacilityCaptureEvent>()
  private facilityDefenseSubject: Subject<FacilityDefenseEvent> = new Subject<FacilityDefenseEvent>()
  private pointDefenseSubject: Subject<PointDefenseEvent> = new Subject<PointDefenseEvent>()
  private pointCaptureSubject: Subject<PointCaptureEvent> = new Subject<PointCaptureEvent>()
  
  get facilityCaptureEvents() { return this.facilityCaptureSubject.asObservable() }
  set facilityCaptureData(event: FacilityCaptureEvent) { this.facilityCaptureSubject.next(event) }
  
  get facilityDefenseEvents() { return this.facilityDefenseSubject.asObservable() }
  set facilityDefenseData(event: FacilityDefenseEvent) { this.facilityDefenseSubject.next(event) }
  
  get pointDefenseEvents() { return this.pointDefenseSubject.asObservable() }
  set pointDefenseData(event: PointDefenseEvent) { this.pointDefenseSubject.next(event) }
  
  get pointCaptureEvents() { return this.pointCaptureSubject.asObservable() }
  set pointCaptureData(event: PointCaptureEvent) { this.pointCaptureSubject.next(event) }
}
