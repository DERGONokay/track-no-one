import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BeaconKillEvent, RouterKillEvent, SpawnEvent, SquadSpawnEvent as SquadSpawnEvent, TransportAssistEvent } from './event.model';

@Injectable({
  providedIn: 'root'
})
export class LogisticsEvents {

  constructor() { }

  private spawnSubject: Subject<SpawnEvent> = new Subject<SpawnEvent>()
  private squadSpawnSubject: Subject<SquadSpawnEvent> = new Subject<SquadSpawnEvent>()
  private transportAssistSubject: Subject<TransportAssistEvent> = new Subject<TransportAssistEvent>()
  private beaconKillSubject: Subject<BeaconKillEvent> = new Subject<BeaconKillEvent>()
  private routerKillSubject: Subject<RouterKillEvent> = new Subject<RouterKillEvent>()

  get spawnEvents() { return this.spawnSubject.asObservable() }
  set spawnData(event: SpawnEvent) { this.spawnSubject.next(event) }

  get squadSpawnEvents() { return this.squadSpawnSubject.asObservable() }
  set squadSpawnData(event: SquadSpawnEvent) { this.squadSpawnSubject.next(event) }

  get transportAssistEvents() { return this.transportAssistSubject.asObservable() }
  set transportAssistData(event: TransportAssistEvent) { this.transportAssistSubject.next(event) }

  get beaconKillEvents() { return this.beaconKillSubject.asObservable() }
  set beaconKillData(event: BeaconKillEvent) { this.beaconKillSubject.next(event) }

  get routerKillEvents() { return this.routerKillSubject.asObservable() }
  set routerKillData(event: RouterKillEvent) { this.routerKillSubject.next(event) }
}
