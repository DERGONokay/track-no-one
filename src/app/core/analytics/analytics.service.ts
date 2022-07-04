import { Injectable } from '@angular/core';
import { Gtag } from 'angular-gtag';
import { PlayerCombatEffectiveness } from '../comabat-effectiveness/combat-effectiveness.model';
import { Player } from '../player/player.model';
import { PlayerRepository } from '../player/player.repository';
import { EventCategory } from './analytics.model';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  private playersTracking: Map<String, number>

  constructor(private gtag: Gtag, private playerRepository: PlayerRepository) {
    this.playersTracking = new Map()
  }

  trackPlayerComef(playerComef: PlayerCombatEffectiveness) {
    const lastTrackedOnSession = this.playersTracking.get(playerComef.id) || 0
    if(playerComef.sessionLenghtInSeconds - lastTrackedOnSession > 60) {
      this.playersTracking.set(playerComef.id, playerComef.sessionLenghtInSeconds)
      this.playerRepository.findById(playerComef.id)
      .then(p => {
        this.gtag.event("update_player_combat_effectiveness", {
          event_category: EventCategory.COMEF_TRACKING,
          event_label: "Player combat effectiveness updated",
          value: p.name,
          outfit: p.outfit?.name,
          faction: p.faction,
          combat_effectiveness: playerComef.combatEffectiveness,
          seesion_lenght: playerComef.sessionLenghtInSeconds,
          killer_score: playerComef.killerStats.score,
          medic_score: playerComef.medicStats.score,
          scout_score: playerComef.scoutStats.score,
          engi_score: playerComef.engiStats.score,
          logistics_score: playerComef.logisticsStats.score,
          objective_score: playerComef.medicStats.score,
        });
      })
    }
  }

  addPlayerClick(playerName: String) {
    this.gtag.event("start_tracking_player_click", {
      event_category: EventCategory.INTERACTION,
      event_label: "Add a single player to the tracking list",
      value: playerName.toLowerCase()
    })
  }

  addOutfitClick(outfitTag: String){
    this.gtag.event("start_tracking_outfit_click", {
      event_category: EventCategory.INTERACTION,
      event_label: "Add entire outfit to tracking list",
      value: outfitTag.toUpperCase()
    })
  }

  stopTrackingPlayer(playerComef: PlayerCombatEffectiveness) {
    this.playerRepository.findById(playerComef.id).then(p => {
      this.gtag.event("stop_tracking_player", {
        event_category: EventCategory.COMEF_TRACKING,
        event_label: "Stop tracking a player",
        value: p.name,
        outfit: p.outfit?.name,
        faction: p.faction,
        combat_effectiveness: playerComef.combatEffectiveness,
        seesion_lenght: playerComef.sessionLenghtInSeconds,
        killer_score: playerComef.killerStats.score,
        medic_score: playerComef.medicStats.score,
        scout_score: playerComef.scoutStats.score,
        engi_score: playerComef.engiStats.score,
        logistics_score: playerComef.logisticsStats.score,
        objective_score: playerComef.medicStats.score,
      })
    })
  }

  comefHelpShow() {
    this.gtag.event("comef_help_show", {
      event_category: EventCategory.INTERACTION,
      event_label: "Show Combat Effectiveness calculation dialog",
    })
  }

  startTrackingPlayer(player: Player) {
    this.gtag.event("start_tracking_player", {
      event_category: EventCategory.COMEF_TRACKING,
      event_label: "Started to track a player",
      value: player.name,
      outfit: player.outfit?.name,
      faction: player.faction
    })
  }
}
