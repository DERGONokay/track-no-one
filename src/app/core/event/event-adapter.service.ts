import { Injectable } from '@angular/core';
import { InfantryClass } from './event.model';
import { EventService } from './event.service';
import { LogisticsEvents as LogisticsEvents } from './logistics.events';
import { ObjectiveEvents } from './objective.events';
import { ScoutEvents } from './scout/scout.events';
import { CensusEvent, CensusMessage, CensusPayload, GainExperienceId } from './tracking/tracking.model';

@Injectable({
  providedIn: 'root'
})
export class EventAdapterService {

  constructor(
    private eventService: EventService,
    private objectiveEventsService: ObjectiveEvents,
    private logisticsEvents: LogisticsEvents,
    private scoutEvents: ScoutEvents
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
    else if(this.isSpawn(message)) { this.emmitSpawn(message.payload) }
    else if(this.isSquadSpawn(message)) { this.emmitSquadSpawn(message.payload) }
    else if(this.isTransportAssist(message)) { this.emmitTransportAssist(message.payload) }
    else if(this.isBeaconKill(message)) { this.emmitBeaconKill(message.payload) }
    else if(this.isRouterKill(message)) { this.emmitRouterkill(message.payload) }
    else if(this.isQSpot(message)) { this.emmitQSpot(message.payload) }
    else if(this.isMotionSpot(message)) { this.emmitMotionSpot(message.payload) }
    else if(this.isScoutRadarSpot(message)) { this.emmitScoutRadarSpot(message.payload) }
    else if(this.isGeneratorOverload(message)) { this.emmitGeneratorOverload(message.payload) }
    else if(this.isGeneratorStabilize(message)) { this.emmitGeneratorStabilize(message.payload) }
    else if(this.isTerminalHack(message)) { this.emmitTerminalHack(message.payload) }
    else if(this.isTurrethack(message)) { this.emmitTurretHack(message.payload) }
    else if(this.isMotionSensorDestroy(message)) { this.emmitMotionSensorDestroy(message.payload) }
    else { console.log("Unknown event", message) }
  }

  private isMotionSensorDestroy(message: CensusMessage): Boolean {
    return message.payload.experience_id == GainExperienceId.MOTION_SENSOR_DESTROY
  }

  private emmitMotionSensorDestroy(payload: CensusPayload) {
    this.scoutEvents.motionSensorKillData = {
      playerId: payload.character_id,
      type: "motionSensorDestroy"
    }
  }

  private isTurrethack(message: CensusMessage): Boolean {
    return message.payload.experience_id == GainExperienceId.TURRET_HACK
  }

  private emmitTurretHack(payload: CensusPayload) {
    this.scoutEvents.turretHackData = {
      playerId: payload.character_id,
      type: "turretHack"
    }
  }

  private isTerminalHack(message: CensusMessage): Boolean {
    return message.payload.experience_id == GainExperienceId.TERMINAL_HACK
  }

  private emmitTerminalHack(payload: CensusPayload) {
    this.scoutEvents.terminalHackData = {
      playerId: payload.character_id,
      type: "terminalHack"
    }
  }

  private isGeneratorStabilize(message: CensusMessage): Boolean {
    return message.payload.experience_id == GainExperienceId.GENERATOR_STABILIZED
  }

  private emmitGeneratorStabilize(payload: CensusPayload) {
    this.scoutEvents.generatorStabilizeData = {
      playerId: payload.character_id,
      type: "stabilize"
    }
  }

  private isGeneratorOverload(message: CensusMessage): Boolean {
    return message.payload.experience_id == GainExperienceId.GENERATOR_OVERLOADED
  }

  private emmitGeneratorOverload(payload: CensusPayload) {
    this.scoutEvents.generatorOverloadData = {
      playerId: payload.character_id,
      type: "overload"
    }
  }

  private isScoutRadarSpot(message: CensusMessage): Boolean {
    return message.payload.experience_id == GainExperienceId.SCOUT_RADAR
      || message.payload.experience_id == GainExperienceId.SQUAD_SCOUT_RADAR
  }

  private emmitScoutRadarSpot(payload: CensusPayload) {
    this.scoutEvents.motionSpotData = {
      playerId: payload.character_id,
      type: "motionSpot"
    }
  }

  private isMotionSpot(message: CensusMessage): Boolean {
    return message.payload.experience_id == GainExperienceId.MOTION_SPOTTER
      || message.payload.experience_id == GainExperienceId.SQUAD_MOTION_SPOTTER
  }

  private emmitMotionSpot(payload: CensusPayload) {
    this.scoutEvents.motionSpotData = {
      playerId: payload.character_id,
      type: "motionSpot"
    }
  }

  private isQSpot(message: CensusMessage): Boolean {
    return message.payload.experience_id == GainExperienceId.Q_SPOT
      || message.payload.experience_id == GainExperienceId.SQUAD_Q_SPOT
  }

  private emmitQSpot(payload: CensusPayload) {
    this.scoutEvents.qSpotEventData = {
      playerId: payload.character_id,
      type: "qspot"
    }
  }

  private isRouterKill(message: CensusMessage): Boolean {
    return message.payload.experience_id == GainExperienceId.ROUTER_KILL
  }

  private emmitRouterkill(payload: CensusPayload) {
    this.logisticsEvents.routerKillData = {
      playerId: payload.character_id,
      type: "routerKill"
    }
  }

  private isBeaconKill(message: CensusMessage): Boolean {
    return message.payload.experience_id == GainExperienceId.BEACON_KILL
  }

  private emmitBeaconKill(payload: CensusPayload) {
    this.logisticsEvents.beaconKillData = {
      playerId: payload.character_id,
      type: "beaconKill"
    }
  }

  private isTransportAssist(message: CensusMessage): Boolean {
    return message.payload.experience_id == GainExperienceId.TRANSPORT_ASSIST
  }

  private emmitTransportAssist(payload: CensusPayload) {
    this.logisticsEvents.transportAssistData = {
      playerId: payload.character_id,
      type: "transportAssist"
    }
  }

  private isSquadSpawn(message: CensusMessage): Boolean {
    return this.squadSpawnIds.some(id => id == message.payload.experience_id)
  }

  private emmitSquadSpawn(payload: CensusPayload) {
    this.logisticsEvents.squadSpawnData = {
      playerId: payload.character_id,
      type: "squadSpawn"
    }
  }

  private isSpawn(message: CensusMessage) {
    return this.spawnIds.some(id => id == message.payload.experience_id)
  }

  private emmitSpawn(payload: CensusPayload) {
    this.logisticsEvents.spawnData = {
      playerId: payload.character_id,
      type: "spawn"
    }
  }

  private isPointCapture(message: CensusMessage) {
    return message.payload.experience_id == GainExperienceId.POINT_CAPTURE
  }

  private emmitPointCapture(payload: CensusPayload) {
    this.objectiveEventsService.pointCaptureData = {
      playerId: payload.character_id,
      type: "pointCapture"
    }
  }

  private isPointDefense(message: CensusMessage) {
    return message.payload.experience_id == GainExperienceId.POINT_DEFENSE
  }

  private emmitPointDefense(payload: CensusPayload) {
    this.objectiveEventsService.pointDefenseData = {
      playerId: payload.character_id,
      type: "pointDefense"
    }
  }

  private isFacilityDefense(message: CensusMessage) {
    return message.payload.event_name == CensusEvent.FACILITY_DEFENSE
  }

  private emmitFacilityDefense(payload: CensusPayload) {
    this.objectiveEventsService.facilityDefenseData = {
      playerId: payload.character_id,
      facilityId: payload.facility_id,
      continentId: payload.world_id,
      hexId: payload.zone_id,
      type: "facilityDefense"
    }
  }

  private isFacilityCapture(message: CensusMessage): Boolean {
    return message.payload.event_name == CensusEvent.FACILITY_CAPTURE
  }

  private emmitFacilityCapture(payload: CensusPayload) {
    this.objectiveEventsService.facilityCaptureData = {
      playerId: payload.character_id,
      facilityId: payload.facility_id,
      continentId: payload.world_id,
      hexId: payload.zone_id,
      type: "facilityCapture"
    }
  }

  private isShieldRepair(message: CensusMessage): Boolean {
    return this.shieldRepairIds.some(id => id == message.payload.experience_id)
  }

  private emmitShieldRepair(payload: CensusPayload) {
    this.eventService.shieldRepairData = {
      playerId: payload.character_id,
      type: "shieldRepair"
    }
  }
  
  private isHealing(message: CensusMessage): Boolean {
    return this.healingIds.some(id => id == message.payload.experience_id)
  }
  
  private emmitHeal(payload: CensusPayload) {
    this.eventService.healEventData = {
      playerId: payload.character_id,
      type: "heal"
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
      wasHeadshot: payload.is_headshot == "0" ? false : true,
      type: "kill"
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
    return this.assistIds.some(assistId => assistId == message.payload.experience_id)
  }

  private emmitAssit(payload: CensusPayload) {
    this.eventService.assistEventData = {
      playerId: payload.character_id,
      type: "assist"
    }
  }

  private isRevive(message: CensusMessage) {
    return message.payload.experience_id == GainExperienceId.REVIVE || message.payload.experience_id == GainExperienceId.SQUAD_REVIVE 
  }

  private emmitRevive(payload: CensusPayload) {
    this.eventService.reviveEventData = {
      playerId: payload.character_id,
      revivedPlayerId: payload.other_id,
      type: "revive"
    }
  }

  private readonly assistIds = [GainExperienceId.ASSIST, GainExperienceId.HIGH_THREAT_KILL_ASSIS, GainExperienceId.EXTREME_THREAT_KILL_ASSIST]
  private readonly healingIds = [GainExperienceId.HEAL, GainExperienceId.SQUAD_HEAL, GainExperienceId.HEAL_ASSIST]
  private readonly shieldRepairIds = [GainExperienceId.SHIELD_REPAIR, GainExperienceId.SQUAD_SHIELD_REPAIR]
  private readonly spawnIds = [GainExperienceId.SUNDERER_SPAWN, GainExperienceId.LODESTAR_SPAWN]
  private readonly squadSpawnIds = [GainExperienceId.SQUAD_SPAWN, GainExperienceId.GALAXY_SPAWN, GainExperienceId.VALKYRIE_SPAWN]
}
