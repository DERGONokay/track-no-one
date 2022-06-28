import { Injectable } from '@angular/core';
import { Faction, Outfit, Player } from './player.model';
import { OutfitResponse, PlayerResponse, PlayerService } from './player.service';


@Injectable({
  providedIn: 'root'
})
export class PlayerRepository {

  private playersCache: Player[] = []

  constructor(private playerService: PlayerService) { }

  async findById(playerId: String): Promise<Player> {
    const cachedPlayer = this.playersCache.find(p =>  p.id == playerId)
    if(cachedPlayer) {
      return cachedPlayer
    } else {
      const response = await this.playerService.findPlayerById(playerId).toPromise()

      if(!response || response.returned == 0) {
        throw new Error("Player not found. ID = " + playerId)
      }

      const player: Player = this.parseCharacter(response.character_list[0])

      this.playersCache.push(player)
      return player
    }
  }

  async findByName(playername: String): Promise<Player> {
    const cachedPlayer = this.playersCache.find(p =>  p.name == playername)
    if(cachedPlayer) {
      return cachedPlayer
    } else {
      const response = await this.playerService.findPlayerByName(playername).toPromise()

      if(!response || response.returned == 0) {
        throw new Error("Player not found. NAME = " + playername)
      }
      
      const player: Player = this.parseCharacter(response.character_list[0])

      this.playersCache.push(player)

      return player
    }
  }

  private parseCharacter(character: PlayerResponse): Player {
    return {
      id: character.character_id,
      name: character.name.first,
      faction: character.faction_id as Faction,
      outfit: this.parseOutfit(character.outfit)
    }
  }



  private parseOutfit(outfit?: OutfitResponse): Outfit | undefined{
    if(!outfit) return undefined

    return {
      id: outfit.outfit_id,
      name: outfit.name,
      tag: outfit.alias
    }
  }
}
