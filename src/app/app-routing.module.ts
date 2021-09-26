import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CombatEffectivenessComponent } from './combat-effectiveness/combat-effectiveness.component';

const routes: Routes = [
  { path: "combat-effectiveness", component: CombatEffectivenessComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
