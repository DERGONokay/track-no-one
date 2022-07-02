export interface QSpotEvent {
    playerId: String
    type: "qspot"
}

export interface MotionSpotEvent {
    playerId: String
    type: "motionSpot"
}

export interface ScoutRadarSpotEvent {
    playerId: String
    type: "radarSpot"
}

export interface GeneratorOverloadEvent {
    playerId: String
    type: "overload"
}

export interface GeneratorStabilizeEvent {
    playerId: String
    type: "stabilize"
}

export interface TerminalHackEvent {
    playerId: String
    type: "terminalHack"
}

export interface TurretHackEvent {
    playerId: String
    type: "turretHack"
}

export interface MotionSensorKillEvent {
    playerId: String
    type: "motionSensorKill"
}

export interface SpitfireKillEvent {
    playerId: String
    type: "spitfireKill"
}