export interface KillEvent {
    attackerId: String
    victimId: String
    wasHeadshot: Boolean
}

export interface AssistEvent {
    playerId: String
}