export interface CensusMessage {
    service: CensusService,
    event: CensusEvent,
    payload: CensusPayload,
    type: String
}

export interface CensusPayload {
    attacker_character_id: String
    character_id: String
    event_name: String
    is_headshot: String
    experience_id: String
}

export enum CensusEvent {
    ALL = "All",
    DEATH = "Death",
    ASSIST = "GainExperience_experience_id_2",
    GAIN_EXPERIENCE = "GainExperience"
}

export enum GainExperienceId {
    ASSIST = "2"
}

export enum MessageType {
    SERVICE_STATE_CHANGED = "serviceStateChanged",
    CONNECTION_STATE_CHANGED = "connectionStateChanged",
    HEARTBEAT = "heartbeat",
    SERVICE_MESSAGE = "serviceMessage"
}

export enum CensusService {
    EVENT = "event"
}

export enum CensusAction {
    SUBSCRIBE = "subscribe",
    UNSUBSCRIBE = "clearSubscribe"
}