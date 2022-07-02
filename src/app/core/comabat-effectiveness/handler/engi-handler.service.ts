import { Injectable } from '@angular/core';
import { DeployableRepairEvent, GeneratorRepairEvent, InfantryResupplyEvent, MaxRepairEvent, TerminalRepairEvent, VehicleRepairEvent, VehicleResupplyEvent } from '../../event/engi/engi.event.model';
import { CombatEffectivenessService } from '../combat-efectiveness.service';
import { PlayerCombatEffectiveness } from '../combat-effectiveness.model';

@Injectable({
  providedIn: 'root'
})
export class EngiHandlerService {

  private trackedPlayers: PlayerCombatEffectiveness[] = []

  constructor(private combatEffectivenessService: CombatEffectivenessService) {
    combatEffectivenessService.playersCombatEffectivenessObservable.subscribe(
      playersComef => { this.trackedPlayers = playersComef }
    )
  }

  async handle(event: TerminalRepairEvent | GeneratorRepairEvent | InfantryResupplyEvent | VehicleResupplyEvent | DeployableRepairEvent | VehicleRepairEvent | MaxRepairEvent) {
    const player = this.trackedPlayers.find(d => d.id == event.playerId);

    if (player) {
      switch (event.type) {
        case "terminalRepair":
          console.log(`${player.name} repaired a terminal`)
          player.engiStats.terminalRepairs += 1;
          break;
        case "generatorRepair":
          console.log(`${player.name} repaired a generator`)
          player.engiStats.generatorReparirs += 1;
          break;
        case "infantryResupply":
          console.log(`${player.name} resupplied an ally`)
          player.engiStats.infantryResupply += 1;
          break;
        case "vehicleResupply":
          console.log(`${player.name} resupplied an ally vehicle`)
          player.engiStats.vehicleResupply += 1;
          break;
        case "deployableRepair":
          console.log(`${player.name} repaired a deployable`)
          player.engiStats.deployableRepairs += 1;
          break;
        case "vehicleRepair":
          console.log(`${player.name} repaired a vehicle`)
          player.engiStats.vehicleRepairs += 1;
          break;
        case "maxRepair":
          console.log(`${player.name} repaired a max`)
          player.engiStats.maxRepairs += 1;
          break;
      }
      
      this.updateSessionLenght(player);
      this.updateCombatEffectiveness(player);
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
