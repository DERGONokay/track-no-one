export interface Player {
    id: String,
    name: String,
    faction: Faction,
    outfit?: Outfit
}

export interface Outfit {
  id: String,
  name: String,
  tag: String,
  members?: Player[]
}

export enum Faction {
    NSO = "0",
    VS = "1",
    NC = "2",
    TR = "3"
}