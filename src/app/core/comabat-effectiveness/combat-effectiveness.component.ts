import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { TrackingService } from '../event/tracking/tracking.service';
import { EventService } from '../event/event.service';
import { PlayerRepository } from '../player/player.repository';
import { OutfitRepository } from '../outfit/outfit.repository';
import { Player } from '../player/player.model';
import { PlayerCombatEffectiveness } from './combat-effectiveness.model';
import { FormControl } from '@angular/forms';
import { CombatEffectivenessService } from './combat-efectiveness.service';
import { KillsHandlerService } from './handler/kills-handler.service';
import { AssistHandlerService } from './handler/assist-handler.service';
import { MedicHandlerService } from './handler/shield-repair-handler.service';
import { ObjectiveEventsService } from '../event/objective-events.service';
import { ObjectiveHandlerService } from './handler/objective-handler.service';

@Component({
  selector: 'app-combat-effectiveness',
  templateUrl: './combat-effectiveness.component.html',
  styleUrls: ['./combat-effectiveness.component.css']
})
export class CombatEffectivenessComponent {

  loadingData = false

  playerName = new FormControl()
  outfitTag = new FormControl()

  trackedPlayers: PlayerCombatEffectiveness[] = []

  constructor(
    private outfitRepository: OutfitRepository,
    private playerRepository: PlayerRepository,
    private trackingService: TrackingService,
    private eventService: EventService,
    private objectiveEvents: ObjectiveEventsService,
    private combatEffectivenessService: CombatEffectivenessService,
    private killsHandler: KillsHandlerService,
    private assistHandler: AssistHandlerService,
    private medicHandler: MedicHandlerService,
    private objectiveEventHandler: ObjectiveHandlerService
  ) {
    this.trackingService.connect()
    this.subscribeToPlayersCombatEffectiveness()
    this.subscribeToKillerEvents();
    this.subscribeToMedicEvents();
    this.subscribeToObjectiveEvents()
  }

  private subscribeToPlayersCombatEffectiveness() {
    this.combatEffectivenessService.playersCombatEffectivenessObservable.subscribe(
      trackedPlayers => { this.trackedPlayers = trackedPlayers; }
    )
  }

  private subscribeToKillerEvents() {
    this.subscribeToKills();
    this.subscribeToAssists();
  }
  
  private subscribeToKills() {
    this.eventService.killEvents.subscribe(
      killEvent => { this.killsHandler.handle(killEvent) }
    )
  }

  private subscribeToAssists() {
    this.eventService.assistEvents.subscribe(
      event => { this.assistHandler.handle(event) }
    )
  }

  private subscribeToMedicEvents() {
    this.subscribeToRevives();
    this.subscribeToHeals();
    this.subscribeToShieldRepairs();
  }

  private subscribeToRevives() {
    this.eventService.reviveEvents.subscribe(
      event => { this.medicHandler.handle(event) }
    )
  }

  private subscribeToHeals() {
    this.eventService.healEvents.subscribe(
      event => { this.medicHandler.handle(event) }
    )
  }

  private subscribeToShieldRepairs() {
    this.eventService.shieldRepairEvents.subscribe(
      event => { this.medicHandler.handle(event) }
    )
  }

  private subscribeToObjectiveEvents() {
    this.subscribeToFacilityCaptures();
    this.subscribeToFacilityDefenses();
    this.subscribeToPointsCapture();
    this.subscribeToPointsDefense();
  }

  private subscribeToPointsDefense() {
    this.objectiveEvents.pointDefenseEvents.subscribe(
      event => { this.objectiveEventHandler.handle(event); }
    );
  }

  private subscribeToPointsCapture() {
    this.objectiveEvents.pointCaptureEvents.subscribe(
      event => { this.objectiveEventHandler.handle(event); }
    );
  }

  private subscribeToFacilityDefenses() {
    this.objectiveEvents.facilityDefenseEvents.subscribe(
      event => { this.objectiveEventHandler.handle(event); }
    );
  }

  private subscribeToFacilityCaptures() {
    this.objectiveEvents.facilityCaptureEvents.subscribe(
      event => { this.objectiveEventHandler.handle(event); }
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
      }
    }
  }

}
