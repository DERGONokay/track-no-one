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
        console.log(attacker.name + " team killed " + killedPlayer.name)
        attacker.killerStats.teamKills += 1
      } else {
        console.log(attacker.name + " killed " + killedPlayer.name)
        attacker.killerStats.kills += 1;
      }
      this.updateCombatEffectiveness(attacker);
    } else if (victim) {
      console.log(victim.name + " got killed")
      victim.killerStats.deaths += 1;
      this.updateCombatEffectiveness(victim)
    }
  }
  
  private updateCombatEffectiveness(attacker: PlayerCombatEffectiveness) {
    attacker.combatEffectiveness = this.combatEffectivenessService.calculateCombatEffectiveness(attacker.killerStats);
    attacker.sessionLenghtInSeconds = this.calculateSessionLenght(attacker);
    this.combatEffectivenessService.playersCombatEffectivesData = this.trackedPlayers;
  }

  private calculateSessionLenght(playerComef: PlayerCombatEffectiveness): number {
    return Math.floor((Date.now() - playerComef.sessionStart) / 1000);
  }
}
