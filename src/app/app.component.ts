import { Component, OnDestroy } from '@angular/core';
import { Gtag } from 'angular-gtag';
import { environment } from 'src/environments/environment';
import { TrackingService } from './core/event/tracking/tracking.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  showFiller = false
  appVersion = environment.appVersion

  constructor(private trackingService: TrackingService, public gtag: Gtag) { }

  ngOnDestroy(): void {
    console.log("Closing connection to Event Service")
    this.trackingService.disconnect()
  }
}
