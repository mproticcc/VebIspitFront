import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page/main-page.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { MainRoutingModule } from './main-routing.module';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { NajcitanijiComponent } from './najcitaniji/najcitaniji.component';
import { SingleClanakComponent } from './single-clanak/single-clanak.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MainPageComponent,
    PocetnaComponent,
    NajcitanijiComponent,
    SingleClanakComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MainRoutingModule,
    FormsModule,
  ],
})
export class MainModule {}
