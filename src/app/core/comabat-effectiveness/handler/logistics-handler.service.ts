import { Injectable } from '@angular/core';
import { BeaconKillEvent, RouterKillEvent, SpawnEvent, SquadSpawnEvent, TransportAssistEvent } from '../../event/event.model';
import { CombatEffectivenessService } from '../combat-efectiveness.service';
import { PlayerCombatEffectiveness } from '../combat-effectiveness.model';

@Injectable({
  providedIn: 'root'
})
export class LogisticsHandler {

  private trackedPlayers: PlayerCombatEffectiveness[] = []

  constructor(private combatEffectivenessService: CombatEffectivenessService) {
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
          player.logisticsStats.spawns += 1;
          break;
        case "squadSpawn":
          player.logisticsStats.squadSpanws += 1;
          break;
        case "transportAssist":
          player.logisticsStats.transportAssits += 1;
          break;
        case "beaconKill":
          player.logisticsStats.beaconKills += 1;
          break;
        case "routerKill":
          player.logisticsStats.routerKills += 1;
          break;
      }
      
      this.updateSessionLenght(player);
      this.updateCombatEffectiveness(player);
    }
  }

  private updateSessionLenght(playerComef: PlayerCombatEffectiveness) {
    playerComef.sessionLenghtInSeconds = this.calculateSessionLenght(playerComef);
  }

  private calculateSessionLenght(playerComef: PlayerCombatEffectiveness): number {
    return Math.floor((Date.now() - playerComef.sessionStart) / 1000);
  }

  private updateCombatEffectiveness(player: PlayerCombatEffectiveness) {
    player.combatEffectiveness = this.combatEffectivenessService.calculateCombatEffectiveness(player);
    this.combatEffectivenessService.playersCombatEffectivesData = this.trackedPlayers;
  }
}