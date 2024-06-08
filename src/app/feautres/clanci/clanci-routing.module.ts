import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SviClanciComponent } from './svi-clanci/svi-clanci.component';

import { IsLoggedGuard } from 'src/app/core/guards/is-logged.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [IsLoggedGuard],
    canLoad: [IsLoggedGuard],
    component: SviClanciComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClanciRoutingModule {}
