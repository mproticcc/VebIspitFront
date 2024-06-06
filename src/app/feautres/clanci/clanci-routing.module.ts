import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SviClanciComponent } from './svi-clanci/svi-clanci.component';
import { FormaComponent } from './forma/forma.component';

const routes: Routes = [
  {
    path: '',
    component: SviClanciComponent,
  },
  {
    path: 'clanciForm',
    component: FormaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClanciRoutingModule {}
