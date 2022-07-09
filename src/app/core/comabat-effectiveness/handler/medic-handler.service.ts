import { Injectable } from '@angular/core';
import { DescriptionService } from '../../event/description.service';
import { HealEvent, InfantryClass, ReviveEvent, ShieldRepairEvent } from '../../event/event.model';
import { CombatEffectivenessService } from '../combat-efectiveness.service';
import { PlayerCombatEffectiveness } from '../combat-effectiveness.model';

@Injectable({
  providedIn: 'root'
})
export class MedicHandler {

  private trackedPlayers: PlayerCombatEffectiveness[] = []

  constructor(
    private combatEffectivenessService: CombatEffectivenessService,
    private description: DescriptionService
  ) {
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
          this.description.eventDescriptionData = `${player.name} healed a teammate`
          player.medicStats.heals += 1;
          break;
        case "revive":
          this.description.eventDescriptionData = `${player.name} ressed a teammate`
          player.medicStats.revives += 1;
          break;
        case "shieldRepair":
          this.description.eventDescriptionData = `${player.name} repaired a teammate shield`
          player.medicStats.shielding += 1;
          break;
      }
      this.combatEffectivenessService.updateCombatEffectiveness(player)
    }
    
    
    if(event.type == "revive") {
      const revivedPlayer = this.trackedPlayers.find(d => d.id == event.revivedPlayerId);

      if(revivedPlayer) {
        this.description.eventDescriptionData = `${revivedPlayer.name} took a ress`
        revivedPlayer.killerStats.deaths -= 1;
        this.combatEffectivenessService.updateCombatEffectiveness(revivedPlayer)
      }
    }
  }

}
