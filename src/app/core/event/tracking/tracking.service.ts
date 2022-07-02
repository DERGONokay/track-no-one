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
    console.log("Connecting to player events")
    this.subject.subscribe(
      msg => {
        if(this.isPlayerEvent(msg)) {
          this.eventAdapter.adapt(msg)
        }
      }
    )
  }

  disconnect() {
    console.log("Disconecting from player events")
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
        CensusEvents.BEACON_KILL, CensusEvents.ROUTER_KILL,
        CensusEvents.Q_SPOT, CensusEvents.SQUAD_Q_SPOT,
        CensusEvents.MOTION_SPOTTER, CensusEvents.SQUAD_MOTION_SPOTTER,
        CensusEvents.SCOUT_RADAR, CensusEvents.SQUAD_SCOUT_RADAR,
        CensusEvents.GENERATOR_OVERLOADED, CensusEvents.GENERATOR_SABILIZED,
        CensusEvents.TERMINAL_HACK, CensusEvents.TURRET_HACK, 
        CensusEvents.MOTION_SPOTTER_KILL, CensusEvents.SPITFIRE_KILL,
        CensusEvents.TERMINAL_RAPIAR, CensusEvents.GENERATOR_REPAIR,
        CensusEvents.INFANTRY_RESUPPLY, CensusEvents.SQUAD_INFANTRY_RESUPPLY,
        CensusEvents.VEHICLE_RESUPPLY, CensusEvents.SQUAD_VEHICLE_RESUPPLY,
        CensusEvents.MAX_REPAIR, CensusEvents.SQUAD_MAX_REPAIR,
        CensusEvents.MANA_TURRET_REPAIR, CensusEvents.SQUAD_MANA_TURRET_REPAIR,
        CensusEvents.HARLIGHT_BARRIER_REPAIR, CensusEvents.SQUAD_HARDLIGHT_BARRIER_REPAIR,
        CensusEvents.SPITFIRE_REPAIR, CensusEvents.SQUAD_SPITFIRE_REPAIR,
        CensusEvents.SUNDERER_REPAIR,  CensusEvents.SQUAD_SUNDERER_REPAIR,
        CensusEvents.ANT_REPAIR, CensusEvents.SQUAD_ANT_REPAIR,
        CensusEvents.LIGHTING_REPAIR, CensusEvents.SQUAD_LIGHTING_REPAIR,
        CensusEvents.VANGUAR_REPAIR, CensusEvents.SQUAD_VANGUAR_REPAIR,
        CensusEvents.PROWLER_REPAIR, CensusEvents.SQUAD_PROWLER_REPAIR,
        CensusEvents.MAGRIDER_REPAIR, CensusEvents.SQUAD_MAGRIDER_REPAIR,
        CensusEvents.FLASH_REPAIR, CensusEvents.SQUAD_FLASH_REPAIR,
        CensusEvents.JAVELIN_REPAIR, CensusEvents.SQUAD_JAVELIN_REPAIR,
        CensusEvents.HARRASER_REPAIR, CensusEvents.SQUAD_HARRASER_REPAIR,
        CensusEvents.REAVER_REPAIR, CensusEvents.SQUAD_REAVER_REPAIR,
        CensusEvents.MOSQUITO_REPAIR, CensusEvents.SQUAD_MOSQUITO_REPAIR,
        CensusEvents.SCYTHE_REPAIR, CensusEvents.SQUAD_SCYTHE_REPAIR,
        CensusEvents.DERVISH_REPAIR, CensusEvents.SQUAD_DERVISH_REPAIR,
        CensusEvents.VALKYRIE_REPAIR, CensusEvents.SQUAD_VALKYRIE_REPAIR,
        CensusEvents.GALAXY_REPAIR, CensusEvents.SQUAD_GALAXY_REPAIR,
        CensusEvents.LIBERATOR_REPAIR, CensusEvents.SQUAD_LIBERATOR_REPAIR,
        CensusEvents.COLOSUS_REPAIR, CensusEvents.SQUAD_COLOSUS_REPAIR,
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
