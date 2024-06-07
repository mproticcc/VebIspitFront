import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormaComponent } from './forma/forma.component';
import { SviKorisniciComponent } from './svi-korisnici/svi-korisnici.component';
import { IsAdminGuard } from 'src/app/core/guards/is-admin.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [IsAdminGuard],
    canLoad: [IsAdminGuard],
    component: SviKorisniciComponent,
  },
  {
    canActivate: [IsAdminGuard],
    canLoad: [IsAdminGuard],
    path: 'korisniciForm',
    component: FormaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KorisniciRoutingModule {}
