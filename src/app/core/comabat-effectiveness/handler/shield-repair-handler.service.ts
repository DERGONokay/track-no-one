import { Injectable } from '@angular/core';
import { HealEvent, ReviveEvent, ShieldRepairEvent } from '../../event/event.model';
import { CombatEffectivenessService } from '../combat-efectiveness.service';
import { PlayerCombatEffectiveness } from '../combat-effectiveness.model';

@Injectable({
  providedIn: 'root'
})
export class MedicHandlerService {

  private trackedPlayers: PlayerCombatEffectiveness[] = []

  constructor(private combatEffectivenessService: CombatEffectivenessService) {
    combatEffectivenessService.playersCombatEffectivenessObservable.subscribe(
      playersComefs => {
        this.trackedPlayers = playersComefs
      }
    )
  }

  handle(event: ReviveEvent | HealEvent | ShieldRepairEvent) {
    const player = this.trackedPlayers.find(d => d.id == event.playerId);

    if (player) {
      switch (event.type) {
        case "heal":
          player.medicStats.heals += 1;
          break;
        case "revive":
          player.medicStats.revives += 1;
          break;
        case "shieldRepair":
          player.medicStats.shielding += 1;
          break;
      }
      
      this.updateSessionLenght(player)
      this.updateCombatEffectiveness(player)
    }
  }

  private updateSessionLenght(playerComef: PlayerCombatEffectiveness) {
    playerComef.sessionLenghtInSeconds = this.calculateSessionLenght(playerComef)
  }

  private calculateSessionLenght(playerComef: PlayerCombatEffectiveness): number {
    return Math.floor((Date.now() - playerComef.sessionStart) / 1000);
  }

  private updateCombatEffectiveness(player: PlayerCombatEffectiveness) {
    player.combatEffectiveness = this.combatEffectivenessService.calculateCombatEffectiveness(player)
    this.combatEffectivenessService.playersCombatEffectivesData = this.trackedPlayers
  }
}
