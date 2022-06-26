import { Injectable } from '@angular/core';
import { CombatEffectivenessService } from '../../comabat-effectiveness/combat-efectiveness.service';
import { PlayerCombatEffectiveness } from '../../comabat-effectiveness/combat-effectiveness.model';
import { AssistEvent } from '../event.model';

@Injectable({
  providedIn: 'root'
})
export class AssistHandlerService {

  private trackedPlayers: PlayerCombatEffectiveness[] = []

  constructor(combatEffectivenessService: CombatEffectivenessService) {
    combatEffectivenessService.playersCombatEffectivenessObservable.subscribe(
      playersComef => { this.trackedPlayers = playersComef }
    )
  }

  async handle(event: AssistEvent): Promise<PlayerCombatEffectiveness> {
    const player = this.trackedPlayers.find(d => d.id == event.playerId);

    if (player) {
      console.log(player.name + " made an assist")
      player.killerStats.assists += 1;
      return player
    } else {
      throw new Error("Failed to handle Assist event. Player wiht ID = " + event.playerId + " was not being tracked")
    }
  }
}
