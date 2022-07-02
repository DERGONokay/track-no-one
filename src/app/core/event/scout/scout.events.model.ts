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