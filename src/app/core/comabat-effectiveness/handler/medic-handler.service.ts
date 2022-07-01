import { Injectable } from '@angular/core';
import { HealEvent, InfantryClass, ReviveEvent, ShieldRepairEvent } from '../../event/event.model';
import { CombatEffectivenessService } from '../combat-efectiveness.service';
import { PlayerCombatEffectiveness } from '../combat-effectiveness.model';

@Injectable({
  providedIn: 'root'
})
export class MedicHandler {

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
      player.currentClass = InfantryClass.MEDIC;
    
      switch (event.type) {
        case "heal":
          console.log(`${player.name} healed a teammate`)
          player.medicStats.heals += 1;
          break;
        case "revive":
          console.log(`${player.name} ressed a teammate`)
          player.medicStats.revives += 1;
          break;
        case "shieldRepair":
          console.log(`${player.name} repaired a teammates shield`)
          player.medicStats.shielding += 1;
          break;
      }
      
      this.updateSessionLenght(player);
      this.updateCombatEffectiveness(player);
    }
    
    
    if(event.type == "revive") {
      const revivedPlayer = this.trackedPlayers.find(d => d.id == event.revivedPlayerId);

      if(revivedPlayer) {
        console.log(`${revivedPlayer.name} took a ress`)
        revivedPlayer.killerStats.deaths -= 1;

        this.updateSessionLenght(revivedPlayer);
        this.updateCombatEffectiveness(revivedPlayer);
      }
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
