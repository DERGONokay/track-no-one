import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { environment } from 'src/environments/environment';
import { Player } from '../../player/player.model';
import { EventAdapterService } from '../event-adapter.service';
import { CensusAction, CensusEvent, CensusService, MessageType } from './tracking.model';

@Injectable({
  providedIn: 'root'
})
export class TrackingService {

  private subject: WebSocketSubject<any>

  constructor(private eventAdapter: EventAdapterService) {
    this.subject = webSocket(environment.wssHost)
  }

  connect() {
    this.subject.subscribe(
      msg => {
        if(this.isPlayerEvent(msg)) {
          this.eventAdapter.adapt(msg)
        }
      }
    )
  }

  disconnect() {
    this.subject.complete()
  }

  startTracking(player: Player) {
    console.log("Start tracking player ID = " + player.id)
    this.subject.next({
      service: CensusService.EVENT,
      action: CensusAction.SUBSCRIBE,
      characters: [player.id],
      eventNames: [
        CensusEvent.DEATH, CensusEvent.ASSIST,
        CensusEvent.REVIVE, CensusEvent.SQUAD_REVIVE,
        CensusEvent.HIGH_THREAT_KILL_ASSIS, 
        CensusEvent.EXTREME_THREAT_KILL_ASSIST,
        CensusEvent.HEAL, CensusEvent.SQUAD_HEAL, CensusEvent.HEAL_ASSIST,
        CensusEvent.SHIELD_REPAIR, CensusEvent.SQUAD_SHIELD_REPAIR,
        CensusEvent.FACILITY_CAPTURE, CensusEvent.FACILITY_DEFENSE,
        CensusEvent.POINT_DEFENSE, CensusEvent.POINT_CAPTURE
      ]
    })
  }

  stopTracking(playerId: String) {
    console.log("Stop tracking player ID = " + playerId)
    this.subject.next({
      service: CensusService.EVENT, 
      action: CensusAction.UNSUBSCRIBE, 
      characters: [playerId]
    })
  }

  private isPlayerEvent(msg: any) {
    return msg.service == CensusService.EVENT && msg.type == MessageType.SERVICE_MESSAGE;
  }

}
