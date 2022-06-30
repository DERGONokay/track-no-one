import { Injectable } from '@angular/core';
import { HealEvent } from '../../event/event.model';
import { CombatEffectivenessService } from '../combat-efectiveness.service';
import { PlayerCombatEffectiveness } from '../combat-effectiveness.model';

@Injectable({
  providedIn: 'root'
})
export class HealHandlerService {

  private trackedPlayers: PlayerCombatEffectiveness[] = []

  constructor(private combatEffectivenessService: CombatEffectivenessService) {
    combatEffectivenessService.playersCombatEffectivenessObservable.subscribe(
      playersComef => { this.trackedPlayers = playersComef }
    )
  }

  async handle(event: HealEvent) {
    const player = this.trackedPlayers.find(d => d.id == event.playerId);

    if (player) {
      console.log(player.name + " healed a teammate")
      player.medicStats.heals += 1;
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
