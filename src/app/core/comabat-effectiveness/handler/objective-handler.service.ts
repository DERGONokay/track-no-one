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

  handle(event: FacilityCaptureEvent | FacilityDefenseEvent | PointCaptureEvent | PointDefenseEvent) {
    const player = this.trackedPlayers.find(d => d.id == event.playerId);
    
    if(player) {
      switch (event.type) {
        case "facilityCapture":
          player.objectiveStats.facilitiesCapture += 1;
          break;
        case "facilityDefense":
          player.objectiveStats.facilitiesDefense += 1;
          break;
        case "pointCapture":
          player.objectiveStats.pointsCapture += 1;
          break;
        case "pointDefense":
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
