import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { KillerStats, MedicStats, PlayerCombatEffectiveness } from './combat-effectiveness.model';

@Injectable({
  providedIn: 'root'
})
export class CombatEffectivenessService {

  private playersCombatEffectivenessSubject: BehaviorSubject<PlayerCombatEffectiveness[]> = new BehaviorSubject<PlayerCombatEffectiveness[]>([])

  constructor() { }

  get playersCombatEffectivenessObservable() {
    return this.playersCombatEffectivenessSubject.asObservable()
  }

  set playersCombatEffectivesData(playersCombatEffectiveness: PlayerCombatEffectiveness[]) {
    this.playersCombatEffectivenessSubject.next(playersCombatEffectiveness)
  }

  calculateCombatEffectiveness(playerComef: PlayerCombatEffectiveness): number {
    const killerStats = this.calculateKillerStats(playerComef.killerStats, playerComef.sessionLenghtInSeconds)
    const medicStats = this.calculateMedicStats(playerComef)
    return killerStats + medicStats
  }
  
  private calculateKillerStats(killerStats: KillerStats, sessionLenghtInSeconds: number): number {
    const kda = ((killerStats.kills + killerStats.assists - killerStats.teamKills) / Math.max(1, killerStats.deaths)) * 0.6
    const kpm = (Math.max(1, killerStats.kills) / sessionLenghtInSeconds) * 60
    return kda * kpm
  }

  private calculateMedicStats(playerComef: PlayerCombatEffectiveness) {
    return playerComef.medicStats.revives * ((playerComef.medicStats.heals + playerComef.medicStats.shielding) * 0.1);
  }

}
