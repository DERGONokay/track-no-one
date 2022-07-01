import { Injectable } from '@angular/core';
import { FacilityCaptureEvent, FacilityDefenseEvent, PointCaptureEvent, PointDefenseEvent } from '../../event/event.model';
import { CombatEffectivenessService } from '../combat-efectiveness.service';
import { PlayerCombatEffectiveness } from '../combat-effectiveness.model';

@Injectable({
  providedIn: 'root'
})
export class ObjectiveHandlerService {

  private trackedPlayers: PlayerCombatEffectiveness[] = []

  constructor(private combatEffectivenessService: CombatEffectivenessService) {
    combatEffectivenessService.playersCombatEffectivenessObservable.subscribe(
      playersComefs => {
        this.trackedPlayers = playersComefs
      }
    )
  }

  handleFacilityCaptured(event: FacilityCaptureEvent) {
    const player = this.trackedPlayers.find(d => d.id == event.playerId);

    if (player) {
      console.log(player.name + " captured a facility")
      player.objectiveStats.facilitiesCapture += 1;
      this.updateSessionLenght(player)
      this.updateCombatEffectiveness(player)
    }
  }

  handleFacilityDefense(event: FacilityDefenseEvent) {
    const player = this.trackedPlayers.find(d => d.id == event.playerId);

    if (player) {
      console.log(player.name + " defended a facility")
      player.objectiveStats.facilitiesDefense += 1;
      this.updateSessionLenght(player)
      this.updateCombatEffectiveness(player)
    }
  }

  handlePointCapture(event: PointCaptureEvent) {
    const player = this.trackedPlayers.find(d => d.id == event.playerId);

    if (player) {
      console.log(player.name + " helped to capture point")
      player.objectiveStats.pointsCapture += 1;
      this.updateSessionLenght(player)
      this.updateCombatEffectiveness(player)
    }
  }

  handlePointDefense(event: PointDefenseEvent) {
    const player = this.trackedPlayers.find(d => d.id == event.playerId);

    if (player) {
      console.log(player.name + " helped defending point")
      player.objectiveStats.pointsDefense += 1;
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
