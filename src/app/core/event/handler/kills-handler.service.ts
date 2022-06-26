import { Injectable } from '@angular/core';
import { CombatEffectivenessService } from '../../comabat-effectiveness/combat-efectiveness.service';
import { PlayerCombatEffectiveness } from '../../comabat-effectiveness/combat-effectiveness.model';
import { PlayerRepository } from '../../player/player.repository';
import { KillEvent } from '../event.model';

@Injectable({
  providedIn: 'root'
})
export class KillsHandlerService {

  private trackedPlayers: PlayerCombatEffectiveness[] = []


  constructor(
    private playerRepository: PlayerRepository,
    combatEffectivenessService: CombatEffectivenessService
  ) {
    combatEffectivenessService.playersCombatEffectivenessObservable.subscribe(
      players => { this.trackedPlayers = players }
    )
  }

  async handle(event: KillEvent): Promise<PlayerCombatEffectiveness> {
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

      return attacker
    } else if (victim) {
      console.log(victim.name + " got killed")
      victim.killerStats.deaths += 1;
      return victim
    } else {
      throw new Error("Failed to handle Kill Event. Players with ID = " + event.attackerId + " and " + event.victimId + " are not being tracked")
    }

  }
}
