import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { PlayerLoginEvent, PlayerLogoutEvent } from "./player.event.model";

@Injectable({
    providedIn: 'root'
  })
  export class PlayerEvents {
    
    constructor() { }

    private playerLogoutSubject: Subject<PlayerLogoutEvent> = new Subject<PlayerLogoutEvent>();
    private playerLoginSubject: Subject<PlayerLoginEvent> = new Subject<PlayerLoginEvent>();

    get playerLogoutEvents() { return this.playerLogoutSubject.asObservable(); }
    set playerLogoutData(event: PlayerLogoutEvent) { this.playerLogoutSubject.next(event); }

    get playerLoginEvents() { return this.playerLoginSubject.asObservable(); }
    set playerLoginData(event: PlayerLoginEvent) { this.playerLoginSubject.next(event); }
}