export interface KillEvent {
    attackerClass: InfantryClass
    victimClass: InfantryClass
    attackerId: String
    victimId: String
    wasHeadshot: Boolean
    type: "kill"
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
    type: "assist"
}

export interface ReviveEvent {
    playerId: String
    type: "revive"
}

export interface HealEvent {
    playerId: String
    type: "heal"
}

export interface ShieldRepairEvent {
    playerId: String
    type: "shieldRepair"
}

export interface FacilityCaptureEvent {
    playerId: String
    facilityId: String
    continentId: String
    hexId: String
    type: "facilityCapture"
}

export interface FacilityDefenseEvent {
    playerId: String
    facilityId: String
    continentId: String
    hexId: String
    type: "facilityDefense"
}

export interface PointDefenseEvent {
    playerId: String
    type: "pointDefense"
}

export interface PointCaptureEvent {
    playerId: String
    type: "pointCapture"
}

export interface SpawnEvent {
    playerId: String
    type: "spawn"
}

export interface SquadSpawnEvent {
    playerId: String
    type: "squadSpawn"
}

export interface TransportAssistEvent {
    playerId: String
    type: "transportAssist"
}

export interface BeaconKillEvent {
    playerId: String
    type: "beaconKill"
}

export interface RouterKillEvent {
    playerId: String
    type: "routerKill"
}