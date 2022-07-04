import { Injectable } from '@angular/core';
import { CombatEffectivenessService } from '../combat-efectiveness.service';
import { PlayerCombatEffectiveness } from '../combat-effectiveness.model';
import { AssistEvent } from '../../event/event.model';

@Injectable({
  providedIn: 'root'
})
export class AssistHandler {

  private trackedPlayers: PlayerCombatEffectiveness[] = []

  constructor(private combatEffectivenessService: CombatEffectivenessService) {
    combatEffectivenessService.playersCombatEffectivenessObservable.subscribe(
      playersComef => { this.trackedPlayers = playersComef }
    )
  }

  async handle(event: AssistEvent) {
    const player = this.trackedPlayers.find(d => d.id == event.playerId);

    if (player) {
      console.log(player.name + " made an assist")
      player.killerStats.assists += 1
      this.combatEffectivenessService.updateCombatEffectiveness(player)
    }
  }

}
