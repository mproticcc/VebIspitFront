import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormaComponent } from './forma/forma.component';
import { SviKorisniciComponent } from './svi-korisnici/svi-korisnici.component';

const routes: Routes = [
  {
    path: '',
    // canActivate: [AdminGuard],
    component: SviKorisniciComponent,
  },
  {
    path: 'korisniciForm',
    component: FormaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KorisniciRoutingModule {}
