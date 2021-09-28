import { Component, OnInit, OnDestroy} from '@angular/core';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { OnlineStatus, OutfitService } from '../outfit.service';
import { webSocket, WebSocketSubject } from "rxjs/webSocket";

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

  constructor(private outfitService: OutfitService) {
    this.subject = webSocket(environment.wssHost)
    this.subject.subscribe(
      msg => {
        let message = msg as CensusMessage
        console.log("Message received: " + message.service)
        this.events.unshift(message)
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
    Swal.fire({
      title: "Feature not enabled yet!",
      icon: "error"
    })
    this.playerName = ""
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
                this.data.push({
                  id: m.character_id,
                  name: m.name.first,
                  outfitTag: outfit.alias,
                  combatEffectiveness: 100
                })
              })
              this.subject.next( {service:"event",action:"subscribe",characters:this.data.map(it => it.id),eventNames:[CensusEvent.ALL]})
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
  payload: CensusPayload
}

interface CensusPayload {
  event_name: String
  amount: String
}

enum CensusEvent {
  ALL = "all",
  KILL = "GainExperience_experience_id_1",
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
