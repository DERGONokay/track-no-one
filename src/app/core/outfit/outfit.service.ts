import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OutfitService {

  constructor(private http: HttpClient) { }

  findMembersByTag(tag: String): Observable<OutfitResponse> {
    return this.http.get<OutfitResponse>(`${environment.censusHost}/outfit/?alias_lower=${tag.toLowerCase()}&c:resolve=member_character,member_online_status`)
  }

}

export interface OutfitResponse {
  outfit_list: OutfitRepresentation[]
  returned: number
}

export interface OutfitRepresentation {
  outfit_id: String
  name: String
  name_lower: String
  alias: String
  members: CharacterRepresentation[]
  member_count: number
}

export interface CharacterRepresentation {
  character_id: String
  online_status: OnlineStatus
  name: CharacterName
  faction_id: String
}

export interface CharacterName {
  first: String
  first_lower: String
}

export enum OnlineStatus {
  OFFLINE = "0", ONLINE = "17"
}