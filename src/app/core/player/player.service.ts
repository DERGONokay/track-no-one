import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(private http: HttpClient) { }

  findPlayerByName(playerName: String): Observable<PlayersResponse> {
    return this.http.get<PlayersResponse>(`${environment.censusHost}/character/?name.first_lower=${playerName.toLowerCase()}&c:resolve=outfit,profile`)
  }

  findPlayerById(playerId: String): Observable<PlayersResponse> {
    return this.http.get<PlayersResponse>(`${environment.censusHost}/character/?character_id=${playerId}&c:resolve=outfit,profile`)
  }
}

export interface PlayersResponse {
  character_list: PlayerResponse[]
  returned: Number
}

export interface PlayerResponse {
  character_id: String,
  name: PlayerResponseName,
  faction_id: String,
  profile_id: String,
  outfit?: OutfitResponse
  profile: ProfileResponse
}

export interface PlayerResponseName {
  first: String,
  first_lower: String
}

export interface OutfitResponse {
  outfit_id: String,
  name: String,
  alias: String
}

interface ProfileResponse {
  profile_type_description: String
}
