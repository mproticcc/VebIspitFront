import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SviClanciComponent } from './svi-clanci/svi-clanci.component';
import { FormaComponent } from './forma/forma.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ClanciRoutingModule } from './clanci-routing.module';

@NgModule({
  declarations: [SviClanciComponent, FormaComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    ClanciRoutingModule,
  ],
})
export class ClanciModule {}
