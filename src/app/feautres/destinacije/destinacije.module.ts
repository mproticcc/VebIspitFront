import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DestinationsComponent } from './destinations/destinations.component';
import { FormaComponent } from './forma/forma.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DestinacijeRoutingModule } from './destinacije-routing.module';

@NgModule({
  declarations: [DestinationsComponent, FormaComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    DestinacijeRoutingModule,
  ],
})
export class DestinacijeModule {}
