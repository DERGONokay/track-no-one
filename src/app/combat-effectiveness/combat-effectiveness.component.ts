import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-combat-effectiveness',
  templateUrl: './combat-effectiveness.component.html',
  styleUrls: ['./combat-effectiveness.component.css']
})
export class CombatEffectivenessComponent implements OnInit {

  playerName = ""
  outfitTag = ""

  data: Player[] = [
    { name: "DERGON", outfit: { name: "Kneel no one", tag: "KN1"}, combatEffectiveness: 340 },
    { name: "DERGON", outfit: { name: "Kneel no one", tag: "KN1"}, combatEffectiveness: 340 },
    { name: "DERGON", outfit: { name: "Kneel no one", tag: "KN1"}, combatEffectiveness: 340 },
    { name: "DERGON", outfit: { name: "Kneel no one", tag: "KN1"}, combatEffectiveness: 340 },
    { name: "DERGON", outfit: { name: "Kneel no one", tag: "KN1"}, combatEffectiveness: 340 },
    { name: "DERGON", outfit: { name: "Kneel no one", tag: "KN1"}, combatEffectiveness: 340 }
  ]

  constructor() { }

  ngOnInit(): void {
  }

  addPlayer() {
    this.data.push({name: this.playerName, outfit: { name: "Kneel no one", tag: "KN1"}, combatEffectiveness: 300})
    this.playerName = ""
  }

  addOutfit() {
    this.data.push({name: "Player name", outfit: { name: this.outfitTag, tag: this.outfitTag}, combatEffectiveness: 300})
    this.data.push({name: "Player name", outfit: { name: this.outfitTag, tag: this.outfitTag}, combatEffectiveness: 300})
    this.data.push({name: "Player name", outfit: { name: this.outfitTag, tag: this.outfitTag}, combatEffectiveness: 300})
    this.data.push({name: "Player name", outfit: { name: this.outfitTag, tag: this.outfitTag}, combatEffectiveness: 300})
    this.outfitTag = ""
  }

}

interface Player {
  name: String
  outfit: Outfit
  combatEffectiveness: number
}

interface Outfit {
  name: String
  tag: String
}
