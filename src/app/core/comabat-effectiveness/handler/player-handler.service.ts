import { Injectable } from '@angular/core';
import { AnalyticsService } from '../../analytics/analytics.service';
import { DescriptionService } from '../../event/description.service';
import { OutfitEvents } from '../../event/outfit/player.event';
import { PlayerLoginEvent, PlayerLogoutEvent } from '../../event/player/player.event.model';
import { TrackingService } from '../../event/tracking/tracking.service';
import { Outfit } from '../../player/player.model';
import { PlayerRepository } from '../../player/player.repository';
import { CombatEffectivenessService } from '../combat-efectiveness.service';
import { PlayerCombatEffectiveness } from '../combat-effectiveness.model';

@Injectable({
  providedIn: 'root'
})
export class PlayerHandlerService {

  private trackedPlayers: PlayerCombatEffectiveness[] = []
  private trackedOutfits: Outfit[] = []

  constructor(
    private combatEffectivenessService: CombatEffectivenessService,
    private playerRepository: PlayerRepository,
    private descriptions: DescriptionService,
    private analytics: AnalyticsService,
    private trackingService: TrackingService,
    outfitEvents: OutfitEvents,
  ) {
    combatEffectivenessService.playersCombatEffectivenessObservable.subscribe(
      playersComefs => {
        this.trackedPlayers = playersComefs
      }
    )

    outfitEvents.outfitsTracked.subscribe(
      outfits => { this.trackedOutfits = outfits }
    )
  }

  handle(event: PlayerLogoutEvent | PlayerLoginEvent) {
    const trackedPlayer = this.trackedPlayers.find(d => d.id == event.playerId)
    
    if(trackedPlayer && event.type == "logout") {
        this.descriptions.eventDescriptionData = `${trackedPlayer.name} logged out`
        this.analytics.playerSessionEnded(trackedPlayer)
        this.combatEffectivenessService.playersCombatEffectivesData = this.trackedPlayers.filter(p => p.id != trackedPlayer.id)
    } else if(event.type == "login") {
      this.playerRepository.findById(event.playerId)
        .then(player => {
          if(this.trackedOutfits.some(o => o.id == player.outfit?.id)) {
            this.trackingService.startTracking(player)
            this.trackedPlayers.push(this.combatEffectivenessService.parseToCombatEffectiveness(player))
            this.combatEffectivenessService.playersCombatEffectivesData = this.trackedPlayers
          }
        })
    }
  }

}
