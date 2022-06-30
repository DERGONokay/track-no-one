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