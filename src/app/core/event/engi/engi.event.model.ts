export interface TerminalRepairEvent {
    playerId: String
    type: "terminalRepair"
}

export interface GeneratorRepairEvent {
    playerId: String
    type: "generatorRepair"
}

export interface InfantryResupplyEvent {
    playerId: String
    type: "infantryResupply"
}

export interface VehicleResupplyEvent {
    playerId: String
    type: "vehicleResupply"
}

export interface DeployableRepairEvent {
    playerId: String
    type: "deployableRepair"
}

export interface VehicleRepairEvent {
    playerId: String
    type: "vehicleRepair"
}

export interface MaxRepairEvent {
    playerId: String
    type: "maxRepair"
}