import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Experience } from './experience.model';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {

  constructor(private http: HttpClient) { }

  async findAll(): Promise<Experience[]> {
    const url = `${environment.censusHost}/experience?c:limit=2000`
    const response = await this.http.get<ExperienceResponse>(url).toPromise()

    return response.experience_list.map(e => {
      return {
        id: e.experience_id,
        description: e.description
      }
    })
  }
}

interface ExperienceResponse {
  experience_list: ExperienceItem[]
  returned: number
}

interface ExperienceItem {
  experience_id: String
  description: String
  xp: String
}
