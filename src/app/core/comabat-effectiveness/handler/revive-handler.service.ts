import { Injectable } from '@angular/core';
import { ReviveEvent } from '../../event/event.model';
import { CombatEffectivenessService } from '../combat-efectiveness.service';
import { PlayerCombatEffectiveness } from '../combat-effectiveness.model';

@Injectable({
  providedIn: 'root'
})
export class ReviveHandlerService {

  private trackedPlayers: PlayerCombatEffectiveness[] = []

  constructor(private combatEffectivenessService: CombatEffectivenessService) {
    combatEffectivenessService.playersCombatEffectivenessObservable.subscribe(
      playersComefs => {
        this.trackedPlayers = playersComefs
      }
    )
  }

  handle(event: ReviveEvent) {
    const player = this.trackedPlayers.find(d => d.id == event.playerId);

    if (player) {
      console.log(player.name + " revived a teammate")
      player.medicStats.revives += 1;
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
