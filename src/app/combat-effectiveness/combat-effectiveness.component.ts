import { Component, OnInit} from '@angular/core';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { OnlineStatus, OutfitService } from '../outfit.service';
import { webSocket, WebSocketSubject } from "rxjs/webSocket";
import { Player, PlayerResponse, PlayerService } from '../player.service';

@Component({
  selector: 'app-combat-effectiveness',
  templateUrl: './combat-effectiveness.component.html',
  styleUrls: ['./combat-effectiveness.component.css']
})
export class CombatEffectivenessComponent implements OnInit {

  private subject: WebSocketSubject<Object>

  loadingData = false

  playerName = ""
  outfitTag = ""

  data: Comef[] = []
  events: CensusMessage[] = []
  players: Player[] = []

  constructor(
    private outfitService: OutfitService,
    private playerService: PlayerService
  ) {
    this.subject = webSocket(environment.wssHost)
    this.subject.subscribe(
      msg => {
        let message = msg as CensusMessage
        console.log("Message received: " + message.service)
        if(message.service == "event" && message.type != "heartbeat" && message.type != "serviceStateChanged") {
          this.preloadPlayers(message.payload)
          this.events.unshift(message)

          if(message.payload.event_name == CensusEvent.DEATH) {
            this.handleDeath(message);
          } else if(message.payload.event_name == CensusEvent.ASSIST) {
            const comef = this.data.find(p => p.id == message.payload.character_id);
            if(comef) {
              comef.assists += 1
              this.updatePlayerComef(comef)
            }
          }

        }
      },

      err => {
        console.log(err)
      },

      () => {
        console.log("Complete")
      }
    )
  }

  private handleDeath(message: CensusMessage) {
    const event = message.payload;

    const attacker = this.players.find(p => p.character_id == event.attacker_character_id);
    const victim = this.players.find(p => p.character_id == event.character_id);
    const comef = this.data.find(p => p.id == attacker?.character_id);

    if (comef) { // If attacker is being tracked
      //kill
      if (attacker?.faction_id == victim?.faction_id) {
        comef.teamKills += 1;
      } else {
        comef.kills += 1;
      }
      this.updatePlayerComef(comef);
    } else {
      const victimComef = this.data.find(p => p.id == victim?.character_id);
      if (victimComef) {
        victimComef.deaths += 1;
        this.updatePlayerComef(victimComef);
      }
    }
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.subject.complete()
  }

  private preloadPlayers(event: CensusPayload) {
    if (!this.playerExists(event.attacker_character_id)) {
      this.loadPlayer(event.attacker_character_id);
    }
    if (!this.playerExists(event.character_id)) {
      this.loadPlayer(event.character_id);
    }
  }

  private updatePlayerComef(comef: Comef) {
    const deaths = comef.deaths == 0 ? 1 : comef.deaths
    const kda = ((comef.kills + comef.assists - comef.teamKills) / deaths) * 0.6
    comef.combatEffectiveness = kda
    console.log(comef.name + " new COMEF", comef)
  }

  addPlayer() {
    this.loadingData = true

    this.playerService.findPlayerByName(this.playerName).subscribe(
      (response: PlayerResponse) => {
        this.loadingData = false
        if(response.returned > 0) {
          const player = response.character_list[0]

          if(this.alreadyTracking(player.character_id)) {
            console.log("Already tracking " + player.name.first)
            return
          }

          console.log("Tracking " + player.name.first + ". ID = " + player.character_id)

          this.data.push({
            id: player.character_id,
            name: player.name.first,
            outfitTag: player.outfit?.alias || "UNKW",
            combatEffectiveness: 0,
            kills: 0,
            deaths: 0,
            assists: 0,
            teamKills: 0
          })

          this.startTracking(player);
        } else {
          Swal.fire({
            title: "Player not found",
            icon: "warning"
          })
        }
      }
    )

    this.playerName = ""
  }

  private startTracking(player: Player) {
    this.players.push(player)

    this.subject.next({
      service: "event",
      action: "subscribe",
      characters: [player.character_id],
      eventNames: [CensusEvent.DEATH, CensusEvent.ASSIST]
    });
  }

  private alreadyTracking(playerId: String): Boolean {
    if(this.data.find(p => p.id == playerId)) { return true } else return false
  }

  addOutfit() {
    this.loadingData = true
    this.outfitService.findMembersByTag(this.outfitTag)
      .subscribe(
        (response) => {
          if (response.returned > 0) {
            let outfit = response.outfit_list[0]
            outfit.members.filter(c => c.online_status == OnlineStatus.ONLINE)
              .forEach(m => {
                if(this.alreadyTracking(m.character_id)) {
                  console.log("Already tracking " + m.name.first)
                } else {
                  console.log("Tracking " + m.name.first + ". ID = " + m.character_id)
                  this.data.push({
                    id: m.character_id,
                    name: m.name.first,
                    outfitTag: outfit.alias,
                    combatEffectiveness: 0,
                    kills: 0,
                    deaths: 0,
                    assists: 0,
                    teamKills: 0
                  })
                }
                this.playerService.findPlayerById(m.character_id)
                  .toPromise()
                  .then(response => {
                    if(response.returned > 0) {
                      this.startTracking(response.character_list[0])
                    }
                  })
              })
          } else {
            Swal.fire({
              title: "Outfit not found",
              icon: "warning"
            })
          }
          this.loadingData = false
        },

        () => {
          this.loadingData = false
        }
      )
    this.outfitTag = ""
  }

  private refreshTracking() {
    this.subject.next({ 
      service: "event",
      action: "subscribe",
      characters: this.data.map(it => it.id),
      eventNames: [CensusEvent.DEATH, CensusEvent.ASSIST] 
    })
  }

  findPlayerNameById(playerId: String|undefined): String|undefined {
    if (!playerId) {
      return undefined
    }

    if (!this.playerExists(playerId) && !this.loadingData) {
      this.loadPlayer(playerId)
    }

    return this.players.find(p => p.character_id == playerId)?.name.first
  }

  private playerExists(playerId: String) {
    return this.players.find(p => p.character_id == playerId)
  }

  private async loadPlayer(playerId: String) {
    this.loadingData = true
    const response = await this.playerService.findPlayerById(playerId).toPromise()

    if(response.returned > 0) {
      this.players.push(response.character_list[0])
    }
    this.loadingData = false
  }

  wasHeadshot(eventPayload: CensusPayload): Boolean {
    return eventPayload.is_headshot == "1"
  }

  removePlayer(player: Comef) {
    console.log("Stopped tracking " + player.name)
    this.data = this.data.filter(p => p.id != player.id)
    this.subject.next( {service:"event", action:"clearSubscribe", characters: [player.id]} )
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

interface Comef {
  id: String
  name: String
  outfitTag: String
  combatEffectiveness: number
  kills: number
  deaths: number
  assists: number
  teamKills: number
}

interface CensusMessage {
  service: String,
  event: String,
  payload: CensusPayload,
  type: String
}

interface CensusPayload {
  attacker_character_id: String
  character_id: String
  event_name: String
  amount: String
  is_headshot: String
  experience_id: String
}

enum CensusEvent {
  ALL = "all",
  DEATH = "Death",
  ASSIST = "GainExperience_experience_id_2",
  HEADSHOT_BONUS = "GainExperience_experience_id_37",
  RESS = "GainExperience_experience_id_293",
  SELF_HEAL = "GainExperience_experience_id_8",
  RESUPPLY = "",
  REPAIR = "GainExperience_experience_id_9",
  FACILITY_CAPTURE = "PlayerFacilityCapture",
  FACILITY_DEFEND = "PlayerFacilityDefend",
  FACILITY_CONTROL = "FacilityControl",
  KILL_STREAK_BONUS = "GainExperience_experience_id_293",
  SPOTTING_RIBBON = "GainExperience_experience_id_291",
  EXPLOSIVE_KILL = "GainExperience_experience_id_86",
  BEACON_KILL = "GainExperience_experience_id_270",
  TERMINAL_HACK = "GainExperience_experience_id_236",
  EXTREME_MENACE_KILL_ASSIST = "GainExperience_experience_id_327"
}
