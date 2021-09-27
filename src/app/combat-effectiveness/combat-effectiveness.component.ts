import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { OnlineStatus, OutfitService } from '../outfit.service';

@Component({
  selector: 'app-combat-effectiveness',
  templateUrl: './combat-effectiveness.component.html',
  styleUrls: ['./combat-effectiveness.component.css']
})
export class CombatEffectivenessComponent implements OnInit {

  loadingData = false

  playerName = ""
  outfitTag = ""

  data: Comef[] = []

  constructor(private outfitService: OutfitService) { }

  ngOnInit(): void {
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
          if(response.returned > 0) {
            let outfit = response.outfit_list[0]
            outfit.members.filter(c => c.online_status == OnlineStatus.ONLINE)
              .forEach(m => this.data.push({
                name: m.name.first,
                outfitTag: outfit.alias,
                combatEffectiveness: 100
              }))
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
  name: String
  outfitTag: String
  combatEffectiveness: number
}
