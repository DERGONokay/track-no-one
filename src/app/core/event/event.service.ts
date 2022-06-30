import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AssistEvent, HealEvent, KillEvent, ReviveEvent, ShieldRepairEvent } from './event.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private killSubject: Subject<KillEvent> = new Subject<KillEvent>()
  private assistSubject: Subject<AssistEvent> = new Subject<AssistEvent>()
  private reviveSubject: Subject<ReviveEvent> = new Subject<ReviveEvent>()
  private healSubject: Subject<HealEvent> = new Subject<HealEvent>()
  private shieldRepairSubject: Subject<ShieldRepairEvent> = new Subject<ShieldRepairEvent>()

  constructor() { }

  get killEvents() { return this.killSubject.asObservable() }
  set killEventData(event: KillEvent) { this.killSubject.next(event) }

  get assistEvents() { return this.assistSubject.asObservable() }
  set assistEventData(event: AssistEvent) { this.assistSubject.next(event) }

  get reviveEvents() { return this.reviveSubject.asObservable() }
  set reviveEventData(event: ReviveEvent) { this.reviveSubject.next(event) }
  
  get healEvents() { return this.healSubject.asObservable() }
  set healEventData(event: HealEvent) { this.healSubject.next(event) } 

  get shieldRepairEvents() { return this.shieldRepairSubject.asObservable() }
  set shieldRepairData(event: ShieldRepairEvent) { this.shieldRepairSubject.next(event) } 
}
