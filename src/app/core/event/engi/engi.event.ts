import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TerminalRepairEvent, GeneratorRepairEvent, InfantryResupplyEvent, VehicleResupplyEvent, DeployableRepairEvent as DeployableRepairEvent, VehicleRepairEvent, MaxRepairEvent } from './engi.event.model';

@Injectable({
  providedIn: 'root'
})
export class EngiEvents {
  
  constructor() { }

  private terminalRepairSubject: Subject<TerminalRepairEvent> = new Subject<TerminalRepairEvent>();
  private generatorRepairSubject: Subject<GeneratorRepairEvent> = new Subject<GeneratorRepairEvent>();
  private infantryResupplySubject: Subject<InfantryResupplyEvent> = new Subject<InfantryResupplyEvent>();
  private vehicleResupplySubject: Subject<VehicleResupplyEvent> = new Subject<VehicleResupplyEvent>();
  private deployableRepairSubject: Subject<DeployableRepairEvent> = new Subject<DeployableRepairEvent>();
  private vehicleRepairSubject: Subject<VehicleRepairEvent> = new Subject<VehicleRepairEvent>();
  private maxRepairSubject: Subject<MaxRepairEvent> = new Subject<MaxRepairEvent>();
  
  get terminalRepairEvents() { return this.terminalRepairSubject.asObservable(); }
  set terminalRepairData(event: TerminalRepairEvent) { this.terminalRepairSubject.next(event); }

  get generatorRepairEvents() { return this.generatorRepairSubject.asObservable(); }
  set generatorRepairData(event: GeneratorRepairEvent) { this.generatorRepairSubject.next(event); }

  get infantryResupplyEvents() { return this.infantryResupplySubject.asObservable(); }
  set infantryResupplyData(event: InfantryResupplyEvent) { this.infantryResupplySubject.next(event); }

  get vehicleResupplyEvents() { return this.vehicleResupplySubject.asObservable(); }
  set vehicleResupplyData(event: VehicleResupplyEvent) { this.vehicleResupplySubject.next(event); }

  get deployableRepairEvents() { return this.deployableRepairSubject.asObservable(); }
  set deployableRepairData(event: DeployableRepairEvent) { this.deployableRepairSubject.next(event); }

  get vehicleRepairEvents() { return this.vehicleRepairSubject.asObservable(); }
  set vehicleRepairData(event: VehicleRepairEvent) { this.vehicleRepairSubject.next(event); }

  get maxRepairEvents() { return this.maxRepairSubject.asObservable(); }
  set maxRepairData(event: MaxRepairEvent) { this.maxRepairSubject.next(event); }
}
