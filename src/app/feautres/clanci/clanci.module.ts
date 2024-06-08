import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SviClanciComponent } from './svi-clanci/svi-clanci.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ClanciRoutingModule } from './clanci-routing.module';
import { EditClanciDialogComponent } from './edit-clanci-dialog/edit-clanci-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [SviClanciComponent, EditClanciDialogComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    ClanciRoutingModule,
    MatDialogModule,
  ],
})
export class ClanciModule {}
