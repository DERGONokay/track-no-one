import { InfantryClass } from "../event/event.model"

export interface Player {
    id: String
    name: String
    faction: Faction
    currentClass: InfantryClass
    outfit?: Outfit
}

export interface Outfit {
  id: String
  name: String
  tag: String
  onlinePlayers?: Player[]
  offlinePlayers?: Player[]
}

export enum Faction {
    NONE = "0",
    VS = "1",
    NC = "2",
    TR = "3",
    NSO = "4"
}