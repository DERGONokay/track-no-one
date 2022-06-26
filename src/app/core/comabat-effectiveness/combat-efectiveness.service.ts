import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { KillerStats, PlayerCombatEffectiveness } from './combat-effectiveness.model';

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

  calculateCombatEffectiveness(killerStats: KillerStats): number {
    const normalizedDeaths = this.normalizeDeaths(killerStats.deaths) //to avoid divide by 0
    const kda = this.calculateKda(killerStats, normalizedDeaths)
    return kda
  }

  private calculateKda(killerStats: KillerStats, deaths: number) {
    return ((killerStats.kills + killerStats.assists - killerStats.teamKills) / deaths) * 0.6;
  }

  private normalizeDeaths(deaths: number) {
    return deaths == 0 ? 1 : deaths
  }
}
