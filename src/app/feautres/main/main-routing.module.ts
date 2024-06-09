import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { NajcitanijiComponent } from './najcitaniji/najcitaniji.component';
import { SingleClanakComponent } from './single-clanak/single-clanak.component';
import { AktivnostComponent } from './aktivnost/aktivnost.component';
import { OdabranaDestinacijaComponent } from './odabrana-destinacija/odabrana-destinacija.component';

const routes: Routes = [
  {
    path: 'main',
    component: MainPageComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'pocetna',
      },
      {
        path: 'pocetna',
        component: PocetnaComponent,
      },
      {
        path: 'destinacije',
        loadChildren: () =>
          import('../destinacije/destinacije.module').then(
            (module) => module.DestinacijeModule
          ),
      },
      {
        path: 'clanci',
        loadChildren: () =>
          import('../clanci/clanci.module').then(
            (module) => module.ClanciModule
          ),
      },
      {
        path: 'koricnici',
        loadChildren: () =>
          import('../korisnici/korisnici.module').then(
            (module) => module.KorisniciModule
          ),
      },
      {
        path: 'najcitaniji',
        component: NajcitanijiComponent,
      },
      {
        path: ':id',
        component: SingleClanakComponent,
      },
    ],
  },
  {
    path: 'aktivnost/:id',
    component: AktivnostComponent,
  },
  {
    path: 'odabranaDestinacija/:id',
    component: OdabranaDestinacijaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
