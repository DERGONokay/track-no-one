import { Component, OnInit} from '@angular/core';
import Swal from 'sweetalert2';
import { TrackingService } from '../event/tracking/tracking.service';
import { EventService } from '../event/event.service';
import { PlayerRepository } from '../player/player.repository';
import { OutfitRepository } from '../outfit/outfit.repository';
import { Player } from '../player/player.model';
import { PlayerCombatEffectiveness } from './combat-effectiveness.model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-combat-effectiveness',
  templateUrl: './combat-effectiveness.component.html',
  styleUrls: ['./combat-effectiveness.component.css']
})
export class CombatEffectivenessComponent implements OnInit {

  loadingData = false

  playerName = new FormControl()
  outfitTag = new FormControl()

  trackedPlayers: PlayerCombatEffectiveness[] = []

  constructor(
    private outfitRepository: OutfitRepository,
    private playerRepository: PlayerRepository,
    private trackingService: TrackingService,
    private eventService: EventService
  ) {
    this.trackingService.connect()
    this.subscribeToAssists();
    this.subscribeToKills();
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.trackingService.disconnect()
  }

  private subscribeToKills() {
    this.eventService.killEventObservable.subscribe(
      event => {
        const attacker = this.trackedPlayers.find(d => d.id == event.attackerId);
        const victim = this.trackedPlayers.find(d => d.id == event.victimId);

        if (attacker) {
          this.playerRepository.findById(event.victimId).then(killedPlayer => {
            if(attacker.faction == killedPlayer.faction) {
              console.log(attacker.name + " team killed " + killedPlayer.name)
              attacker.teamKills += 1
            } else {
              console.log(attacker.name + " killed " + killedPlayer.name)
              attacker.kills += 1;
            }
            this.updatePlayerComef(attacker);
          })
        } else if (victim) {
          console.log(victim.name + " got killed")
          victim.deaths += 1;
          this.updatePlayerComef(victim);
        }
      }
    );
  }

  private subscribeToAssists() {
    this.eventService.assistEventObservable.subscribe(
      event => {
        const player = this.trackedPlayers.find(d => d.id == event.playerId);

        if (player) {
          console.log(player.name + " made an assist")
          player.assists += 1;
          this.updatePlayerComef(player);
        }
      }
    );
  }

  private updatePlayerComef(combatEffectiveness: PlayerCombatEffectiveness) {
    const deaths = combatEffectiveness.deaths == 0 ? 1 : combatEffectiveness.deaths
    const kda = ((combatEffectiveness.kills + combatEffectiveness.assists - combatEffectiveness.teamKills) / deaths) * 0.6
    combatEffectiveness.combatEffectiveness = kda
    console.log(combatEffectiveness.name + " new COMEF", combatEffectiveness)
  }

  addPlayer() {
    this.loadingData = true
    this.playerName.disable()

    this.playerRepository.findById(this.playerName.value)
      .then(player => { this.startTracking(player) })
      .catch(error => {
        Swal.fire({
          icon: error,
          title: "Couldn't find " + this.playerName
        })
      })
      .finally(() => {
        this.loadingData = false
        this.playerName.reset()
        this.playerName.enable()
      })

  }

  addOutfit() {
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
          title: "Couldn't find outfit with tag " + this.outfitTag
        })
      })
      .finally(() => {
        this.loadingData = false
        this.outfitTag.reset()
        this.outfitTag.enable()
      })
  }

  private startTracking(player: Player) {
    this.trackingService.startTracking(player.id)
    this.trackedPlayers.push({
      id: player.id,
      name: player.name,
      faction: player.faction,
      outfitTag: player?.outfit?.tag,
      combatEffectiveness: 0.0,
      kills: 0,
      deaths: 0,
      assists: 0,
      teamKills: 0
    })
  }

  removePlayer(player: PlayerCombatEffectiveness) {
    this.trackedPlayers = this.trackedPlayers.filter(p => p.id != player.id)
    this.trackingService.stopTracking(player.id)
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

}
