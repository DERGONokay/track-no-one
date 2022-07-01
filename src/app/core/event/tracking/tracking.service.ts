import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { environment } from 'src/environments/environment';
import { Player } from '../../player/player.model';
import { EventAdapterService } from '../event-adapter.service';
import { CensusAction, CensusEvent as CensusEvents, CensusService, MessageType } from './tracking.model';

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
        CensusEvents.DEATH, CensusEvents.ASSIST,
        CensusEvents.EXTREME_THREAT_KILL_ASSIST, CensusEvents.HIGH_THREAT_KILL_ASSIS,
        CensusEvents.REVIVE, CensusEvents.SQUAD_REVIVE,
        CensusEvents.HEAL, CensusEvents.SQUAD_HEAL, CensusEvents.HEAL_ASSIST,
        CensusEvents.SHIELD_REPAIR, CensusEvents.SQUAD_SHIELD_REPAIR,
        CensusEvents.FACILITY_CAPTURE, CensusEvents.FACILITY_DEFENSE,
        CensusEvents.POINT_CAPTURE, CensusEvents.POINT_DEFENSE,
        CensusEvents.SUNDERER_SPAWN, CensusEvents.LODESTAR_SPAWN,
        CensusEvents.SQUAD_SPAWN, CensusEvents.VALKYRIE_SPAWN, CensusEvents.GALAXY_SPAWN,
        CensusEvents.TRANSPORT_ASSIST,
        CensusEvents.BEACON_KILL, CensusEvents.ROUTER_KILL
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
