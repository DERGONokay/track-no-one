import { Injectable } from '@angular/core';
import { DescriptionService } from '../../event/description.service';
import { DeployableRepairEvent, GeneratorRepairEvent, InfantryResupplyEvent, MaxRepairEvent, TerminalRepairEvent, VehicleRepairEvent, VehicleResupplyEvent } from '../../event/engi/engi.event.model';
import { CombatEffectivenessService } from '../combat-efectiveness.service';
import { PlayerCombatEffectiveness } from '../combat-effectiveness.model';

@Injectable({
  providedIn: 'root'
})
export class EngiHandlerService {

  private trackedPlayers: PlayerCombatEffectiveness[] = []

  constructor(
    private combatEffectivenessService: CombatEffectivenessService,
    private eventDesctiption: DescriptionService
  ) {
    combatEffectivenessService.playersCombatEffectivenessObservable.subscribe(
      playersComef => { this.trackedPlayers = playersComef }
    )
  }

  async handle(event: TerminalRepairEvent | GeneratorRepairEvent | InfantryResupplyEvent | VehicleResupplyEvent | DeployableRepairEvent | VehicleRepairEvent | MaxRepairEvent) {
    const player = this.trackedPlayers.find(d => d.id == event.playerId);

    if (player) {
      switch (event.type) {
        case "terminalRepair":
          this.eventDesctiption.eventDescriptionData = `${player.name} repaired a terminal`
          player.engiStats.terminalRepairs += 1;
          break;
        case "generatorRepair":
          this.eventDesctiption.eventDescriptionData = `${player.name} repaired a generator`
          player.engiStats.generatorReparirs += 1;
          break;
        case "infantryResupply":
          this.eventDesctiption.eventDescriptionData = `${player.name} resupplied an ally`
          player.engiStats.infantryResupply += 1;
          break;
        case "vehicleResupply":
          this.eventDesctiption.eventDescriptionData = `${player.name} resupplied an ally vehicle`
          player.engiStats.vehicleResupply += 1;
          break;
        case "deployableRepair":
          this.eventDesctiption.eventDescriptionData = `${player.name} repaired a deployable`
          player.engiStats.deployableRepairs += 1;
          break;
        case "vehicleRepair":
          this.eventDesctiption.eventDescriptionData = `${player.name} repaired a vehicle`
          player.engiStats.vehicleRepairs += 1;
          break;
        case "maxRepair":
          this.eventDesctiption.eventDescriptionData = `${player.name} repaired a max`
          player.engiStats.maxRepairs += 1;
          break;
      }
      
      this.combatEffectivenessService.updateCombatEffectiveness(player)
    }
  }

}
