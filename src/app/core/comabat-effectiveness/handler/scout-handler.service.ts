import { Injectable } from '@angular/core';
import { GeneratorOverloadEvent, GeneratorStabilizeEvent, MotionSensorDestroyEvent, MotionSpotEvent, QSpotEvent, ScoutRadarSpotEvent, SpitfireDestroyEvent, TerminalHackEvent, TurretHackEvent } from '../../event/scout/scout.events.model';
import { CombatEffectivenessService } from '../combat-efectiveness.service';
import { PlayerCombatEffectiveness } from '../combat-effectiveness.model';

@Injectable({
  providedIn: 'root'
})
export class ScoutHandlerService {

  private trackedPlayers: PlayerCombatEffectiveness[] = []

  constructor(private combatEffectivenessService: CombatEffectivenessService) {
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
          console.log(`${player.name} Q Spotted an enemy`)
          player.scoutStats.qspots += 1;
          break;
        case "motionSpot":
          console.log(`${player.name} Motion Spotted an enemy`)
          player.scoutStats.motionSpots += 1;
          break;
        case "radarSpot":
          console.log(`${player.name} Radar Scout Spotted an enemy`)
          player.scoutStats.radarSpots += 1;
          break;
        case "overload":
          console.log(`${player.name} overloaded a generator`)
          player.scoutStats.generatorOverloads += 1;
          break;
        case "stabilize":
          console.log(`${player.name} stabilized a generator`)
          player.scoutStats.generatorStabilizations += 1;
          break;
        case "terminalHack":
          console.log(`${player.name} hacked a terminal`)
          player.scoutStats.terminalHacks += 1;
          break;
        case "turretHack":
          console.log(`${player.name} hacked a phalanx turret`)
          player.scoutStats.turretHacks += 1;
          break;
        case "motionSensorDestroy":
          console.log(`${player.name} destroyed a motion sensor`)
          player.scoutStats.motionSensorsDestroyed += 1;
          break;
        case "spitfireDestroy":
          console.log(`${player.name} destroyed a spitfire`)
          player.scoutStats.spitfiresDestroyed += 1;
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
