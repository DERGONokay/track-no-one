import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { GeneratorOverloadEvent, GeneratorStabilizeEvent, MotionSpotEvent, QSpotEvent, ScoutRadarSpotEvent } from './scout.events.model';

@Injectable({
  providedIn: 'root'
})
export class ScoutEvents {
  
  constructor() { }

  private qSpotSubject: Subject<QSpotEvent> = new Subject<QSpotEvent>();
  private motionSpotSubject: Subject<MotionSpotEvent> = new Subject<MotionSpotEvent>();
  private scoutRadarSpotSubject: Subject<ScoutRadarSpotEvent> = new Subject<ScoutRadarSpotEvent>();
  private generatorOverloadSubject: Subject<GeneratorOverloadEvent> = new Subject<GeneratorOverloadEvent>();
  private generatorStabilizeSubject: Subject<GeneratorStabilizeEvent> = new Subject<GeneratorStabilizeEvent>();  
  
  get qSpotEvents() { return this.qSpotSubject.asObservable(); }
  set qSpotEventData(event: QSpotEvent) { this.qSpotSubject.next(event); }

  get motionSpotEvents() { return this.motionSpotSubject.asObservable(); }
  set motionSpotData(event: MotionSpotEvent) { this.motionSpotSubject.next(event); }

  get scoutRadarSpotEvents() { return this.scoutRadarSpotSubject.asObservable(); }
  set scoutRadarSpotData(event: ScoutRadarSpotEvent) { this.scoutRadarSpotSubject.next(event); }

  get generatorOverloadEvents() { return this.generatorOverloadSubject.asObservable(); }
  set generatorOverloadData(event: GeneratorOverloadEvent) { this.generatorOverloadSubject.next(event); }

  get generatorStabilizeEvents() { return this.generatorStabilizeSubject.asObservable(); }
  set generatorStabilizeData(event: GeneratorStabilizeEvent) { this.generatorStabilizeSubject.next(event); }
}
