import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AssistEvent, KillEvent, ReviveEvent } from './event.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private killSubject: Subject<KillEvent> = new Subject<KillEvent>()
  private assistSubject: Subject<AssistEvent> = new Subject<AssistEvent>()
  private reviveSubject: Subject<ReviveEvent> = new Subject<ReviveEvent>()

  constructor() { }

  get killEventObservable() { return this.killSubject.asObservable() }
  set killEventData(event: KillEvent) { this.killSubject.next(event) }

  get assistEventObservable() { return this.assistSubject.asObservable() }
  set assistEventData(event: AssistEvent) { this.assistSubject.next(event) }

  get reviveEvents() { return this.reviveSubject.asObservable() }
  set reviveEventsData(event: ReviveEvent) { this.reviveSubject.next(event) } 

}
