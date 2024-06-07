import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page/main-page.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { MainRoutingModule } from './main-routing.module';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { NajcitanijiComponent } from './najcitaniji/najcitaniji.component';

@NgModule({
  declarations: [MainPageComponent, PocetnaComponent, NajcitanijiComponent],
  imports: [CommonModule, RouterModule, SharedModule, MainRoutingModule],
})
export class MainModule {}
