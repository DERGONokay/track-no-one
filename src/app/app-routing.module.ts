import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CombatEffectivenessComponent } from './core/comabat-effectiveness/combat-effectiveness.component';
import { ExperienceComponent } from './core/experience/experience.component';
import { UnderConstructionComponent } from './under-construction/under-construction.component';

const routes: Routes = [
  { path: "combat-effectiveness", component: CombatEffectivenessComponent },
  { path: "under-construction", component: UnderConstructionComponent },
  { path: "experience-events", component: ExperienceComponent },
  { path: "**", component: UnderConstructionComponent},
  { path: "", component: UnderConstructionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
