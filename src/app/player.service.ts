import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(private http: HttpClient) { }

  findPlayerByName(playerName: String): Observable<PlayerResponse> {
    return this.http.get<PlayerResponse>(`${environment.censusHost}/character/?name.first=${playerName}&c:resolve=outfit`)
  }

  findPlayerById(playerId: String): Observable<PlayerResponse> {
    return this.http.get<PlayerResponse>(`${environment.censusHost}/character/?character_id=${playerId}&c:resolve=outfit`)
  }
}

export interface PlayerResponse {
  character_list: Player[]
  returned: Number
}

export interface Player {
  character_id: String,
  name: PlayerName,
  faction_id: String,
  outfit?: Outfit
}

export interface PlayerName {
  first: String,
  first_lower: String
}

export interface Outfit {
  outfit_id: String,
  name: String,
  alias: String
}
