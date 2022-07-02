import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MotionSpotEvent, QSpotEvent, ScoutRadarSpotEvent } from './scout.events.model';

@Injectable({
  providedIn: 'root'
})
export class ScoutEvents {
  
  constructor() { }

  private qSpotSubject: Subject<QSpotEvent> = new Subject<QSpotEvent>();
  private motionSpotSubject: Subject<MotionSpotEvent> = new Subject<MotionSpotEvent>();
  private scoutRadarSpotSubject: Subject<ScoutRadarSpotEvent> = new Subject<ScoutRadarSpotEvent>();
  
  get qSpotEvents() { return this.qSpotSubject.asObservable(); }
  set qSpotEventData(event: QSpotEvent) { this.qSpotSubject.next(event); }

  get motionSpotEvents() { return this.motionSpotSubject.asObservable(); }
  set motionSpotData(event: MotionSpotEvent) { this.motionSpotSubject.next(event); }

  get scoutRadarSpotEvents() { return this.scoutRadarSpotSubject.asObservable(); }
  set scoutRadarSpotData(event: ScoutRadarSpotEvent) { this.scoutRadarSpotSubject.next(event); }
}
