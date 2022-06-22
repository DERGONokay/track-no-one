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
        if(message.service == "event" && message.type != "heartbeat") {
          this.events.unshift(message)
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

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.subject.complete()
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
            combatEffectiveness: 100
          })

          this.subject.next( {
            service:"event",
            action:"subscribe",
            characters: [player.character_id],
            eventNames:[CensusEvent.KILL]
          } )
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
                    combatEffectiveness: 100
                  })
                }
              })
              this.subject.next( {service:"event", action:"subscribe", characters:this.data.map(it => it.id), eventNames:[CensusEvent.KILL]})
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

}

interface Comef {
  id: String
  name: String
  outfitTag: String
  combatEffectiveness: number
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
}

enum CensusEvent {
  ALL = "all",
  KILL = "Death",
  HEADSHOT_BONUS = "GainExperience_experience_id_37",
  RESS = "GainExperience_experience_id_293",
  SELF_HEAL = "GainExperience_experience_id_8",
  RESUPPLY = "",
  REPAIR = "GainExperience_experience_id_9",
  ASSIST = "",
  TEAM_KILL = "",
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
