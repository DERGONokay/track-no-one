import { Component, OnDestroy, OnInit} from '@angular/core';
import Swal from 'sweetalert2';
import { TrackingService } from '../event/tracking/tracking.service';
import { EventService } from '../event/event.service';
import { PlayerRepository } from '../player/player.repository';
import { OutfitRepository } from '../outfit/outfit.repository';
import { Player } from '../player/player.model';
import { PlayerCombatEffectiveness } from './combat-effectiveness.model';
import { FormControl } from '@angular/forms';
import { CombatEffectivenessService } from './combat-efectiveness.service';
import { KillsHandlerService } from '../event/handler/kills-handler.service';
import { AssistHandlerService } from '../event/handler/assist-handler.service';

@Component({
  selector: 'app-combat-effectiveness',
  templateUrl: './combat-effectiveness.component.html',
  styleUrls: ['./combat-effectiveness.component.css']
})
export class CombatEffectivenessComponent implements OnInit, OnDestroy {

  loadingData = false

  playerName = new FormControl()
  outfitTag = new FormControl()

  trackedPlayers: PlayerCombatEffectiveness[] = []

  constructor(
    private outfitRepository: OutfitRepository,
    private playerRepository: PlayerRepository,
    private trackingService: TrackingService,
    private eventService: EventService,
    private combatEffectivenessService: CombatEffectivenessService,
    private killsHandler: KillsHandlerService,
    private assistHandler: AssistHandlerService
  ) {
    this.trackingService.connect()
    this.subscribeToPlayersCombatEffectiveness();
    this.subscribeToAssists();
    this.subscribeToKills();
  }

  ngOnInit(): void { }
  
  ngOnDestroy() {
    this.trackingService.disconnect()
  }

  private subscribeToPlayersCombatEffectiveness() {
    this.combatEffectivenessService.playersCombatEffectivenessObservable.subscribe(
      trackedPlayers => { this.trackedPlayers = trackedPlayers; }
    );
  }
  
  private subscribeToKills() {
    this.eventService.killEventObservable.subscribe(
      killEvent => {
        this.killsHandler.handle(killEvent).then(
          playerComef => { this.updatePlayerComef(playerComef) }
        ).catch(err => console.error(err))
      }
    );
  }

  private subscribeToAssists() {
    this.eventService.assistEventObservable.subscribe(
      event => { 
        this.assistHandler.handle(event).then(
          playerComef => { this.updatePlayerComef(playerComef) }
        ).catch((err) => { console.error(err)})
      }
    );
  }

  private updatePlayerComef(combatEffectiveness: PlayerCombatEffectiveness) {
    combatEffectiveness.combatEffectiveness = this.combatEffectivenessService.calculateCombatEffectiveness(combatEffectiveness.killerStats)
    this.combatEffectivenessService.playersCombatEffectivesData = this.trackedPlayers
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
    this.trackingService.stopTracking(player)
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
      combatEffectiveness: 0.0,
      killerStats: {
        kills: 0,
        deaths: 0,
        assists: 0,
        teamKills: 0
      }
    };
  }

}
