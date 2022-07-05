import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { PlayerLogoutEvent } from "./player.event.model";

@Injectable({
    providedIn: 'root'
  })
  export class PlayerEvents {
    
    constructor() { }

    private playerLogoutSubject: Subject<PlayerLogoutEvent> = new Subject<PlayerLogoutEvent>();

    get playerLogoutEvents() { return this.playerLogoutSubject.asObservable(); }
    set playerLogoutData(event: PlayerLogoutEvent) { this.playerLogoutSubject.next(event); }
}