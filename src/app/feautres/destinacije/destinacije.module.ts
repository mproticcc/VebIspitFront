import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DestinationsComponent } from './destinations/destinations.component';
import { FormaComponent } from './forma/forma.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DestinacijeRoutingModule } from './destinacije-routing.module';
import { EditDestinacijeDialogComponent } from './edit-destinacije-dialog/edit-destinacije-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    DestinationsComponent,
    FormaComponent,
    EditDestinacijeDialogComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    DestinacijeRoutingModule,
    MatDialogModule,
  ],
})
export class DestinacijeModule {}
