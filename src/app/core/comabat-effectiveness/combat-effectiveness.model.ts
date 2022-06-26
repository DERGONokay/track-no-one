import { Faction } from "../player/player.model"

export interface PlayerCombatEffectiveness {
    id: String
    name: String
    faction: Faction
    outfitTag?: String
    combatEffectiveness: number
    killerStats: KillerStats
  }

  export interface KillerStats {
    kills: number
    deaths: number
    assists: number
    teamKills: number
  }