import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SviKorisniciComponent } from './svi-korisnici/svi-korisnici.component';
import { FormaComponent } from './forma/forma.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { KorisniciRoutingModule } from './korisnici-routing.module';

@NgModule({
  declarations: [SviKorisniciComponent, FormaComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    KorisniciRoutingModule,
  ],
})
export class KorisniciModule {}
