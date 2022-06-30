export interface CensusMessage {
    service: CensusService,
    event: CensusEvent,
    payload: CensusPayload,
    type: String
}

export interface CensusPayload {
    attacker_character_id: String
    character_id: String
    attacker_loadout_id: String
    character_loadout_id: String
    event_name: String
    is_headshot: String
    experience_id: String
    other_id: String
}

export enum CensusEvent {
    ALL = "all",
    GAIN_EXPERIENCE = "GainExperience",
    DEATH = "Death",
    ASSIST = "GainExperience_experience_id_2",
    EXTREME_THREAT_KILL_ASSIST = "GainExperience_experience_id_372",
    HIGH_THREAT_KILL_ASSIS = "GainExperience_experience_id_371",
    REVIVE = "GainExperience_experience_id_7",
    SQUAD_REVIVE = "GainExperience_experience_id_53",
    HEAL = "GainExperience_experience_id_4",
    SQUAD_HEAL = "GainExperience_experience_id_51",
    HEAL_ASSIST = "GainExperience_experience_id_34",
    SHIELD_REPAIR = "GainExperience_experience_id_438",
    SQUAD_SHIELD_REPAIR = "GainExperience_experience_id_439"
}

export enum GainExperienceId {
    ASSIST = "2",
    HIGH_THREAT_KILL_ASSIS = "371",
    EXTREME_THREAT_KILL_ASSIST = "372",
    REVIVE = "7",
    SQUAD_REVIVE = "53",
    HEAL = "4",
    SQUAD_HEAL = "51",
    HEAL_ASSIST = "34",
    SHIELD_REPAIR = "438",
    SQUAD_SHIELD_REPAIR = "439"
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