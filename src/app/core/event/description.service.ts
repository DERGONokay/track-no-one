import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DescriptionService {

  private eventDescriptionSubject: Subject<String> = new Subject<String>()

  get eventDescription() { return this.eventDescriptionSubject.asObservable(); }
  set eventDescriptionData(event: String) { this.eventDescriptionSubject.next(event); }

  constructor() { }
}
