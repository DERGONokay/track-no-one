import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AnalyticsService } from '../analytics/analytics.service';
import { PlayerCombatEffectiveness } from './combat-effectiveness.model';

@Injectable({
  providedIn: 'root'
})
export class CombatEffectivenessService {

  private playersCombatEffectivenessSubject: BehaviorSubject<PlayerCombatEffectiveness[]> = new BehaviorSubject<PlayerCombatEffectiveness[]>([])

  constructor(private analytics: AnalyticsService) { }

  get playersCombatEffectivenessObservable() {
    return this.playersCombatEffectivenessSubject.asObservable()
  }

  set playersCombatEffectivesData(playersCombatEffectiveness: PlayerCombatEffectiveness[]) {
    this.playersCombatEffectivenessSubject.next(playersCombatEffectiveness)
  }

  calculateCombatEffectiveness(playerComef: PlayerCombatEffectiveness): number {
    const killerScore = this.calculateKillerScore(playerComef)
    const medicScore = this.calculateMedicScore(playerComef)
    const engiScore = this.calculateEngiScore(playerComef)
    const scoutScore = this.calculateScoutScore(playerComef)
    const objectiveScore = this.calculateObjectiveScore(playerComef)
    const logisticsScore = this.calculateLogisticsScore(playerComef)
    this.analytics.trackPlayerComef(playerComef)
    return killerScore + medicScore + engiScore + scoutScore + objectiveScore + logisticsScore
  }

  private calculateKillerScore(playerComef: PlayerCombatEffectiveness): number {
    const kda = ((playerComef.killerStats.kills + playerComef.killerStats.assists - playerComef.killerStats.teamKills) / Math.max(1, playerComef.killerStats.deaths)) * 0.6
    const kpm = (Math.max(1, playerComef.killerStats.kills) / playerComef.sessionLenghtInSeconds) * 60
    const score = kda * kpm
    playerComef.killerStats.score = score
    return score
  }

  private calculateMedicScore(playerComef: PlayerCombatEffectiveness): number {
    const revives = Math.max(1, playerComef.medicStats.revives)
    const supporting =  Math.max(1, (playerComef.medicStats.heals + playerComef.medicStats.shielding))
    const score = revives * (supporting * 0.1);
    playerComef.medicStats.score = score
    return score
  }

  private calculateObjectiveScore(playerComef: PlayerCombatEffectiveness): number {
    const facilitiesCapture = playerComef.objectiveStats.facilitiesCapture
    const facilitiesDefended = playerComef.objectiveStats.facilitiesDefense
    const pointsCaputre = playerComef.objectiveStats.pointsCapture
    const pointsDefense = playerComef.objectiveStats.pointsDefense
    const score = (facilitiesCapture * 5) + (facilitiesDefended * 2) + (pointsCaputre * 0.5) + (pointsDefense * 0.25)
    playerComef.objectiveStats.score = score
    return score
  }

  private calculateLogisticsScore(playerComef: PlayerCombatEffectiveness): number {
    const spawns = playerComef.logisticsStats.spawns
    const squadSpawns = playerComef.logisticsStats.squadSpanws
    const transportAssits = playerComef.logisticsStats.transportAssits
    const beaconKills = playerComef.logisticsStats.beaconKills
    const routerKills = playerComef.logisticsStats.routerKills
    const score = (spawns + squadSpawns * 2) + transportAssits + (beaconKills + routerKills *4) * 20
    playerComef.logisticsStats.score = score
    return score
  }

  private calculateEngiScore(playerComef: PlayerCombatEffectiveness): number {
    const spawns = playerComef.logisticsStats.spawns
    const squadSpawns = playerComef.logisticsStats.squadSpanws
    const transportAssits = playerComef.logisticsStats.transportAssits
    const beaconKills = playerComef.logisticsStats.beaconKills
    const routerKills = playerComef.logisticsStats.routerKills
    const score = (spawns + squadSpawns * 2) + transportAssits + (beaconKills + routerKills *4) * 20
    playerComef.engiStats.score = score
    return score
  }

  private calculateScoutScore(playerComef: PlayerCombatEffectiveness): number {
    const qspots = playerComef.scoutStats.qspots
    const motionSpots = playerComef.scoutStats.motionSpots
    const radarSpots = playerComef.scoutStats.radarSpots
    const generatorOverloads = playerComef.scoutStats.generatorOverloads
    const generatorStabilizations = playerComef.scoutStats.generatorStabilizations
    const terminalHacks = playerComef.scoutStats.terminalHacks
    const turretHacks = playerComef.scoutStats.turretHacks
    const motionSensorsDestroyed = playerComef.scoutStats.motionSensorsDestroyed
    const spitfiresDestroyed = playerComef.scoutStats.spitfiresDestroyed
    const score = (qspots + motionSpots + radarSpots) * 0.1 + generatorOverloads * 5 + generatorStabilizations * 5 + terminalHacks + turretHacks + motionSensorsDestroyed + spitfiresDestroyed
    playerComef.scoutStats.score = score
    return score
  }
  
}
