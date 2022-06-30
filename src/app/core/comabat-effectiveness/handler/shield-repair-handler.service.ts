import { Injectable } from '@angular/core';
import { ShieldRepairEvent } from '../../event/event.model';
import { CombatEffectivenessService } from '../combat-efectiveness.service';
import { PlayerCombatEffectiveness } from '../combat-effectiveness.model';

@Injectable({
  providedIn: 'root'
})
export class ShieldRepairHandlerService {

  private trackedPlayers: PlayerCombatEffectiveness[] = []

  constructor(private combatEffectivenessService: CombatEffectivenessService) {
    combatEffectivenessService.playersCombatEffectivenessObservable.subscribe(
      playersComefs => {
        this.trackedPlayers = playersComefs
      }
    )
  }

  handle(event: ShieldRepairEvent) {
    const player = this.trackedPlayers.find(d => d.id == event.playerId);

    if (player) {
      console.log(player.name + " repaired a teammate personal shield")
      player.medicStats.shielding += 1;
      this.updateCombatEffectiveness(player)
    }
  }

  private updateCombatEffectiveness(player: PlayerCombatEffectiveness) {
    player.sessionLenghtInSeconds = this.calculateSessionLenght(player)
    player.combatEffectiveness = this.combatEffectivenessService.calculateCombatEffectiveness(player)
    this.combatEffectivenessService.playersCombatEffectivesData = this.trackedPlayers
  }

  private calculateSessionLenght(playerComef: PlayerCombatEffectiveness): number {
    return Math.floor((Date.now() - playerComef.sessionStart) / 1000);
  }
}
