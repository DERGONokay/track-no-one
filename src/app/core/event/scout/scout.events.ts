import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MotionSpotEvent, QSpotEvent } from './scout.events.model';

@Injectable({
  providedIn: 'root'
})
export class ScoutEvents {
  
  constructor() { }

  private qSpotSubject: Subject<QSpotEvent> = new Subject<QSpotEvent>();
  private motionSpotSubject: Subject<MotionSpotEvent> = new Subject<MotionSpotEvent>();
  
  get qSpotEvents() { return this.qSpotSubject.asObservable(); }
  set qSpotEventData(event: QSpotEvent) { this.qSpotSubject.next(event); }

  get motionSpotEvents() { return this.motionSpotSubject.asObservable(); }
  set motionSpotData(event: MotionSpotEvent) { this.motionSpotSubject.next(event); }
}
