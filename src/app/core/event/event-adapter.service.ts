import { Injectable } from '@angular/core';
import { InfantryClass } from './event.model';
import { EventService } from './event.service';
import { ObjectiveEventsService } from './objective-events.service';
import { CensusEvent, CensusMessage, CensusPayload, GainExperienceId } from './tracking/tracking.model';

@Injectable({
  providedIn: 'root'
})
export class EventAdapterService {

  constructor(
    private eventService: EventService,
    private objectiveEventsService: ObjectiveEventsService
  ) { }

  adapt(message: CensusMessage) {
    const eventName = message.payload.event_name
    if(this.isKill(eventName)) { this.emmitKill(message.payload) }
    else if(this.isAssist(message)) { this.emmitAssit(message.payload) }
    else if(this.isRevive(message)) { this.emmitRevive(message.payload) }
    else if(this.isHealing(message)) { this.emmitHeal(message.payload) }
    else if(this.isShieldRepair(message)) { this.emmitShieldRepair(message.payload) }
    else if(this.isFacilityCapture(message)) { this.emmitFacilityCapture(message.payload) }
    else if(this.isFacilityDefense(message)) { this.emmitFacilityDefense(message.payload) }
    else if(this.isPointDefense(message)) { this.emmitPointDefense(message.payload) }
    else if(this.isPointCapture(message)) { this.emmitPointCapture(message.payload) }
    else { console.log("Unknown event", message) }
  }

  isPointCapture(message: CensusMessage) {
    return message.payload.experience_id == GainExperienceId.POINT_CAPTURE
  }

  emmitPointCapture(payload: CensusPayload) {
    this.objectiveEventsService.pointCaptureData = {
      playerId: payload.character_id
    }
  }

  isPointDefense(message: CensusMessage) {
    return message.payload.experience_id == GainExperienceId.POINT_DEFENSE
  }

  emmitPointDefense(payload: CensusPayload) {
    this.objectiveEventsService.pointDefenseData = {
      playerId: payload.character_id
    }
  }

  isFacilityDefense(message: CensusMessage) {
    return message.payload.event_name == CensusEvent.FACILITY_DEFENSE
  }

  emmitFacilityDefense(payload: CensusPayload) {
    this.objectiveEventsService.facilityDefenseData = {
      playerId: payload.character_id,
      facilityId: payload.facility_id,
      continentId: payload.world_id,
      hexId: payload.zone_id
    }
  }

  isFacilityCapture(message: CensusMessage): Boolean {
    return message.payload.event_name == CensusEvent.FACILITY_CAPTURE
  }

  emmitFacilityCapture(payload: CensusPayload) {
    this.objectiveEventsService.facilityCaptureData = {
      playerId: payload.character_id,
      facilityId: payload.facility_id,
      continentId: payload.world_id,
      hexId: payload.zone_id
    }
  }

  isShieldRepair(message: CensusMessage): Boolean {
    return message.payload.event_name == CensusEvent.GAIN_EXPERIENCE
        && this.shieldRepairIds.some(id => id == message.payload.experience_id)
  }

  emmitShieldRepair(payload: CensusPayload) {
    this.eventService.shieldRepairData = {
      playerId: payload.character_id
    }
  }
  
  isHealing(message: CensusMessage): Boolean {
    return message.payload.event_name == CensusEvent.GAIN_EXPERIENCE 
        && this.healingIds.some(id => id == message.payload.experience_id)
  }
  
  emmitHeal(payload: CensusPayload) {
    this.eventService.healEventData = {
      playerId: payload.character_id
    }
  }

  private isKill(eventName: String) {
    return eventName == CensusEvent.DEATH;
  }

  private emmitKill(payload: CensusPayload) {
    this.eventService.killEventData = {
      attackerClass: this.resolveClass(payload.attacker_loadout_id),
      victimClass: this.resolveClass(payload.character_loadout_id),
      attackerId: payload.attacker_character_id,
      victimId: payload.character_id,
      wasHeadshot: payload.is_headshot == "0" ? false : true
    }
  }

  private resolveClass(loadoutId: String): InfantryClass {
    switch (loadoutId) {
      case "1": return InfantryClass.INFILTRATOR;
      case "8": return InfantryClass.INFILTRATOR;
      case "15": return InfantryClass.INFILTRATOR;
      case "28": return InfantryClass.INFILTRATOR;
      case "3": return InfantryClass.LIGHT_ASSAULT;
      case "10": return InfantryClass.LIGHT_ASSAULT;
      case "17": return InfantryClass.LIGHT_ASSAULT;
      case "29": return InfantryClass.LIGHT_ASSAULT;
      case "4": return InfantryClass.MEDIC;
      case "11": return InfantryClass.MEDIC;
      case "18": return InfantryClass.MEDIC;
      case "30": return InfantryClass.MEDIC;
      case "5": return InfantryClass.ENGINEER;
      case "12": return InfantryClass.ENGINEER;
      case "19": return InfantryClass.ENGINEER;
      case "31": return InfantryClass.ENGINEER;
      case "6": return InfantryClass.HEAVY_ASSAULT;
      case "13": return InfantryClass.HEAVY_ASSAULT;
      case "20": return InfantryClass.HEAVY_ASSAULT;
      case "32": return InfantryClass.HEAVY_ASSAULT;
      case "7": return InfantryClass.MAX;
      case "14": return InfantryClass.MAX;
      case "21": return InfantryClass.MAX;
      case "45": return InfantryClass.MAX;
      default: return InfantryClass.UNKNOWN;
    }
  }

  private isAssist(message: CensusMessage) {
    return message.payload.event_name == CensusEvent.GAIN_EXPERIENCE && this.isAssistExperienceId(message)
  }
  
  private isAssistExperienceId(message: CensusMessage) {
    return this.assistIds.some(assistId => assistId == message.payload.experience_id)
  }

  private emmitAssit(payload: CensusPayload) {
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

  private emmitRevive(payload: CensusPayload) {
    this.eventService.reviveEventData = {
      playerId: payload.character_id
    }
  }

  private readonly assistIds = [GainExperienceId.ASSIST, GainExperienceId.HIGH_THREAT_KILL_ASSIS, GainExperienceId.EXTREME_THREAT_KILL_ASSIST]
  private readonly healingIds = [GainExperienceId.HEAL, GainExperienceId.SQUAD_HEAL, GainExperienceId.HEAL_ASSIST]
  private readonly shieldRepairIds = [GainExperienceId.SHIELD_REPAIR, GainExperienceId.SQUAD_SHIELD_REPAIR]
}
