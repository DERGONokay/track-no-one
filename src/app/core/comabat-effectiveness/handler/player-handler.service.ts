import { Injectable } from '@angular/core';
import { AnalyticsService } from '../../analytics/analytics.service';
import { DescriptionService } from '../../event/description.service';
import { PlayerLogoutEvent } from '../../event/player/player.event.model';
import { GeneratorOverloadEvent, GeneratorStabilizeEvent, MotionSensorDestroyEvent, MotionSpotEvent, QSpotEvent, ScoutRadarSpotEvent, SpitfireDestroyEvent, TerminalHackEvent, TurretHackEvent } from '../../event/scout/scout.event.model';
import { CombatEffectivenessService } from '../combat-efectiveness.service';
import { PlayerCombatEffectiveness } from '../combat-effectiveness.model';

@Injectable({
  providedIn: 'root'
})
export class PlayerHandlerService {

  private trackedPlayers: PlayerCombatEffectiveness[] = []

  constructor(
    private combatEffectivenessService: CombatEffectivenessService,
    private descriptions: DescriptionService,
    private analytics: AnalyticsService
  ) {
    combatEffectivenessService.playersCombatEffectivenessObservable.subscribe(
      playersComefs => {
        this.trackedPlayers = playersComefs
      }
    )
  }

  handle(event: PlayerLogoutEvent) {
    const player = this.trackedPlayers.find(d => d.id == event.playerId);
    
    if(player) {
      switch (event.type) {
        case "logout":
          this.descriptions.eventDescriptionData = `${player.name} logged out`
          this.analytics.playerSessionEnded(player)
          this.combatEffectivenessService.playersCombatEffectivesData = this.trackedPlayers.filter(p => p.id != player.id)
          break;
      }

    }
  }

}
