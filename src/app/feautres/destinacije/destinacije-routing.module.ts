import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DestinationsComponent } from './destinations/destinations.component';
import { FormaComponent } from './forma/forma.component';

const routes: Routes = [
  {
    path: '',
    // canActivate: [AdminGuard],
    component: DestinationsComponent,
  },
  {
    path: 'destinationForm',
    // canActivate: [AdminGuard],
    component: FormaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DestinacijeRoutingModule {}
