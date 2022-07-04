import { Injectable } from '@angular/core';
import { CombatEffectivenessService } from '../combat-efectiveness.service';
import { PlayerCombatEffectiveness } from '../combat-effectiveness.model';
import { PlayerRepository } from '../../player/player.repository';
import { KillEvent } from '../../event/event.model';
import { DescriptionService } from '../../event/description.service';

@Injectable({
  providedIn: 'root'
})
export class KillsHandler {

  private trackedPlayers: PlayerCombatEffectiveness[] = []


  constructor(
    private playerRepository: PlayerRepository,
    private combatEffectivenessService: CombatEffectivenessService,
    private descriptions: DescriptionService
  ) {
    combatEffectivenessService.playersCombatEffectivenessObservable.subscribe(
      players => { this.trackedPlayers = players }
    )
  }

  async handle(event: KillEvent) {
    const attacker = this.trackedPlayers.find(d => d.id == event.attackerId);
    const victim = this.trackedPlayers.find(d => d.id == event.victimId);
    const headshotLabel = event.wasHeadshot ? "with a HEADSHOT" : ""

    if (attacker) {
      const killedPlayer = await this.playerRepository.findById(event.victimId)
      
      if(attacker.faction == killedPlayer.faction) {
        this.descriptions.eventDescriptionData = `${attacker.name} team killed ${killedPlayer.name} ${headshotLabel}`
        attacker.killerStats.teamKills += 1
      } else {
        this.descriptions.eventDescriptionData = `${attacker.name} killed ${killedPlayer.name} ${headshotLabel}`
        attacker.killerStats.kills += 1;
      }
      attacker.currentClass = event.attackerClass
      this.combatEffectivenessService.updateCombatEffectiveness(attacker);
    } else if (victim) {
      const killer = await this.playerRepository.findById(event.attackerId)
      this.descriptions.eventDescriptionData = `${victim.name} got killed by ${killer.name} ${headshotLabel}`
      victim.currentClass = event.victimClass
      victim.killerStats.deaths += 1;
      this.combatEffectivenessService.updateCombatEffectiveness(victim)
    }
  }
}
