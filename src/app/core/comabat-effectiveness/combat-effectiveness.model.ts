import { InfantryClass } from "../event/event.model"
import { Faction } from "../player/player.model"

export interface PlayerCombatEffectiveness {
  id: String
  name: String
  faction: Faction
  currentClass?: InfantryClass
  outfitTag?: String
  sessionStart: number
  sessionLenghtInSeconds: number
  combatEffectiveness: number
  killerStats: KillerStats
  medicStats: MedicStats
  objectiveStats: ObjectiveStats
  logisticsStats: LogisticsStats
  scoutStats: ScoutStats
}

export interface KillerStats {
  kills: number
  deaths: number
  assists: number
  teamKills: number
}

export interface MedicStats {
  revives: number
  heals: number
  shielding: number
}

export interface ObjectiveStats {
  facilitiesCapture: number
  facilitiesDefense: number
  pointsCapture: number
  pointsDefense: number
}

export interface LogisticsStats {
  spawns: number
  squadSpanws: number
  transportAssits: number
  beaconKills: number
  routerKills: number
}

export interface ScoutStats {
  qspots: number
  motionSpots: number
  radarSpots: number
  generatorOverloads: number
  generatorStabilizations: number
  terminalHacks: number
  turretHacks: number
  motionSensorsDestroyed: number
  spitfireKills: number
}