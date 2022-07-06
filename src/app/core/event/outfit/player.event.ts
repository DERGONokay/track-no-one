import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Outfit } from "../../player/player.model";

@Injectable({
    providedIn: 'root'
  })
  export class OutfitEvents {
    
    constructor() { }

    private outfitsTrackedSubject: Subject<Outfit[]> = new Subject<Outfit[]>();

    get outfitsTracked() { return this.outfitsTrackedSubject.asObservable(); }
    set outfitsTrackedData(event: Outfit[]) { this.outfitsTrackedSubject.next(event); }
}