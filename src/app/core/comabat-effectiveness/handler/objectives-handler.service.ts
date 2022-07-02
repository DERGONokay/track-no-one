import { Injectable } from '@angular/core';
import { FacilityCaptureEvent, FacilityDefenseEvent, PointCaptureEvent, PointDefenseEvent } from '../../event/event.model';
import { CombatEffectivenessService } from '../combat-efectiveness.service';
import { PlayerCombatEffectiveness } from '../combat-effectiveness.model';

@Injectable({
  providedIn: 'root'
})
export class ObjectivesHandler {

  private trackedPlayers: PlayerCombatEffectiveness[] = []

  constructor(private combatEffectivenessService: CombatEffectivenessService) {
    combatEffectivenessService.playersCombatEffectivenessObservable.subscribe(
      playersComefs => {
        this.trackedPlayers = playersComefs
      }
    )
  }

  handle(event: FacilityCaptureEvent | FacilityDefenseEvent | PointCaptureEvent | PointDefenseEvent) {
    const player = this.trackedPlayers.find(d => d.id == event.playerId);
    
    if(player) {
      switch (event.type) {
        case "facilityCapture":
          console.log(`${player.name} captured a facility`);
          player.objectiveStats.facilitiesCapture += 1;
          break;
        case "facilityDefense":
          console.log(`${player.name} defended a facility`);
          player.objectiveStats.facilitiesDefense += 1;
          break;
        case "pointCapture":
          console.log(`${player.name} capture a point`);
          player.objectiveStats.pointsCapture += 1;
          break;
        case "pointDefense":
          console.log(`${player.name} defended a point`);
          player.objectiveStats.pointsDefense += 1;
          break;
      }
      
      this.updateSessionLenght(player);
      this.updateCombatEffectiveness(player);
    }
  }

  private updateSessionLenght(playerComef: PlayerCombatEffectiveness) {
    playerComef.sessionLenghtInSeconds = this.calculateSessionLenght(playerComef);
  }

  private calculateSessionLenght(playerComef: PlayerCombatEffectiveness): number {
    return Math.floor((Date.now() - playerComef.sessionStart) / 1000);
  }

  private updateCombatEffectiveness(player: PlayerCombatEffectiveness) {
    player.combatEffectiveness = this.combatEffectivenessService.calculateCombatEffectiveness(player);
    this.combatEffectivenessService.playersCombatEffectivesData = this.trackedPlayers;
  }
}
