import { Injectable } from '@angular/core';
import { CombatEffectivenessService } from '../combat-efectiveness.service';
import { PlayerCombatEffectiveness } from '../combat-effectiveness.model';
import { PlayerRepository } from '../../player/player.repository';
import { KillEvent } from '../../event/event.model';

@Injectable({
  providedIn: 'root'
})
export class KillsHandlerService {

  private trackedPlayers: PlayerCombatEffectiveness[] = []


  constructor(
    private playerRepository: PlayerRepository,
    private combatEffectivenessService: CombatEffectivenessService
  ) {
    combatEffectivenessService.playersCombatEffectivenessObservable.subscribe(
      players => { this.trackedPlayers = players }
    )
  }

  async handle(event: KillEvent) {
    const attacker = this.trackedPlayers.find(d => d.id == event.attackerId);
    const victim = this.trackedPlayers.find(d => d.id == event.victimId);

    if (attacker) {
      const killedPlayer = await this.playerRepository.findById(event.victimId)
      
      if(attacker.faction == killedPlayer.faction) {
        console.log("Team Kill", attacker, victim)
        attacker.killerStats.teamKills += 1
      } else {
        console.log("Kill", attacker, victim)
        attacker.killerStats.kills += 1;
      }
      attacker.currentClass = event.attackerClass
      this.updateCombatEffectiveness(attacker);
    } else if (victim) {
      console.log("DEATH", victim, attacker)
      victim.currentClass = event.victimClass
      victim.killerStats.deaths += 1;
      this.updateCombatEffectiveness(victim)
    }
  }
  
  private updateCombatEffectiveness(attacker: PlayerCombatEffectiveness) {
    attacker.sessionLenghtInSeconds = this.calculateSessionLenght(attacker);
    attacker.combatEffectiveness = this.combatEffectivenessService.calculateCombatEffectiveness(attacker);
    this.combatEffectivenessService.playersCombatEffectivesData = this.trackedPlayers;
  }

  private calculateSessionLenght(playerComef: PlayerCombatEffectiveness): number {
    return Math.floor((Date.now() - playerComef.sessionStart) / 1000);
  }
}
