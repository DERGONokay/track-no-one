import { Injectable } from '@angular/core';
import { DescriptionService } from '../../event/description.service';
import { GeneratorOverloadEvent, GeneratorStabilizeEvent, MotionSensorDestroyEvent, MotionSpotEvent, QSpotEvent, ScoutRadarSpotEvent, SpitfireDestroyEvent, TerminalHackEvent, TurretHackEvent } from '../../event/scout/scout.event.model';
import { CombatEffectivenessService } from '../combat-efectiveness.service';
import { PlayerCombatEffectiveness } from '../combat-effectiveness.model';

@Injectable({
  providedIn: 'root'
})
export class ScoutHandlerService {

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

  handle(event: QSpotEvent | MotionSpotEvent | ScoutRadarSpotEvent | GeneratorOverloadEvent | GeneratorStabilizeEvent | TerminalHackEvent | TurretHackEvent | MotionSensorDestroyEvent | SpitfireDestroyEvent) {
    const player = this.trackedPlayers.find(d => d.id == event.playerId);
    
    if(player) {
      switch (event.type) {
        case "qspot":
          this.descriptions.eventDescriptionData = `${player.name} Q Spotted an enemy`
          player.scoutStats.qspots += 1;
          break;
        case "motionSpot":
          this.descriptions.eventDescriptionData = `${player.name} Motion Spotted an enemy`
          player.scoutStats.motionSpots += 1;
          break;
        case "radarSpot":
          this.descriptions.eventDescriptionData = `${player.name} Radar Scout Spotted an enemy`
          player.scoutStats.radarSpots += 1;
          break;
        case "overload":
          this.descriptions.eventDescriptionData = `${player.name} overloaded a generator`
          player.scoutStats.generatorOverloads += 1;
          break;
        case "stabilize":
          this.descriptions.eventDescriptionData = `${player.name} stabilized a generator`
          player.scoutStats.generatorStabilizations += 1;
          break;
        case "terminalHack":
          this.descriptions.eventDescriptionData = `${player.name} hacked a terminal`
          player.scoutStats.terminalHacks += 1;
          break;
        case "turretHack":
          this.descriptions.eventDescriptionData = `${player.name} hacked a phalanx turret`
          player.scoutStats.turretHacks += 1;
          break;
        case "motionSensorDestroy":
          this.descriptions.eventDescriptionData = `${player.name} destroyed a motion sensor`
          player.scoutStats.motionSensorsDestroyed += 1;
          break;
        case "spitfireDestroy":
          this.descriptions.eventDescriptionData = `${player.name} destroyed a spitfire`
          player.scoutStats.spitfiresDestroyed += 1;
          break;
      }

      this.combatEffectivenessService.updateCombatEffectiveness(player)
    }
  }

}
