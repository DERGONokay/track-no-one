import { Injectable } from '@angular/core';
import { PlayerCombatEffectiveness } from '../comabat-effectiveness/combat-effectiveness.model';
import { Player, Faction } from '../player/player.model';
import { PlayerRepository } from '../player/player.repository';

import * as amplitude from '@amplitude/analytics-browser';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private playersTracking: Map<String, number>

  constructor(private playerRepository: PlayerRepository) {
    amplitude.init(environment.amplitudeApiKey);
    this.playersTracking = new Map()
  }

  trackPageShow(pageName: String) {
    amplitude.track(pageName + "_show")
  }

  trackPlayerComef(playerComef: PlayerCombatEffectiveness) {
    const lastTrackedOnSession = this.playersTracking.get(playerComef.id) || 0
    if(playerComef.sessionLenghtInSeconds - lastTrackedOnSession > 60) {
      this.playersTracking.set(playerComef.id, playerComef.sessionLenghtInSeconds)
      this.playerRepository.findById(playerComef.id)
      .then(player => {
        amplitude.track("comef_refresh", {
          player_name: player.name,
          outfit_name: player.outfit?.name,
          faction: this.parseFaction(player.faction),
          class: playerComef.currentClass,
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

  startTrackingPlayer(player: Player) {
    amplitude.track("comef_start_tracking_player", {
      player_name: player.name,
      outfit_name: player.outfit?.name,
      faction: player.faction
    })
  }

  playerSessionEnded(playerComef: PlayerCombatEffectiveness) {
    this.playerRepository.findById(playerComef.id).then(player => {
      amplitude.track("comef_stop_tracking_player", {
        player_name: player.name,
        outfit_name: player.outfit?.name,
        faction: this.parseFaction(player.faction),
        class: playerComef.currentClass,
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

  addPlayerClick(playerName: String) {
    amplitude.track("comef_start_tracking_player_click", {
      player_name: playerName.toLowerCase()
    })
  }

  addOutfitClick(outfitTag: String){
    amplitude.track("comef_start_tracking_outfit_click", {
      outfit_tag: outfitTag
    })
  }

  comefHelpShow() {
    amplitude.track("comef_help_show")
  }
  
  trackOutfitError(code: String, description: String, outfitTag: String) {
    amplitude.track("comef_error", {
      code: code,
      description: description,
      outfit_tag: outfitTag
    })
  }

  trackPlayerError(code: String, description: String, playerName: String) {
    amplitude.track("comef_error", {
      code: code,
      description: description,
      player_name: playerName
    })
  }


  private parseFaction(faction: Faction): String {
    switch(faction) {
      case Faction.NSO:
        return "NSO"
      case Faction.TR:
        return "TR"
      case Faction.VS:
        return "VS"
      case Faction.NC:
        return "NC"
    }
  }

}
