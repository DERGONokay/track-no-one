export interface KillEvent {
    attackerClass: InfantryClass
    victimClass: InfantryClass
    attackerId: String
    victimId: String
    wasHeadshot: Boolean
}

export enum InfantryClass {
    INFILTRATOR = "Infiltrator",
    LIGHT_ASSAULT = "Light Assault",
    MEDIC = "Combat Medic",
    ENGINEER = "Engineer",
    HEAVY_ASSAULT = "Heavy Assault",
    MAX = "MAX",
    UNKNOWN = "UNKNOWN"
}

export interface AssistEvent {
    playerId: String
}

export interface ReviveEvent {
    playerId: String
}

export interface HealEvent {
    playerId: String
}

export interface ShieldRepairEvent {
    playerId: String
}