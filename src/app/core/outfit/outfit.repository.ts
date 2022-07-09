import { Injectable } from '@angular/core';
import { CharacterRepresentation, OnlineStatus, OutfitRepresentation, OutfitService } from 'src/app/core/outfit/outfit.service';
import { InfantryClass } from '../event/event.model';
import { Faction, Outfit, Player } from '../player/player.model';

@Injectable({
  providedIn: 'root'
})
export class OutfitRepository {

  constructor(private outfirService: OutfitService) { }

  async findByTag(tag: String): Promise<Outfit> {
    const response = await this.outfirService.findMembersByTag(tag).toPromise()
    if(!response || response.returned == 0) {
      throw new Error("Outfit not found. TAG = " + tag)
    }

    const outfitRepresentation = response.outfit_list[0]
    const onlineMembers = outfitRepresentation.members.filter(m => m.online_status == OnlineStatus.ONLINE && m.name)
    const offlineMembers = outfitRepresentation.members.filter(m => m.online_status == OnlineStatus.OFFLINE && m.name)
    const onlinePlayers = onlineMembers.map(m => this.parseToPlayer(m, outfitRepresentation))
    const offlinePlayers = offlineMembers.map(m => this.parseToPlayer(m, outfitRepresentation))

    return {
      id: outfitRepresentation.outfit_id,
      name: outfitRepresentation.name,
      tag: outfitRepresentation.alias,
      onlinePlayers: onlinePlayers,
      offlinePlayers: offlinePlayers
    }
  }

  private parseToPlayer(character: CharacterRepresentation, outfit: OutfitRepresentation): Player {
    return {
      id: character.character_id,
      name: character.name.first,
      currentClass: InfantryClass.UNKNOWN,
      faction: character.faction_id as Faction,
      outfit: {
        id: outfit.outfit_id,
        name: outfit.name,
        tag: outfit.alias
      }
    }
  }
}
