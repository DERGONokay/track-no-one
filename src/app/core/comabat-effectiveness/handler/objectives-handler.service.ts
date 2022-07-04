import { Injectable } from '@angular/core';
import { DescriptionService } from '../../event/description.service';
import { FacilityCaptureEvent, FacilityDefenseEvent, PointCaptureEvent, PointDefenseEvent } from '../../event/event.model';
import { CombatEffectivenessService } from '../combat-efectiveness.service';
import { PlayerCombatEffectiveness } from '../combat-effectiveness.model';

@Injectable({
  providedIn: 'root'
})
export class ObjectivesHandler {

  private trackedPlayers: PlayerCombatEffectiveness[] = []

  constructor(
    private combatEffectivenessService: CombatEffectivenessService,
    private descriptions: DescriptionService
  ) {
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
          this.descriptions.eventDescriptionData = `${player.name} captured a facility`
          player.objectiveStats.facilitiesCapture += 1;
          break;
        case "facilityDefense":
          this.descriptions.eventDescriptionData = `${player.name} defended a facility`
          player.objectiveStats.facilitiesDefense += 1;
          break;
        case "pointCapture":
          this.descriptions.eventDescriptionData = `${player.name} is capturing a point`
          player.objectiveStats.pointsCapture += 1;
          break;
        case "pointDefense":
          this.descriptions.eventDescriptionData = `${player.name} is defending the point`
          player.objectiveStats.pointsDefense += 1;
          break;
      }

      this.combatEffectivenessService.updateCombatEffectiveness(player)
    }
  }

}
