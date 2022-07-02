import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { GeneratorOverloadEvent, GeneratorStabilizeEvent, MotionSensorDestroyEvent, MotionSpotEvent, QSpotEvent, ScoutRadarSpotEvent, SpitfireDestroyEvent, TerminalHackEvent, TurretHackEvent } from './scout.event.model';

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
  private terminalHackSubject: Subject<TerminalHackEvent> = new Subject<TerminalHackEvent>();
  private turretHackSubject: Subject<TurretHackEvent> = new Subject<TurretHackEvent>();
  private motionSensorDestroySubject: Subject<MotionSensorDestroyEvent> = new Subject<MotionSensorDestroyEvent>();
  private spitfireDestroySubject: Subject<SpitfireDestroyEvent> = new Subject<SpitfireDestroyEvent>();
  
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

  get terminalHackEvents() { return this.terminalHackSubject.asObservable(); }
  set terminalHackData(event: TerminalHackEvent) { this.terminalHackSubject.next(event); }
  
  get turretHackEvents() { return this.turretHackSubject.asObservable(); }
  set turretHackData(event: TurretHackEvent) { this.turretHackSubject.next(event); }
  
  get motionSensorKillEvents() { return this.motionSensorDestroySubject.asObservable(); }
  set motionSensorKillData(event: MotionSensorDestroyEvent) { this.motionSensorDestroySubject.next(event); }
  
  get spitfireDestroyEvents() { return this.spitfireDestroySubject.asObservable(); }
  set spitfireDestroyData(event: SpitfireDestroyEvent) { this.spitfireDestroySubject.next(event); }
}
