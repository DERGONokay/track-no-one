import { Injectable } from '@angular/core';
import { Gtag } from 'angular-gtag';
import { BehaviorSubject } from 'rxjs';
import { PlayerRepository } from '../player/player.repository';
import { KillerStats, PlayerCombatEffectiveness } from './combat-effectiveness.model';

@Injectable({
  providedIn: 'root'
})
export class CombatEffectivenessService {

  private playersCombatEffectivenessSubject: BehaviorSubject<PlayerCombatEffectiveness[]> = new BehaviorSubject<PlayerCombatEffectiveness[]>([])

  constructor(private playerRepository: PlayerRepository, private gtag: Gtag) { }

  get playersCombatEffectivenessObservable() {
    return this.playersCombatEffectivenessSubject.asObservable()
  }

  set playersCombatEffectivesData(playersCombatEffectiveness: PlayerCombatEffectiveness[]) {
    this.playersCombatEffectivenessSubject.next(playersCombatEffectiveness)
  }

  calculateCombatEffectiveness(playerComef: PlayerCombatEffectiveness): number {
    const killerStats = this.calculateKillerStats(playerComef.killerStats, playerComef.sessionLenghtInSeconds)
    const medicStats = this.calculateMedicStats(playerComef)
    this.trackPlayerComef(playerComef);
    return killerStats + medicStats
  }

  private calculateKillerStats(killerStats: KillerStats, sessionLenghtInSeconds: number): number {
    const kda = ((killerStats.kills + killerStats.assists - killerStats.teamKills) / Math.max(1, killerStats.deaths)) * 0.6
    const kpm = (Math.max(1, killerStats.kills) / sessionLenghtInSeconds) * 60
    return kda * kpm
  }

  private calculateMedicStats(playerComef: PlayerCombatEffectiveness): number {
    const revives = Math.max(1, playerComef.medicStats.revives)
    const supporting =  Math.max(1, (playerComef.medicStats.heals + playerComef.medicStats.shielding))
    return revives * (supporting * 0.1);
  }
  
  private trackPlayerComef(playerComef: PlayerCombatEffectiveness) {
    this.playerRepository.findById(playerComef.id).then(p => {
      this.gtag.event("update_player_combat_effectiveness", {
        event_category: "comef_tracking",
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
    });
  }

}
