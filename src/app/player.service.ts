import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  findPlayerByName(playerName: String): Observable<PlayerResponse> {
    return this.http.get<PlayerResponse>(`${environment.censusHost}/character_name/?name.first=${playerName}`)
  }

  constructor(private http: HttpClient) { }

  findPlayerById(playerId: String): Observable<PlayerResponse> {
    return this.http.get<PlayerResponse>(`${environment.censusHost}/character_name/?character_id=${playerId}`)
  }
}

export interface PlayerResponse {
  character_name_list: Player[]
  returned: Number
}

export interface Player {
  character_id: String,
  name: PlayerName
}

export interface PlayerName {
  first: String,
  first_lower: String
}
