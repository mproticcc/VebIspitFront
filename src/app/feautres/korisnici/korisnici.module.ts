import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SviKorisniciComponent } from './svi-korisnici/svi-korisnici.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { KorisniciRoutingModule } from './korisnici-routing.module';
import { EditKorisnikDialogComponent } from './edit-korisnik-dialog/edit-korisnik-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [SviKorisniciComponent, EditKorisnikDialogComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    KorisniciRoutingModule,
    MatDialogModule,
  ],
})
export class KorisniciModule {}
