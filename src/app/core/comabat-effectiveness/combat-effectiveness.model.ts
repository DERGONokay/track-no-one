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
  engiStats: EngiStats
}

export interface KillerStats {
  score: number
  kills: number
  deaths: number
  assists: number
  teamKills: number
}

export interface MedicStats {
  score: number
  revives: number
  heals: number
  shielding: number
}

export interface ObjectiveStats {
  score: number
  facilitiesCapture: number
  facilitiesDefense: number
  pointsCapture: number
  pointsDefense: number
}

export interface LogisticsStats {
  score: number
  spawns: number
  squadSpanws: number
  transportAssits: number
  beaconKills: number
  routerKills: number
}

export interface ScoutStats {
  score: number
  qspots: number
  motionSpots: number
  radarSpots: number
  generatorOverloads: number
  generatorStabilizations: number
  terminalHacks: number
  turretHacks: number
  motionSensorsDestroyed: number
  spitfiresDestroyed: number
}

export interface EngiStats {
  score: number
  terminalRepairs: number
  generatorReparirs: number
  infantryResupply: number
  vehicleResupply: number
  deployableRepairs: number
  vehicleRepairs: number
  maxRepairs: number
}