import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { TrackingService } from '../event/tracking/tracking.service';
import { PlayerRepository } from '../player/player.repository';
import { OutfitRepository } from '../outfit/outfit.repository';
import { Outfit, Player } from '../player/player.model';
import { PlayerCombatEffectiveness } from './combat-effectiveness.model';
import { UntypedFormControl } from '@angular/forms';
import { CombatEffectivenessService } from './combat-efectiveness.service';
import { PlayerEventsListenerService } from '../event/listener/player-events-listener.service';
import { AnalyticsService } from '../analytics/analytics.service';
import { DescriptionService as LastEventsDescriptionService } from '../event/description.service';
import { OutfitEvents } from '../event/outfit/player.event';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-combat-effectiveness',
  templateUrl: './combat-effectiveness.component.html',
  styleUrls: ['./combat-effectiveness.component.css']
})
export class CombatEffectivenessComponent implements OnInit {

  loadingData = false
  connectionReady: Boolean = false

  playerName = new UntypedFormControl()
  outfitTag = new UntypedFormControl()

  displayedColumns = ["class", "name", "comef", "actions"]
  trackedPlayers = new MatTableDataSource<PlayerCombatEffectiveness>()
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined
  @ViewChild(MatSort) sort: MatSort | undefined

  trackedOutfits: Outfit[] = []
  lastEvents: String[] = []

  constructor(
    public trackingService: TrackingService,
    private outfitRepository: OutfitRepository,
    private playerRepository: PlayerRepository,
    private combatEffectivenessService: CombatEffectivenessService,
    private playerEventsListener: PlayerEventsListenerService,
    private lastEventsService: LastEventsDescriptionService,
    private outfitEvents: OutfitEvents,
    private analytics: AnalyticsService,
  ) { }

  ngOnInit(): void {
    this.trackingService.connect()
    this.playerEventsListener.stratListening()
    this.combatEffectivenessService.playersCombatEffectivenessObservable.subscribe(
      playersComef => { this.trackedPlayers.data = playersComef }
    )

    this.lastEventsService.eventDescription.subscribe(
      description => { 
        this.lastEvents.unshift(description)
        if(this.lastEvents.length > 50) {
          this.lastEvents.pop()
        }
        this.refreshSort();
      }
    )

    this.trackingService.connectionStatus.subscribe(
      status => { this.connectionReady = status }
    )

    this.outfitEvents.outfitsTracked.subscribe(
      outfits => { this.trackedOutfits = outfits }
    )
  }

  private refreshSort() {
    this.trackedPlayers.sort = null;
    this.trackedPlayers.sort = this.sort!!;
  }

  ngAfterViewInit() {
    this.trackedPlayers.paginator = this.paginator!!
    this.trackedPlayers.sort = this.sort!!
  }

  addPlayer() {
    if(this.loadingData) { return }

    this.analytics.addPlayerClick(this.playerName.value)

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
    this.analytics.addOutfitClick(this.outfitTag.value)
    this.loadingData = true
    this.outfitTag.disable()
    this.outfitRepository.findByTag(this.outfitTag.value)
      .then(outfit => {
        console.log("Outfit found", outfit);

        if(!outfit.onlinePlayers || outfit.onlinePlayers.length == 0) {
          Swal.fire({
            icon: "info",
            title: "No online members found in " + outfit.name,
            text: "Only online members are tracked"
          });
        } else {
          if(!this.isAlreadyTracked(outfit)) {
            this.trackedOutfits.push(outfit)
            this.outfitEvents.outfitsTrackedData = this.trackedOutfits
          }
          
          outfit.onlinePlayers.forEach(member => {
            this.playerRepository
              .findById(member.id)
              .then(player => {
                this.startTracking(player)
              })
          })

          const offlineMembers = outfit.offlinePlayers!!.map(p => p.id)
          this.trackingService.startTrackingIds(offlineMembers)
        }
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Couldn't find outfit with tag " + this.outfitTag.value
        });
      })
      .finally(() => {
        this.loadingData = false
        this.outfitTag.reset()
        this.outfitTag.enable()
      })
  }

  private isAlreadyTracked(outfit: Outfit) {
    return this.trackedOutfits.some(o => o.id == outfit.id);
  }

  removePlayer(playerComef: PlayerCombatEffectiveness) {
    this.analytics.playerSessionEnded(playerComef)
    this.trackedPlayers.data = this.trackedPlayers.data.filter(p => p.id != playerComef.id)
    this.combatEffectivenessService.playersCombatEffectivesData = this.trackedPlayers.data
  }

  showCombatEffectivenessDialog() {
    this.analytics.comefHelpShow()
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
      this.trackedPlayers.data.push(this.combatEffectivenessService.parseToCombatEffectiveness(player))
      this.combatEffectivenessService.playersCombatEffectivesData = this.trackedPlayers.data
    }
  }

  private isBeingTracked(player: Player) {
    return this.trackedPlayers.data.some(p => p.id == player.id);
  }

}
