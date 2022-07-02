import { Component, OnDestroy, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { TrackingService } from '../event/tracking/tracking.service';
import { EventService } from '../event/event.service';
import { PlayerRepository } from '../player/player.repository';
import { OutfitRepository } from '../outfit/outfit.repository';
import { Player } from '../player/player.model';
import { PlayerCombatEffectiveness } from './combat-effectiveness.model';
import { UntypedFormControl } from '@angular/forms';
import { CombatEffectivenessService } from './combat-efectiveness.service';
import { KillsHandler } from './handler/kills-handler.service';
import { AssistHandler } from './handler/assist-handler.service';
import { MedicHandler } from './handler/medic-handler.service';
import { ObjectivesHandler as ObjectivesHandler } from './handler/objectives-handler.service';
import { LogisticsHandler } from './handler/logistics-handler.service';
import { LogisticsEvents } from '../event/logistics.events';
import { ObjectiveEvents } from '../event/objective.events';
import { ScoutEvents } from '../event/scout/scout.event';
import { ScoutHandlerService } from './handler/scout-handler.service';
import { EngiEvents } from '../event/engi/engi.event';
import { EngiHandlerService } from './handler/engi-handler.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-combat-effectiveness',
  templateUrl: './combat-effectiveness.component.html',
  styleUrls: ['./combat-effectiveness.component.css']
})
export class CombatEffectivenessComponent implements OnInit {

  loadingData = false

  playerName = new UntypedFormControl()
  outfitTag = new UntypedFormControl()

  trackedPlayers: PlayerCombatEffectiveness[] = []

  constructor(
    private outfitRepository: OutfitRepository,
    private playerRepository: PlayerRepository,
    public trackingService: TrackingService,
    private eventService: EventService,
    private objectiveEvents: ObjectiveEvents,
    private logisticsEvents: LogisticsEvents,
    private scoutEvents: ScoutEvents,
    private engiEvents: EngiEvents,
    private combatEffectivenessService: CombatEffectivenessService,
    private killsHandler: KillsHandler,
    private assistHandler: AssistHandler,
    private medicHandler: MedicHandler,
    private objectivesHandler: ObjectivesHandler,
    private logisticsHandler: LogisticsHandler,
    private scoutHandler: ScoutHandlerService,
    private engiHandler: EngiHandlerService
  ) { }

  ngOnInit(): void {
    this.trackingService.connect();
    this.subscribeToPlayersCombatEffectiveness();
    this.subscribeToKillerEvents();
    this.subscribeToMedicEvents();
    this.subscribeToObjectiveEvents();
    this.subscribeToLogisticsEvents();
    this.subscribeToScoutEvents();
    this.subscribeToEngiEvents();
  }

  private subscribeToPlayersCombatEffectiveness() {
    this.combatEffectivenessService.playersCombatEffectivenessObservable.subscribe(
      trackedPlayers => { this.trackedPlayers = trackedPlayers; }
    );
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

  addPlayer() {
    if(this.loadingData) { return }

    this.loadingData = true
    this.playerName.disable()

    this.playerRepository.findByName(this.playerName.value)
      .then(player => { this.startTracking(player) })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Couldn't find " + this.playerName.value
        })
      })
      .finally(() => {
        this.loadingData = false
        this.playerName.reset()
        this.playerName.enable()
      })

  }

  addOutfit() {
    if(this.loadingData) { return }

    this.loadingData = true
    this.outfitTag.disable()

    this.outfitRepository.findByTag(this.outfitTag.value)
      .then(outfit => {
        console.log("Outfit found", outfit)
        outfit.members?.forEach(player =>{
          this.startTracking(player);
        })
      })
      .catch(error => {
        Swal.fire({
          icon: error,
          title: "Couldn't find outfit with tag " + this.outfitTag.value
        })
      })
      .finally(() => {
        this.loadingData = false
        this.outfitTag.reset()
        this.outfitTag.enable()
      })
  }

  removePlayer(player: PlayerCombatEffectiveness) {
    this.trackingService.stopTracking(player.id)
    this.trackedPlayers = this.trackedPlayers.filter(p => p.id != player.id)
    this.combatEffectivenessService.playersCombatEffectivesData = this.trackedPlayers
  }

  showCombatEffectivenessDialog() {
    Swal.fire({
      icon: "info",
      title: "How is combat effectiveness calculated?",
      html: "Combat effectiveness is the sum of different stats.<br>" +
            "The current calculation uses: KILLER_STATS + OBJECTIVE_STATS + MEDIC_STATS + ENGI_STATS + SCOUT_STATS + LOGISTIC_STATS<br>" +
            "Each one being:<br>" +
            "KILLER_STATS = KDA * KPH<br>" +
            "OBJECTIVE_STATS = FC * (FD*0.20) * CP<br>" +
            "MEDIC_STATS = TR * ((TH + SH) * 0.1)<br>" +
            "ENGI_STATS = SUP * REP/2<br>" +
            "SCOUT_STATS = QS * MS<br>" +
            "LOGISTIC_STATS = (SS + SQ*2) + TA + (BK + RK*4) * 20<br>"
    })
  }

  private startTracking(player: Player) {
    if(!this.isBeingTracked(player)) {
      this.trackingService.startTracking(player)
      this.trackedPlayers.push(this.parseToPlayerCombatEffectiveness(player))
      this.combatEffectivenessService.playersCombatEffectivesData = this.trackedPlayers
    }
  }

  private isBeingTracked(player: Player) {
    return this.trackedPlayers.some(p => p.id == player.id);
  }

  private parseToPlayerCombatEffectiveness(player: Player): PlayerCombatEffectiveness {
    return {
      id: player.id,
      name: player.name,
      faction: player.faction,
      outfitTag: player?.outfit?.tag,
      currentClass: player.currentClass,
      combatEffectiveness: 0.0,
      sessionStart: Date.now(),
      sessionLenghtInSeconds: 1,
      killerStats: {
        kills: 0,
        deaths: 0,
        assists: 0,
        teamKills: 0
      },
      medicStats: {
        revives: 0,
        heals: 0,
        shielding: 0
      },
      objectiveStats: {
        facilitiesCapture: 0,
        facilitiesDefense: 0,
        pointsCapture: 0,
        pointsDefense: 0
      },
      logisticsStats: {
        spawns: 0,
        squadSpanws: 0,
        transportAssits: 0,
        beaconKills: 0,
        routerKills: 0
      },
      scoutStats: {
        qspots: 0,
        motionSpots: 0,
        radarSpots: 0,
        generatorOverloads: 0,
        generatorStabilizations: 0,
        terminalHacks: 0,
        turretHacks: 0,
        motionSensorsDestroyed: 0,
        spitfiresDestroyed: 0
      },
      engiStats: {
        terminalRepairs: 0,
        generatorReparirs: 0,
        infantryResupply: 0,
        vehicleResupply: 0,
        deployableRepairs: 0,
        vehicleRepairs: 0,
        maxRepairs: 0
      }
    }
  }

}
