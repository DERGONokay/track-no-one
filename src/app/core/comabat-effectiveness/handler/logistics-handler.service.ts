import { Injectable } from '@angular/core';
import { DescriptionService } from '../../event/description.service';
import { BeaconKillEvent, RouterKillEvent, SpawnEvent, SquadSpawnEvent, TransportAssistEvent } from '../../event/event.model';
import { CombatEffectivenessService } from '../combat-efectiveness.service';
import { PlayerCombatEffectiveness } from '../combat-effectiveness.model';

@Injectable({
  providedIn: 'root'
})
export class LogisticsHandler {

  private trackedPlayers: PlayerCombatEffectiveness[] = []

  constructor(
    private combatEffectivenessService: CombatEffectivenessService,
    private descriptions: DescriptionService
    ) {
    combatEffectivenessService.playersCombatEffectivenessObservable.subscribe(
      playersComefs => {
        this.trackedPlayers = playersComefs
      }
    )
  }

  handle(event: SpawnEvent | SquadSpawnEvent | TransportAssistEvent | BeaconKillEvent | RouterKillEvent) {
    const player = this.trackedPlayers.find(d => d.id == event.playerId);
    
    if(player) {
      switch (event.type) {
        case "spawn":
          this.descriptions.eventDescriptionData = `${player.name} helped an ally to spawn`
          player.logisticsStats.spawns += 1;
          break;
        case "squadSpawn":
          this.descriptions.eventDescriptionData = `${player.name} helped an squad mate to spawn`
          player.logisticsStats.squadSpanws += 1;
          break;
        case "transportAssist":
          this.descriptions.eventDescriptionData = `${player.name} got a transport assist`
          player.logisticsStats.transportAssits += 1;
          break;
        case "beaconKill":
          this.descriptions.eventDescriptionData = `${player.name} killed an enemy beacon`
          player.logisticsStats.beaconKills += 1;
          break;
        case "routerKill":
          this.descriptions.eventDescriptionData = `${player.name} killed an enemy router`
          player.logisticsStats.routerKills += 1;
          break;
      }
      this.combatEffectivenessService.updateCombatEffectiveness(player)
    }
  }

}
