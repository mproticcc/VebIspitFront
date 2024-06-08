import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DestinationsComponent } from './destinations/destinations.component';
import { IsLoggedGuard } from 'src/app/core/guards/is-logged.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [IsLoggedGuard],
    canLoad: [IsLoggedGuard],
    component: DestinationsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DestinacijeRoutingModule {}
