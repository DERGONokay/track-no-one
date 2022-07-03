import { Injectable } from '@angular/core';
import { AssistHandler } from '../../comabat-effectiveness/handler/assist-handler.service';
import { EngiHandlerService as EngiHandler } from '../../comabat-effectiveness/handler/engi-handler.service';
import { KillsHandler } from '../../comabat-effectiveness/handler/kills-handler.service';
import { LogisticsHandler } from '../../comabat-effectiveness/handler/logistics-handler.service';
import { MedicHandler } from '../../comabat-effectiveness/handler/medic-handler.service';
import { ObjectivesHandler } from '../../comabat-effectiveness/handler/objectives-handler.service';
import { ScoutHandlerService as ScoutHandler } from '../../comabat-effectiveness/handler/scout-handler.service';
import { EngiEvents } from '../engi/engi.event';
import { EventService } from '../event.service';
import { LogisticsEvents } from '../logistics.events';
import { ObjectiveEvents } from '../objective.events';
import { ScoutEvents } from '../scout/scout.event';

@Injectable({
  providedIn: 'root'
})
export class PlayerEventsListenerService {

  private listening: boolean = false;

  constructor(
    private eventService: EventService,
    private objectiveEvents: ObjectiveEvents,
    private logisticsEvents: LogisticsEvents,
    private scoutEvents: ScoutEvents,
    private engiEvents: EngiEvents,
    private killsHandler: KillsHandler,
    private assistHandler: AssistHandler,
    private medicHandler: MedicHandler,
    private objectivesHandler: ObjectivesHandler,
    private logisticsHandler: LogisticsHandler,
    private scoutHandler: ScoutHandler,
    private engiHandler: EngiHandler
  ) { }

  stratListening(): void {
    if(!this.listening) {
      this.listening = true;
      this.subscribeToKillerEvents();
      this.subscribeToMedicEvents();
      this.subscribeToObjectiveEvents();
      this.subscribeToLogisticsEvents();
      this.subscribeToScoutEvents();
      this.subscribeToEngiEvents();
      console.log("Started listening player events")
    }
  }

  private subscribeToKillerEvents() {
    this.subscribeToKills();
    this.subscribeToAssists();
  }
  
  private subscribeToKills() {
    this.eventService.killEvents.subscribe(
      killEvent => { this.killsHandler.handle(killEvent) }
    );
  }

  private subscribeToAssists() {
    this.eventService.assistEvents.subscribe(
      event => { this.assistHandler.handle(event) }
    );
  }

  private subscribeToMedicEvents() {
    this.subscribeToRevives();
    this.subscribeToHeals();
    this.subscribeToShieldRepairs();
  }

  private subscribeToRevives() {
    this.eventService.reviveEvents.subscribe(
      event => { this.medicHandler.handle(event) }
    );
  }

  private subscribeToHeals() {
    this.eventService.healEvents.subscribe(
      event => { this.medicHandler.handle(event) }
    );
  }

  private subscribeToShieldRepairs() {
    this.eventService.shieldRepairEvents.subscribe(
      event => { this.medicHandler.handle(event) }
    );
  }

  private subscribeToObjectiveEvents() {
    this.subscribeToFacilityCaptures();
    this.subscribeToFacilityDefenses();
    this.subscribeToPointsCapture();
    this.subscribeToPointsDefense();
  }

  private subscribeToPointsDefense() {
    this.objectiveEvents.pointDefenseEvents.subscribe(
      event => { this.objectivesHandler.handle(event); }
    );
  }

  private subscribeToPointsCapture() {
    this.objectiveEvents.pointCaptureEvents.subscribe(
      event => { this.objectivesHandler.handle(event); }
    );
  }

  private subscribeToFacilityDefenses() {
    this.objectiveEvents.facilityDefenseEvents.subscribe(
      event => { this.objectivesHandler.handle(event); }
    );
  }

  private subscribeToFacilityCaptures() {
    this.objectiveEvents.facilityCaptureEvents.subscribe(
      event => { this.objectivesHandler.handle(event); }
    );
  }

  private subscribeToLogisticsEvents() {
    this.subscribeToSpawns();
    this.subscribeToSquadSpawns();
    this.subscribeToTransportAssists();
    this.subscribeToBeaconKills();
    this.subscribeToRouterKills();
  }

  private subscribeToSquadSpawns() {
    this.logisticsEvents.squadSpawnEvents.subscribe(
      event => { this.logisticsHandler.handle(event); }
    );
  }

  private subscribeToTransportAssists() {
    this.logisticsEvents.transportAssistEvents.subscribe(
      event => { this.logisticsHandler.handle(event); }
    );
  }

  private subscribeToBeaconKills() {
    this.logisticsEvents.beaconKillEvents.subscribe(
      event => { this.logisticsHandler.handle(event); }
    );
  }

  private subscribeToSpawns() {
    this.logisticsEvents.spawnEvents.subscribe(
      event => { this.logisticsHandler.handle(event); }
    );
  }

  private subscribeToRouterKills() {
    this.logisticsEvents.routerKillEvents.subscribe(
      event => { this.logisticsHandler.handle(event); }
    );
  }

  private subscribeToScoutEvents() {
    this.subscribeToQSpots();
    this.subscribeToMotionSpots();
    this.subscribeToScoutRadarSpots();
    this.subscribeToGenerationOverloads();
    this.subscribeToGeneratorStabilizations();
    this.subscribeToTerminalHacks();
    this.subscribeToTurretHacks();
    this.subscribeToMotionSensorDestruciton();
    this.subscribeToSpitfireDestruction();
  }

  private subscribeToQSpots() {
    this.scoutEvents.qSpotEvents.subscribe(
      event => { this.scoutHandler.handle(event); }
    );
  }

  private subscribeToMotionSpots() {
    this.scoutEvents.motionSpotEvents.subscribe(
      event => { this.scoutHandler.handle(event); }
    );
  }

  private subscribeToScoutRadarSpots() {
    this.scoutEvents.scoutRadarSpotEvents.subscribe(
      event => { this.scoutHandler.handle(event); }
    );
  }

  private subscribeToGenerationOverloads() {
    this.scoutEvents.generatorOverloadEvents.subscribe(
      event => { this.scoutHandler.handle(event); }
    );
  }

  private subscribeToGeneratorStabilizations() {
    this.scoutEvents.generatorStabilizeEvents.subscribe(
      event => { this.scoutHandler.handle(event); }
    );
  }

  private subscribeToTerminalHacks() {
    this.scoutEvents.terminalHackEvents.subscribe(
      event => { this.scoutHandler.handle(event); }
    );
  }

  private subscribeToTurretHacks() {
    this.scoutEvents.turretHackEvents.subscribe(
      event => { this.scoutHandler.handle(event); }
    );
  }

  private subscribeToMotionSensorDestruciton() {
    this.scoutEvents.motionSensorKillEvents.subscribe(
      event => { this.scoutHandler.handle(event); }
    );
  }

  private subscribeToSpitfireDestruction() {
    this.scoutEvents.spitfireDestroyEvents.subscribe(
      event => { this.scoutHandler.handle(event); }
    );
  }

  private subscribeToEngiEvents() {
    this.subscribeToTerminalRepairs();
    this.subscribeToGeneratorRepairs();
    this.subscribeToInfantryResuplies();
    this.subscribeToVehicleResupplies();
    this.subscribeToDeployableRepairs();
    this.subscribeToVehicleRepairs();
    this.subscribeToMaxRepairs();
  }

  private subscribeToTerminalRepairs() {
    this.engiEvents.terminalRepairEvents.subscribe(
      event => { this.engiHandler.handle(event); }
    );
  }

  private subscribeToGeneratorRepairs() {
    this.engiEvents.generatorRepairEvents.subscribe(
      event => { this.engiHandler.handle(event); }
    );
  }

  private subscribeToInfantryResuplies() {
    this.engiEvents.infantryResupplyEvents.subscribe(
      event => { this.engiHandler.handle(event); }
    );
  }

  private subscribeToVehicleResupplies() {
    this.engiEvents.vehicleResupplyEvents.subscribe(
      event => { this.engiHandler.handle(event); }
    );
  }

  private subscribeToDeployableRepairs() {
    this.engiEvents.deployableRepairEvents.subscribe(
      event => { this.engiHandler.handle(event); }
    );
  }

  private subscribeToVehicleRepairs() {
    this.engiEvents.vehicleRepairEvents.subscribe(
      event => { this.engiHandler.handle(event); }
    );
  }

  private subscribeToMaxRepairs() {
    this.engiEvents.maxRepairEvents.subscribe(
      event => { this.engiHandler.handle(event); }
    );
  }
}
