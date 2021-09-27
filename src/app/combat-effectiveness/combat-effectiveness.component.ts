import { Component, OnInit } from '@angular/core';
import { OnlineStatus, OutfitService } from '../outfit.service';

@Component({
  selector: 'app-combat-effectiveness',
  templateUrl: './combat-effectiveness.component.html',
  styleUrls: ['./combat-effectiveness.component.css']
})
export class CombatEffectivenessComponent implements OnInit {

  playerName = ""
  outfitTag = ""

  data: Comef[] = []

  constructor(private outfitService: OutfitService) { }

  ngOnInit(): void {
  }

  addPlayer() {
    this.playerName = ""
  }

  addOutfit() {
    this.outfitService.findMembersByTag(this.outfitTag)
      .subscribe(
        (response) => {
          debugger
          if(response.returned > 0) {
            let outfit = response.outfit_list[0]
            outfit.members.filter(c => c.online_status == OnlineStatus.ONLINE)
              .forEach(m => this.data.push({
                name: m.name.first,
                outfitTag: outfit.alias,
                combatEffectiveness: 100
              }))
          }
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
