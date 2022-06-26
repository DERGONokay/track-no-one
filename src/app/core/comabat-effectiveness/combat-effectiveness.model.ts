import { Faction } from "../player/player.model"

export interface PlayerCombatEffectiveness {
    id: String
    name: String
    faction: Faction
    outfitTag?: String
    combatEffectiveness: number
    kills: number
    deaths: number
    assists: number
    teamKills: number
  }