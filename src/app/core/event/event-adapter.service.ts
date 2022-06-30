import { Injectable } from '@angular/core';
import { EventService } from './event.service';
import { CensusEvent, CensusMessage, CensusPayload, GainExperienceId } from './tracking/tracking.model';

@Injectable({
  providedIn: 'root'
})
export class EventAdapterService {

  constructor(
    private eventService: EventService
  ) { }

  adapt(message: CensusMessage) {
    const eventName = message.payload.event_name

    if(this.isKill(eventName)) {
      this.adaptDeathEvent(message.payload)
    } else if(this.isAssist(message)) {
      this.adaptAssistEvent(message.payload)
    } else if(this.isRevive(message)) {
      this.adaptReviveEvent(message.payload)
    } else if(this.isHealing(message)) {
      this.adaptHealingEvent(message.payload)
    } else if(this.isShieldRepair(message)) {
      this.adaptShieldRepair(message.payload)
    } else {
      console.log("Unknown event", message)
    }
  }

  isShieldRepair(message: CensusMessage): Boolean {
    return message.payload.event_name == CensusEvent.GAIN_EXPERIENCE
        && this.shieldRepairIds.some(id => id == message.payload.experience_id)
  }
  adaptShieldRepair(payload: CensusPayload) {
    this.eventService.shieldRepairData = {
      playerId: payload.character_id
    }
  }
  
  isHealing(message: CensusMessage): Boolean {
    return message.payload.event_name == CensusEvent.GAIN_EXPERIENCE 
        && this.healingIds.some(id => id == message.payload.experience_id)
  }
  
  adaptHealingEvent(payload: CensusPayload) {
    this.eventService.healEventData = {
      playerId: payload.character_id
    }
  }

  private isKill(eventName: String) {
    return eventName == CensusEvent.DEATH;
  }

  /**
   * Converts a Death event into a KillEvent
   * @param payload Census API event payload
   */
  private adaptDeathEvent(payload: CensusPayload) {
    this.eventService.killEventData = {
      attackerId: payload.attacker_character_id,
      victimId: payload.character_id,
      wasHeadshot: payload.is_headshot == "0" ? false : true
    }
  }

  private isAssist(message: CensusMessage) {
    return message.payload.event_name == CensusEvent.GAIN_EXPERIENCE && this.isAssistExperienceId(message)
  }
  
  private isAssistExperienceId(message: CensusMessage) {
    return message.payload.experience_id == GainExperienceId.ASSIST 
        || message.payload.experience_id == GainExperienceId.HIGH_THREAT_KILL_ASSIS 
        || message.payload.experience_id == GainExperienceId.EXTREME_THREAT_KILL_ASSIST
  }

  /**
   * Convers a GainExperience event into an AssistEvent
   * @param payload Census API event payload
   */
  private adaptAssistEvent(payload: CensusPayload) {
    this.eventService.assistEventData = {
      playerId: payload.character_id
    }
  }

  private isRevive(message: CensusMessage) {
    return message.payload.event_name == CensusEvent.GAIN_EXPERIENCE && this.isReviveExperienceId(message)
  }

  private isReviveExperienceId(message: CensusMessage) {
    return message.payload.experience_id == GainExperienceId.REVIVE 
        || message.payload.experience_id == GainExperienceId.SQUAD_REVIVE 
  }

  private adaptReviveEvent(payload: CensusPayload) {
    this.eventService.reviveEventData = {
      playerId: payload.character_id
    }
  }

  private readonly healingIds = [GainExperienceId.HEAL, GainExperienceId.SQUAD_HEAL, GainExperienceId.HEAL_ASSIST]
  private readonly shieldRepairIds = [GainExperienceId.SHIELD_REPAIR, GainExperienceId.SQUAD_SHIELD_REPAIR]
}
