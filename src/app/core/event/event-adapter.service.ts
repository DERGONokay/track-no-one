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

    if(eventName == CensusEvent.DEATH) {
      this.adaptDeathEvent(message.payload)
    } else if(this.isAssist(message)) {
      this.adaptAssistEvent(message.payload)
    } else {
      console.log("Unknown event " + eventName)
    }
  }

  private isAssist(message: CensusMessage) {
    return message.payload.event_name == CensusEvent.GAIN_EXPERIENCE 
          && message.payload.experience_id == GainExperienceId.ASSIST
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

  /**
   * Convers a GainExperience event into an AssistEvent
   * @param payload Census API event payload
   */
  private adaptAssistEvent(payload: CensusPayload) {
    this.eventService.assistEventData = {
      playerId: payload.character_id
    }
  }
}
